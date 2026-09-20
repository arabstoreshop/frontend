import type { OrderPayload, OrderResponse } from "@/types";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://api.naseem.beauty").replace(/\/+$/, "");

const NETWORK_ERROR_AR =
  "تعذر الاتصال بخادم الطلبات. تحقق من الإنترنت أو حاول بعد دقيقة.";

export type PublicPixels = {
  meta_pixel_id: string;
  tiktok_pixel_id: string;
  snap_pixel_id: string;
};

function joinUrl(path: string) {
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

async function apiFetch(path: string, init: RequestInit = {}, attempts = 2): Promise<Response> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(joinUrl(path), {
        ...init,
        signal: controller.signal,
        cache: "no-store",
      });
      if (res.status >= 500 && i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 400 * (i + 1)));
        continue;
      }
      return res;
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 400 * (i + 1)));
        continue;
      }
    } finally {
      clearTimeout(timer);
    }
  }
  const aborted = lastError instanceof DOMException && lastError.name === "AbortError";
  throw new Error(aborted ? NETWORK_ERROR_AR : NETWORK_ERROR_AR);
}

function errorFromBody(data: unknown, fallback: string) {
  if (!data || typeof data !== "object") return fallback;
  const detail = (data as { detail?: unknown }).detail;
  if (typeof detail === "string" && detail.trim()) return detail;
  const nested = detail as { message?: string } | undefined;
  if (nested && typeof nested.message === "string") return nested.message;
  if (Array.isArray(detail)) {
    const msgs = detail
      .map((entry) => {
        if (typeof entry === "string") return entry;
        if (!entry || typeof entry !== "object") return "";
        const msg = (entry as { msg?: unknown }).msg;
        if (typeof msg !== "string") return "";
        return msg.replace(/^Value error,?\s*/i, "").replace(/^Assertion failed,?\s*/i, "");
      })
      .filter(Boolean);
    if (msgs.length) return msgs.join(" — ");
  }
  return fallback;
}

export async function pingApiHealth(): Promise<boolean> {
  try {
    const res = await apiFetch("/health", {}, 1);
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchPublicPixels(): Promise<PublicPixels> {
  const empty: PublicPixels = {
    meta_pixel_id: "",
    tiktok_pixel_id: "",
    snap_pixel_id: "",
  };
  try {
    const res = await apiFetch("/config/public", {}, 1);
    if (!res.ok) return empty;
    const data = await res.json();
    return {
      meta_pixel_id: data.meta_pixel_id || "",
      tiktok_pixel_id: data.tiktok_pixel_id || "",
      snap_pixel_id: data.snap_pixel_id || "",
    };
  } catch {
    return empty;
  }
}

export async function placeOrder(payload: OrderPayload): Promise<OrderResponse> {
  let res: Response;
  try {
    res = await apiFetch("/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : NETWORK_ERROR_AR);
  }

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(errorFromBody(error, "حدث خطأ في إرسال الطلب، يرجى المحاولة مجدداً"));
  }

  return res.json();
}

export async function fetchOrder(orderNumber: string): Promise<OrderResponse> {
  let res: Response;
  try {
    res = await apiFetch(`/orders/${encodeURIComponent(orderNumber)}`, {}, 1);
  } catch {
    throw new Error(NETWORK_ERROR_AR);
  }
  if (!res.ok) {
    throw new Error("لم يتم العثور على الطلب");
  }
  return res.json();
}

import type { OrderPayload, OrderResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.naseem.beauty";

export type PublicPixels = {
  meta_pixel_id: string;
  tiktok_pixel_id: string;
  snap_pixel_id: string;
};

export async function fetchPublicPixels(): Promise<PublicPixels> {
  const empty: PublicPixels = {
    meta_pixel_id: "",
    tiktok_pixel_id: "",
    snap_pixel_id: "",
  };
  try {
    const res = await fetch(`${API_URL}/config/public`, { cache: "no-store" });
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
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "حدث خطأ غير متوقع" }));
    throw new Error(
      typeof error.detail === "string"
        ? error.detail
        : "حدث خطأ في إرسال الطلب، يرجى المحاولة مجدداً"
    );
  }

  return res.json();
}

export async function fetchOrder(orderNumber: string): Promise<OrderResponse> {
  const res = await fetch(`${API_URL}/orders/${orderNumber}`);
  if (!res.ok) {
    throw new Error("لم يتم العثور على الطلب");
  }
  return res.json();
}

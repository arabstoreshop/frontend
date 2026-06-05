import type { OrderPayload, OrderResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.naseem.beauty";

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

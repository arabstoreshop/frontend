"use client";

import { Package, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchOrder } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import type { OrderResponse } from "@/types";

function TrackContent() {
  const searchParams = useSearchParams();
  const [orderNum, setOrderNum] = useState(searchParams.get("order") ?? "");
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNum.trim()) return;
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const result = await fetchOrder(orderNum.trim());
      setOrder(result);
    } catch {
      setError("لم يتم العثور على الطلب. يرجى التحقق من رقم الطلب.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const paramOrder = searchParams.get("order");
    if (paramOrder) {
      setOrderNum(paramOrder);
      fetchOrder(paramOrder)
        .then(setOrder)
        .catch(() => setError("لم يتم العثور على الطلب"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusMap: Record<string, { label: string; color: string }> = {
    pending: { label: "قيد المعالجة", color: "text-amber-600 bg-amber-50" },
    confirmed: { label: "تم التأكيد", color: "text-blue-600 bg-blue-50" },
    shipped: { label: "تم الشحن", color: "text-purple-600 bg-purple-50" },
    delivered: { label: "تم التوصيل", color: "text-green-600 bg-green-50" },
    cancelled: { label: "ملغي", color: "text-red-600 bg-red-50" },
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
          <Package className="w-7 h-7 text-brand" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">تتبع طلبك</h1>
        <p className="text-gray-500">أدخل رقم طلبك للاطلاع على حالته</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <Input
          value={orderNum}
          onChange={(e) => setOrderNum(e.target.value)}
          placeholder="مثال: NSM-20240101-ABC123"
          className="flex-1"
          dir="ltr"
        />
        <Button type="submit" loading={loading} disabled={loading}>
          <Search className="w-4 h-4" />
          بحث
        </Button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 rounded-xl text-red-600 text-sm mb-6">{error}</div>
      )}

      {order && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-cream flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">رقم الطلب</p>
              <p className="font-bold text-gray-900 font-mono">{order.order_number}</p>
            </div>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                statusMap[order.status]?.color ?? "text-gray-600 bg-gray-100"
              }`}
            >
              {statusMap[order.status]?.label ?? order.status}
            </span>
          </div>
          <div className="px-5 py-4 space-y-2 border-b border-gray-50">
            <p className="text-sm text-gray-600">
              <strong>الاسم:</strong> {order.name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>تاريخ الطلب:</strong>{" "}
              {new Date(order.created_at).toLocaleDateString("ar-SA")}
            </p>
          </div>
          <div className="divide-y divide-gray-50">
            {order.items.map((item, i) => (
              <div key={i} className="px-5 py-3 flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.product_name}</p>
                  <p className="text-xs text-gray-400">الكمية: {item.quantity}</p>
                </div>
                <p className="font-bold text-brand text-sm">{formatPrice(item.line_total_sar)}</p>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 bg-cream flex justify-between">
            <span className="font-bold text-gray-900">المجموع</span>
            <span className="font-bold text-brand text-lg">{formatPrice(order.total_sar)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <TrackContent />
    </Suspense>
  );
}

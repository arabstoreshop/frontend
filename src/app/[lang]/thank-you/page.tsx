"use client";

import { CheckCircle, Copy, Lock, Package, Phone, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { fetchOrder } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { PRODUCTS } from "@/lib/products";
import type { OrderResponse } from "@/types";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams.get("order");
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!orderNumber) {
      router.replace("/");
      return;
    }
    fetchOrder(orderNumber)
      .then(setOrder)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [orderNumber, router]);

  const copyOrderNumber = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const crossSellSkus = new Set(order?.items.map((i) => i.sku) ?? []);
  const crossSells = PRODUCTS.filter((p) => !crossSellSkus.has(p.sku)).slice(0, 2);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-brand border-t-transparent animate-spin mx-auto" />
          <p className="text-gray-400">جاري تحميل تفاصيل طلبك...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* Success header */}
      <div className="text-center space-y-4 mb-10">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">تم استلام طلبك!</h1>
        <p className="text-gray-500 text-lg">
          شكراً {order?.name ?? "لك"}! سنتواصل معك قريباً لتأكيد موعد التوصيل.
        </p>
      </div>

      {/* Order number */}
      {orderNumber && (
        <div className="bg-cream rounded-2xl p-5 mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">رقم الطلب</p>
            <p className="font-bold text-gray-900 text-lg font-mono tracking-wide">{orderNumber}</p>
          </div>
          <button
            onClick={copyOrderNumber}
            className="flex items-center gap-2 text-brand text-sm border border-brand/30 rounded-lg px-3 py-1.5 hover:bg-brand-50 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            {copied ? "تم النسخ!" : "نسخ"}
          </button>
        </div>
      )}

      {/* Order Summary */}
      {order && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">ملخص طلبك</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {order.items.map((item, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.product_name}</p>
                  <p className="text-xs text-gray-400">
                    الكمية: {item.quantity}
                    {item.is_upsell && (
                      <span className="mr-2 text-brand bg-brand-50 px-1.5 py-0.5 rounded text-[10px] font-medium">
                        إضافي
                      </span>
                    )}
                  </p>
                </div>
                <p className="font-bold text-brand">{formatPrice(item.line_total_sar)}</p>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 bg-cream flex justify-between items-center">
            <span className="font-bold text-gray-900">المجموع (عند الاستلام)</span>
            <span className="font-bold text-brand text-xl">{formatPrice(order.total_sar)}</span>
          </div>
        </div>
      )}

      {/* COD + Packaging note */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="flex gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
          <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 text-sm">الدفع عند الاستلام</p>
            <p className="text-xs text-amber-700 mt-0.5">
              ادفع نقداً عند استلام الطلب — لا يُطلب منك الدفع مسبقاً
            </p>
          </div>
        </div>
        <div className="flex gap-3 p-4 bg-brand-50 rounded-xl border border-brand/10">
          <Lock className="w-5 h-5 text-brand shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-brand text-sm">تغليف خاص وسري</p>
            <p className="text-xs text-brand/70 mt-0.5">
              طلبك يصل في تغليف مجهول الهوية — لحفظ خصوصيتك التامة
            </p>
          </div>
        </div>
      </div>

      {/* Delivery info */}
      <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 mb-8">
        <Truck className="w-5 h-5 text-brand shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-gray-900 text-sm">التوصيل المتوقع</p>
          <p className="text-sm text-gray-500 mt-0.5">
            خلال 2–5 أيام عمل لجميع مناطق المملكة. سيتواصل معك مندوب التوصيل قبل الوصول.
          </p>
        </div>
      </div>

      {/* Track order */}
      <div className="text-center mb-12">
        <Button variant="outline" asChild>
          <Link href={`/track?order=${orderNumber}`}>
            <Package className="w-4 h-4" />
            تتبع طلبك
          </Link>
        </Button>
      </div>

      {/* Cross-sells */}
      {crossSells.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">
            أكمل روتين عنايتك
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {crossSells.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-brand border-t-transparent animate-spin" />
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}

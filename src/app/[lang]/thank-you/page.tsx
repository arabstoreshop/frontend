"use client";

import { CheckCircle, Copy, Lock, Package, Phone, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { fetchOrder } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { PRODUCTS, catalogLine } from "@/lib/products";
import { pathLang, withLang } from "@/lib/lang";
import type { OrderResponse } from "@/types";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathLang(pathname);
  const orderNumber = searchParams.get("order");
  const totalParam = Number(searchParams.get("total") || "");
  const currencyParam = searchParams.get("currency") === "MAD" ? "MAD" : "SAR";
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!orderNumber) {
      router.replace(withLang(lang, "/"));
      return;
    }
    fetchOrder(orderNumber)
      .then(setOrder)
      .catch(() => {});
  }, [orderNumber, router, lang]);

  const copyOrderNumber = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const line = order?.items.some((i) => catalogLine(i.sku) === "beauty")
    ? "beauty"
    : currencyParam === "MAD"
      ? "beauty"
      : "care";
  const currency = line === "beauty" ? "MAD" : "SAR";
  const displayTotal =
    order?.total_sar ?? (Number.isFinite(totalParam) && totalParam > 0 ? totalParam : null);
  const orderedSkus = new Set(order?.items.map((i) => i.sku) ?? []);
  const crossSells = PRODUCTS.filter((p) => catalogLine(p.sku) === line && !orderedSkus.has(p.sku)).slice(
    0,
    2
  );

  if (!orderNumber) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-10 space-y-4 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">تم استلام طلبك!</h1>
        <p className="text-lg text-gray-500">شكراً {order?.name ?? "لك"}! سنتواصل معك قريباً لتأكيد موعد التوصيل.</p>
      </div>

      <div className="mb-6 flex items-center justify-between rounded-2xl bg-cream p-5">
        <div>
          <p className="mb-1 text-xs text-gray-400">رقم الطلب</p>
          <p className="font-mono text-lg font-bold tracking-wide text-gray-900">{orderNumber}</p>
        </div>
        <button
          onClick={copyOrderNumber}
          className="flex min-h-[44px] items-center gap-2 rounded-lg border border-brand/30 px-3 py-1.5 text-sm text-brand hover:bg-brand-50"
        >
          <Copy className="h-3.5 w-3.5" />
          {copied ? "تم النسخ!" : "نسخ"}
        </button>
      </div>

      <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {order?.items?.length ? (
          <div className="divide-y divide-gray-50">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.product_name}</p>
                  <p className="text-xs text-gray-400">الكمية: {item.quantity}</p>
                </div>
                <p className="font-bold text-brand">{formatPrice(item.line_total_sar, "ar", currency)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-4">
            <h2 className="font-bold text-gray-900">ملخص طلبك</h2>
            <p className="mt-1 text-sm text-gray-500">الدفع عند الاستلام عند وصول المندوب.</p>
          </div>
        )}
        {displayTotal != null && (
          <div className="flex items-center justify-between bg-cream px-5 py-4">
            <span className="font-bold text-gray-900">المجموع (عند الاستلام)</span>
            <span className="text-xl font-bold text-brand">{formatPrice(displayTotal, "ar", currency)}</span>
          </div>
        )}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-semibold text-amber-900">الدفع عند الاستلام</p>
            <p className="mt-0.5 text-xs text-amber-700">ادفع نقداً عند استلام الطلب — لا يُطلب منك الدفع مسبقاً</p>
          </div>
        </div>
        <div className="flex gap-3 rounded-xl border border-brand/10 bg-brand-50 p-4">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <div>
            <p className="text-sm font-semibold text-brand">{line === "beauty" ? "علبة صيدلية" : "تغليف خاص وسري"}</p>
            <p className="mt-0.5 text-xs text-brand/70">طلبك يصل في تغليف يحفظ خصوصيتك</p>
          </div>
        </div>
      </div>

      <div className="mb-8 flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4">
        <Truck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
        <div>
          <p className="text-sm font-semibold text-gray-900">التوصيل المتوقع</p>
          <p className="mt-0.5 text-sm text-gray-500">
            {line === "beauty"
              ? "خلال 2–5 أيام عمل لجميع مناطق المغرب. سيتواصل معك مندوب التوصيل قبل الوصول."
              : "خلال 2–5 أيام عمل لجميع مناطق المملكة. سيتواصل معك مندوب التوصيل قبل الوصول."}
          </p>
        </div>
      </div>

      <div className="mb-12 text-center">
        <Button variant="outline" asChild>
          <Link href={withLang(lang, `/track?order=${orderNumber}`)}>
            <Package className="h-4 w-4" />
            تتبع طلبك
          </Link>
        </Button>
      </div>

      {crossSells.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-5 text-center text-xl font-bold text-gray-900">أكمل روتين عنايتك</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {crossSells.map((p) => (
              <ProductCard key={p.sku} product={p} lang={lang} />
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
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand border-t-transparent" />
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}

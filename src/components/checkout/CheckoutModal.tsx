"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Lock, Package, Shield, Star, X } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UpsellModal } from "@/components/checkout/UpsellModal";
import { placeOrder } from "@/lib/api";
import { pathLang, withLang } from "@/lib/lang";
import { formatPrice, generateEventId } from "@/lib/utils";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validation";
import { catalogLine, UPSELL_PRICE } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { trackPurchasePixel } from "@/components/pixels/PixelScripts";

export function CheckoutModal() {
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathLang(pathname);
  const { items, isCheckoutOpen, closeCheckout, clearCart, getTotal } = useCartStore();
  const [showUpsell, setShowUpsell] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const mainItems = items.filter((i) => !i.isUpsell);
  const total = getTotal();
  const currency = mainItems.some((i) => catalogLine(i.sku) === "beauty") ? "MAD" : "SAR";
  const isBeauty = currency === "MAD";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: async (values, context, options) =>
      zodResolver(checkoutSchema(currency))(values, context, options),
  });

  const mainSku = mainItems[0]?.sku;

  const onValid = (data: CheckoutFormData) => {
    setFormData(data);
    setShowUpsell(true);
  };

  const submitOrder = async (includeUpsell: boolean, upsellSku?: string) => {
    if (!formData) return;
    setIsSubmitting(true);
    setApiError(null);

    const eventId = generateEventId();
    const paid = includeUpsell ? total + UPSELL_PRICE : total;

    const orderItems = [
      ...mainItems.map((i) => ({
        sku: i.sku,
        quantity: i.quantity,
        is_upsell: false,
      })),
    ];

    if (includeUpsell && upsellSku) {
      orderItems.push({ sku: upsellSku, quantity: 1, is_upsell: true });
    }

    try {
      const order = await placeOrder({
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        notes: formData.notes || undefined,
        items: orderItems,
        browser_event_id: eventId,
        total_sar: paid,
        products_label: [
          ...mainItems.map((i) => `${i.name} x${i.quantity}`),
          ...(includeUpsell && upsellSku ? [`${upsellSku} x1`] : []),
        ].join(" | "),
      });

      trackPurchasePixel({
        eventId,
        value: order.total_sar,
        currency: currency,
        orderId: order.order_number,
        contentIds: orderItems.map((i) => i.sku),
      });

      clearCart();
      closeCheckout();
      const thankYou = withLang(
        lang,
        `/thank-you?order=${encodeURIComponent(order.order_number)}&total=${paid}&currency=${currency}`
      );
      router.push(thankYou);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "حدث خطأ، يرجى المحاولة مجدداً");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog.Root open={isCheckoutOpen && !showUpsell} onOpenChange={(open) => !open && closeCheckout()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            aria-describedby="checkout-description"
          >
            <form
              onSubmit={handleSubmit(onValid)}
              className="flex w-full max-w-lg max-h-[95vh] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-2xl animate-scale-in"
            >
              <div className="sticky top-0 z-10 shrink-0 border-b border-gray-100 bg-white px-5 pb-4 pt-5">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-lg font-bold text-gray-900">إتمام الطلب</Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="flex h-11 w-11 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
                      aria-label="إغلاق"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Dialog.Close>
                </div>
              </div>

              <div id="checkout-description" className="sr-only">
                نموذج إتمام الطلب
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
                <div className="space-y-3 rounded-xl bg-cream p-4">
                  <h3 className="text-sm font-semibold text-gray-700">ملخص طلبك</h3>
                  {mainItems.map((item) => (
                    <div key={item.sku} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="line-clamp-1 text-sm font-medium text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-400">الكمية: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-brand">
                        {formatPrice(item.bundlePrice, "ar", currency)}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="font-bold text-gray-900">المجموع</span>
                    <span className="text-lg font-bold text-brand">{formatPrice(total, "ar", currency)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50 p-3">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-amber-800">
                    <strong>+2,400</strong> عميل راضٍ {isBeauty ? "فالمغرب" : "في المملكة"}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: <Package className="h-4 w-4" />, label: isBeauty ? "علبة صيدلية" : "تغليف خاص" },
                    { icon: <Shield className="h-4 w-4" />, label: "دفع عند الاستلام" },
                    { icon: <CheckCircle className="h-4 w-4" />, label: "ضمان الجودة" },
                  ].map((t) => (
                    <div
                      key={t.label}
                      className="flex flex-col items-center gap-1 rounded-lg bg-brand-50 p-2.5 text-brand"
                    >
                      {t.icon}
                      <span className="text-[10px] font-medium">{t.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <Input
                    id="name"
                    label="الاسم الكامل"
                    placeholder={isBeauty ? "مثال: فاطمة العلوي" : "مثال: محمد العتيبي"}
                    autoComplete="name"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <Input
                    id="phone"
                    label="رقم الجوال"
                    placeholder={isBeauty ? "06xxxxxxxx" : "05xxxxxxxx"}
                    type="tel"
                    inputMode="tel"
                    dir="ltr"
                    autoComplete="tel"
                    maxLength={20}
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                  <Input
                    id="city"
                    label="المدينة"
                    placeholder={isBeauty ? "الدار البيضاء" : "الرياض"}
                    autoComplete="address-level2"
                    error={errors.city?.message}
                    {...register("city")}
                  />

                  {apiError && (
                    <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                      {apiError}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Lock className="h-3.5 w-3.5 shrink-0" />
                    <span>بياناتك محمية ولن تُشارك مع أي طرف ثالث</span>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 shrink-0 border-t border-gray-100 bg-white px-5 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
                <Button type="submit" size="lg" className="min-h-[44px] w-full text-base" disabled={isSubmitting}>
                  تأكيد الطلب · {formatPrice(total, "ar", currency)}
                </Button>
                <p className="mt-2 text-center text-xs text-gray-400">
                  الدفع عند الاستلام · تغليف خاص ·{" "}
                  <a href={withLang(lang, "/terms")} className="underline hover:text-brand">
                    الشروط
                  </a>
                </p>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {showUpsell && formData && (
        <UpsellModal
          mainSku={mainSku}
          currency={currency}
          onAccept={(upsellSku) => {
            setShowUpsell(false);
            submitOrder(true, upsellSku);
          }}
          onDecline={() => {
            setShowUpsell(false);
            submitOrder(false);
          }}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}

"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Lock, Package, Shield, Star, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UpsellModal } from "@/components/checkout/UpsellModal";
import { placeOrder } from "@/lib/api";
import { formatPrice, generateEventId } from "@/lib/utils";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validation";
import { PRODUCTS } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { trackPurchasePixel } from "@/components/pixels/PixelScripts";

export function CheckoutModal() {
  const router = useRouter();
  const { items, isCheckoutOpen, closeCheckout, clearCart, getTotal } = useCartStore();
  const [showUpsell, setShowUpsell] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const mainItems = items.filter((i) => !i.isUpsell);
  const upsellItems = items.filter((i) => i.isUpsell);
  const total = getTotal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // Get the first main item's sku for upsell suggestion
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
        items: orderItems,
        browser_event_id: eventId,
      });

      // Fire browser-side pixel events BEFORE navigation
      trackPurchasePixel({
        eventId,
        value: order.total_sar,
        currency: "SAR",
        orderId: order.order_number,
        contentIds: orderItems.map((i) => i.sku),
      });

      clearCart();
      closeCheckout();
      router.push(`/thank-you?order=${order.order_number}`);
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
            <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto animate-scale-in">
              {/* Header */}
              <div className="sticky top-0 bg-white rounded-t-3xl sm:rounded-t-2xl px-5 pt-5 pb-4 border-b border-gray-100 z-10">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-lg font-bold text-gray-900">
                    إتمام الطلب
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </Dialog.Close>
                </div>
              </div>

              <div id="checkout-description" className="sr-only">نموذج إتمام الطلب</div>

              <div className="px-5 py-5 space-y-5">
                {/* Order Summary */}
                <div className="bg-cream rounded-xl p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">ملخص طلبك</h3>
                  {mainItems.map((item) => {
                    const product = PRODUCTS.find((p) => p.sku === item.sku);
                    return (
                      <div key={item.sku} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-sand shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                          <p className="text-xs text-gray-400">الكمية: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-brand text-sm">{formatPrice(item.bundlePrice)}</p>
                      </div>
                    );
                  })}
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">المجموع</span>
                    <span className="font-bold text-brand text-lg">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-amber-800">
                    <strong>+2,400</strong> عميل راضٍ في المملكة
                  </p>
                </div>

                {/* Trust signals */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: <Package className="w-4 h-4" />, label: "تغليف خاص" },
                    { icon: <Shield className="w-4 h-4" />, label: "دفع آمن" },
                    { icon: <CheckCircle className="w-4 h-4" />, label: "ضمان الجودة" },
                  ].map((t) => (
                    <div
                      key={t.label}
                      className="flex flex-col items-center gap-1 p-2.5 bg-brand-50 rounded-lg text-brand"
                    >
                      {t.icon}
                      <span className="text-[10px] font-medium">{t.label}</span>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onValid)} className="space-y-4">
                  <Input
                    id="name"
                    label="الاسم الكامل"
                    placeholder="مثال: محمد العتيبي"
                    autoComplete="name"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <Input
                    id="phone"
                    label="رقم الجوال"
                    placeholder="05XXXXXXXX"
                    type="tel"
                    inputMode="numeric"
                    dir="ltr"
                    autoComplete="tel"
                    maxLength={10}
                    error={errors.phone?.message}
                    {...register("phone")}
                  />

                  {apiError && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                      {apiError}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>بياناتك محمية ولن تُشارك مع أي طرف ثالث</span>
                  </div>

                  <Button type="submit" size="lg" className="w-full text-base">
                    تأكيد الطلب — الدفع عند الاستلام
                  </Button>

                  <p className="text-center text-xs text-gray-400">
                    بالضغط على تأكيد الطلب، أنت توافق على{" "}
                    <a href="/terms" className="underline hover:text-brand">الشروط والأحكام</a>
                  </p>
                </form>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Upsell modal shown after valid form, before order submission */}
      {showUpsell && formData && (
        <UpsellModal
          mainSku={mainSku}
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

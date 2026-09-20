"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BEAUTY_OFFERS, OFFERS } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";

interface OfferSelectorProps {
  product: Product;
}

export function OfferSelector({ product }: OfferSelectorProps) {
  const [selectedQty, setSelectedQty] = useState<1 | 2 | 3>(product.line === "beauty" ? 2 : 1);
  const { addItem, openCart } = useCartStore();
  const currency = product.currency === "MAD" ? "MAD" : "SAR";
  const offers = product.line === "beauty" ? BEAUTY_OFFERS : OFFERS;

  const selectedOffer = offers.find((o) => o.qty === selectedQty)!;

  const handleAddToCart = () => {
    addItem({
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      image: product.image,
      quantity: selectedQty,
      isUpsell: false,
    });
    openCart();
  };

  return (
    <div className="space-y-4">
      {/* Offer Options */}
      <div className="space-y-2.5">
        <p className="text-sm font-medium text-gray-600">اختر الكمية:</p>
        {offers.map((offer) => (
          <button
            key={offer.qty}
            onClick={() => setSelectedQty(offer.qty)}
            className={`min-h-[44px] w-full text-start flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-150 ${
              selectedQty === offer.qty
                ? "border-brand bg-brand-50"
                : "border-gray-200 hover:border-brand-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedQty === offer.qty
                    ? "border-brand bg-brand"
                    : "border-gray-300"
                }`}
              >
                {selectedQty === offer.qty && (
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                )}
              </div>
              <div>
                <p className={`font-semibold text-sm ${selectedQty === offer.qty ? "text-brand" : "text-gray-800"}`}>
                  {offer.label}
                </p>
                {offer.originalPrice && (
                  <p className="text-xs text-gray-400 line-through">
                    {formatPrice(offer.originalPrice, "ar", currency)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {offer.badge && (
                <Badge variant={offer.qty === 3 ? "gold" : "default"} className="text-[10px]">
                  {offer.badge}
                </Badge>
              )}
              <span className={`font-bold text-base ${selectedQty === offer.qty ? "text-brand" : "text-gray-700"}`}>
                {formatPrice(offer.price, "ar", currency)}
              </span>
            </div>
          </button>
        ))}
      </div>

      <Button size="xl" className="hidden min-h-[44px] w-full text-lg md:inline-flex" onClick={handleAddToCart}>
        اطلب الآن · {formatPrice(selectedOffer.price, "ar", currency)}
      </Button>

      <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
        <span>الدفع عند الاستلام</span>
        <span>·</span>
        <span>{product.currency === "MAD" ? "توصيل المغرب" : "تغليف خاص"}</span>
      </div>

      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-gray-100 bg-white p-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden">
        <Button size="xl" className="min-h-[44px] w-full text-lg" onClick={handleAddToCart}>
          اطلب الآن · {formatPrice(selectedOffer.price, "ar", currency)}
        </Button>
        <p className="mt-1 text-center text-[11px] text-gray-400">الدفع عند الاستلام · تغليف خاص</p>
      </div>
    </div>
  );
}

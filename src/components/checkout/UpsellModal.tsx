"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Clock, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { PRODUCTS, UPSELL_PRICE } from "@/lib/products";

// Upsell suggestion: pick a product different from the main one
function getUpsellProduct(mainSku: string | undefined) {
  return PRODUCTS.find((p) => p.sku !== mainSku) ?? PRODUCTS[0];
}

interface UpsellModalProps {
  mainSku: string | undefined;
  onAccept: (upsellSku: string) => void;
  onDecline: () => void;
  isSubmitting: boolean;
}

const COUNTDOWN_SECONDS = 12;

export function UpsellModal({ mainSku, onAccept, onDecline, isSubmitting }: UpsellModalProps) {
  const upsell = getUpsellProduct(mainSku);
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (seconds <= 0) {
      onDecline();
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, onDecline]);

  const progress = ((COUNTDOWN_SECONDS - seconds) / COUNTDOWN_SECONDS) * 100;

  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
          aria-describedby="upsell-description"
        >
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
            {/* Progress bar */}
            <div className="h-1 bg-gray-100">
              <div
                className="h-full bg-brand transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="px-5 py-5">
              {/* Header */}
              <Dialog.Title className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-1">
                <Sparkles className="w-5 h-5 text-amber-500" />
                عرض خاص لك فقط!
              </Dialog.Title>
              <p id="upsell-description" className="text-sm text-gray-500 mb-5">
                قبل تأكيد طلبك، أضف هذا المنتج بسعر مخصوص
              </p>

              {/* Countdown */}
              <div className="flex items-center gap-2 mb-4 text-sm text-brand font-medium">
                <Clock className="w-4 h-4" />
                <span>ينتهي العرض خلال {seconds} ثانية</span>
              </div>

              {/* Upsell product */}
              <div className="flex items-start gap-4 p-4 bg-cream rounded-xl border border-brand/20">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-sand shrink-0">
                  <Image
                    src={upsell.image}
                    alt={upsell.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm leading-snug">{upsell.name}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                    {upsell.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-brand">
                      {formatPrice(UPSELL_PRICE)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(199)}
                    </span>
                    <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">
                      وفّر 100 ريال
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                <Button
                  size="lg"
                  className="w-full text-base"
                  onClick={() => onAccept(upsell.sku)}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  نعم، أضفه لطلبي
                </Button>
                <button
                  onClick={onDecline}
                  disabled={isSubmitting}
                  className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-2 disabled:opacity-50"
                >
                  لا شكراً، أكمل بدونه
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

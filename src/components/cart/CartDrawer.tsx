"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { PRODUCTS } from "@/lib/products";
import { useCartStore } from "@/store/cart";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, openCheckout, getTotal } = useCartStore();
  const mainItems = items.filter((i) => !i.isUpsell);
  const total = getTotal();

  // Cross-sells: products not in cart
  const cartSkus = new Set(items.map((i) => i.sku));
  const crossSells = PRODUCTS.filter((p) => !cartSkus.has(p.sku)).slice(0, 2);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content
          className="fixed inset-y-0 start-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-left"
          aria-describedby="cart-description"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <Dialog.Title className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand" />
              سلة التسوق
              {mainItems.length > 0 && (
                <span className="text-sm font-normal text-gray-400">({mainItems.length})</span>
              )}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="إغلاق السلة"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          <div id="cart-description" className="sr-only">سلة التسوق الخاصة بك</div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">
            {mainItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-200" />
                <p className="text-gray-400 font-medium">سلتك فارغة</p>
                <p className="text-gray-300 text-sm">أضف منتجاً للبدء</p>
                <Dialog.Close asChild>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/collection">تصفح المنتجات</Link>
                  </Button>
                </Dialog.Close>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {mainItems.map((item) => (
                  <div key={item.sku} className="flex items-start gap-4 px-5 py-4">
                    <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-sand shrink-0" style={{width: 72, height: 72}}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm leading-snug line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        الكمية: {item.quantity}
                      </p>
                      <p className="text-brand font-bold mt-1">
                        {formatPrice(item.bundlePrice)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.sku)}
                      className="text-gray-300 hover:text-red-400 transition-colors mt-1"
                      aria-label="حذف من السلة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Cross-sells */}
                {crossSells.length > 0 && (
                  <div className="px-5 py-5 bg-cream">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      قد يعجبك أيضاً
                    </h3>
                    <div className="space-y-3">
                      {crossSells.map((product) => (
                        <div
                          key={product.sku}
                          className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100"
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-sand shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-800 line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-xs text-brand font-bold">
                              {formatPrice(199)}
                            </p>
                          </div>
                          <Dialog.Close asChild>
                            <Link
                              href={`/products/${product.slug}`}
                              className="text-xs text-brand border border-brand rounded-lg px-2.5 py-1 hover:bg-brand hover:text-white transition-colors whitespace-nowrap"
                            >
                              عرض
                            </Link>
                          </Dialog.Close>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {mainItems.length > 0 && (
            <div className="border-t border-gray-100 px-5 py-5 space-y-3 bg-white">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">المجموع</span>
                <span className="text-xl font-bold text-brand">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-gray-400 text-center">الدفع عند الاستلام • شحن مجاني</p>
              <Button
                size="lg"
                className="w-full text-base"
                onClick={() => {
                  closeCart();
                  openCheckout();
                }}
              >
                إتمام الطلب
              </Button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

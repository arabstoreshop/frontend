import { create } from "zustand";
import { persist } from "zustand/middleware";

import { BEAUTY_BUNDLE_PRICES, BUNDLE_PRICES, catalogLine, UPSELL_PRICE } from "@/lib/products";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  addItem: (item: Omit<CartItem, "bundlePrice">) => void;
  removeItem: (sku: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getMainQty: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isCheckoutOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      openCheckout: () => set({ isCheckoutOpen: true, isOpen: false }),
      closeCheckout: () => set({ isCheckoutOpen: false }),

      addItem: (newItem) => {
        set((state) => {
          const incomingLine = catalogLine(newItem.sku);
          const qty = ([1, 2, 3].includes(newItem.quantity) ? newItem.quantity : 1) as 1 | 2 | 3;
          const withoutOtherLine = state.items.filter(
            (i) => i.isUpsell || catalogLine(i.sku) === incomingLine
          );
          const rest = withoutOtherLine.filter(
            (i) => !(i.sku === newItem.sku && i.isUpsell === newItem.isUpsell)
          );
          return {
            items: recomputePrices([...rest, { ...newItem, quantity: qty, bundlePrice: 0 }]),
          };
        });
      },

      removeItem: (sku) => {
        set((state) => ({
          items: recomputePrices(state.items.filter((i) => i.sku !== sku)),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const { items } = get();
        return items.reduce((sum, i) => sum + i.bundlePrice, 0);
      },

      getMainQty: () => {
        const { items } = get();
        return items
          .filter((i) => !i.isUpsell)
          .reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    {
      name: "naseem-cart",
      partialize: (state) => ({ items: state.items }),
      merge: (persisted, current) => {
        const saved = persisted as Partial<CartState> | undefined;
        return {
          ...current,
          ...saved,
          items: recomputePrices(saved?.items ?? []),
        };
      },
    }
  )
);

function recomputePrices(items: CartItem[]): CartItem[] {
  const mainItems = items.filter((i) => !i.isUpsell);
  const upsellItems = items.filter((i) => i.isUpsell);

  const pricedMain = mainItems.map((item) => {
    const qty = [1, 2, 3].includes(item.quantity) ? item.quantity : 1;
    const table = catalogLine(item.sku) === "beauty" ? BEAUTY_BUNDLE_PRICES : BUNDLE_PRICES;
    return { ...item, quantity: qty, bundlePrice: table[qty] ?? 199 };
  });

  const pricedUpsell = upsellItems.map((item) => ({
    ...item,
    bundlePrice: UPSELL_PRICE,
  }));

  return [...pricedMain, ...pricedUpsell];
}

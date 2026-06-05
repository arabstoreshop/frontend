import { create } from "zustand";
import { persist } from "zustand/middleware";

import { BUNDLE_PRICES, UPSELL_PRICE } from "@/lib/products";
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
          const existing = state.items.find(
            (i) => i.sku === newItem.sku && i.isUpsell === newItem.isUpsell
          );
          if (existing) {
            return state;
          }
          return { items: [...state.items, { ...newItem, bundlePrice: 0 }] };
        });
        // Recompute bundle prices
        set((state) => ({
          items: recomputePrices(state.items),
        }));
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
    }
  )
);

function recomputePrices(items: CartItem[]): CartItem[] {
  const mainItems = items.filter((i) => !i.isUpsell);
  const upsellItems = items.filter((i) => i.isUpsell);

  const mainQty = mainItems.reduce((s, i) => s + i.quantity, 0);
  const bundlePrice = BUNDLE_PRICES[mainQty] ?? 199;

  // Assign bundle price to first main item, 0 to rest
  let remaining = bundlePrice;
  const pricedMain = mainItems.map((item, idx) => {
    const price = idx === 0 ? remaining : 0;
    remaining = 0;
    return { ...item, bundlePrice: price };
  });

  const pricedUpsell = upsellItems.map((item) => ({
    ...item,
    bundlePrice: UPSELL_PRICE,
  }));

  return [...pricedMain, ...pricedUpsell];
}

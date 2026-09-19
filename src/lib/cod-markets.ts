export type Category = "cosmetic" | "gadget";
export type MarketId = "KSA" | "UAE" | "BHR" | "OMN" | "KWT" | "QTR" | "MA";

export type MarketFees = {
  id: MarketId;
  name: string;
  currency: "USD" | "MAD";
  /** Multiply native currency → USD */
  toUsd: number;
  provider: string;
  shippingWithCc: { delivered: number; returned: number };
  shippingNoCc: number;
  fulfillment: number;
  vatNote: string;
  codFeePct: number;
  callCenter: Record<Category, { lead: number; confirmed: number; delivered: number }>;
  /** If true, delivered CC fee replaces confirmed fee (Digylog 6→10). */
  deliveredReplacesConfirm?: boolean;
  zones?: { id: string; label: string; shipping: number }[];
};

const USD = 1;

export const MARKETS: MarketFees[] = [
  {
    id: "KSA",
    name: "Saudi Arabia",
    currency: "USD",
    toUsd: USD,
    provider: "COD Network",
    shippingWithCc: { delivered: 4.99, returned: 2.99 },
    shippingNoCc: 6.99,
    fulfillment: 0,
    vatNote: "Included",
    codFeePct: 0.05,
    callCenter: {
      gadget: { lead: 0.5, confirmed: 1, delivered: 2 },
      cosmetic: { lead: 0.5, confirmed: 2, delivered: 3 },
    },
  },
  {
    id: "UAE",
    name: "United Arab Emirates",
    currency: "USD",
    toUsd: USD,
    provider: "COD Network",
    shippingWithCc: { delivered: 5.99, returned: 4.99 },
    shippingNoCc: 6.99,
    fulfillment: 0,
    vatNote: "Included",
    codFeePct: 0.05,
    callCenter: {
      gadget: { lead: 0.5, confirmed: 1, delivered: 2 },
      cosmetic: { lead: 0.5, confirmed: 2, delivered: 3 },
    },
  },
  {
    id: "BHR",
    name: "Bahrain",
    currency: "USD",
    toUsd: USD,
    provider: "COD Network",
    shippingWithCc: { delivered: 6.99, returned: 5.99 },
    shippingNoCc: 7.99,
    fulfillment: 0,
    vatNote: "Included",
    codFeePct: 0.05,
    callCenter: {
      gadget: { lead: 0.5, confirmed: 1, delivered: 2 },
      cosmetic: { lead: 0.5, confirmed: 2, delivered: 3 },
    },
  },
  {
    id: "OMN",
    name: "Oman",
    currency: "USD",
    toUsd: USD,
    provider: "COD Network",
    shippingWithCc: { delivered: 6.99, returned: 5.99 },
    shippingNoCc: 7.99,
    fulfillment: 0,
    vatNote: "Included",
    codFeePct: 0.05,
    callCenter: {
      gadget: { lead: 0.5, confirmed: 1, delivered: 2 },
      cosmetic: { lead: 0.5, confirmed: 2, delivered: 3 },
    },
  },
  {
    id: "KWT",
    name: "Kuwait",
    currency: "USD",
    toUsd: USD,
    provider: "COD Network",
    shippingWithCc: { delivered: 6.99, returned: 5.99 },
    shippingNoCc: 7.99,
    fulfillment: 0,
    vatNote: "Included",
    codFeePct: 0.05,
    callCenter: {
      gadget: { lead: 0.5, confirmed: 1, delivered: 2 },
      cosmetic: { lead: 0.5, confirmed: 2, delivered: 3 },
    },
  },
  {
    id: "QTR",
    name: "Qatar",
    currency: "USD",
    toUsd: USD,
    provider: "COD Network",
    shippingWithCc: { delivered: 6.99, returned: 5.99 },
    shippingNoCc: 7.99,
    fulfillment: 0,
    vatNote: "Included",
    codFeePct: 0.05,
    callCenter: {
      gadget: { lead: 0.5, confirmed: 1, delivered: 2 },
      cosmetic: { lead: 0.5, confirmed: 2, delivered: 3 },
    },
  },
  {
    id: "MA",
    name: "Morocco (Digylog)",
    currency: "MAD",
    toUsd: 1 / 10,
    provider: "Digylog",
    shippingWithCc: { delivered: 33, returned: 18 },
    shippingNoCc: 33,
    fulfillment: 0,
    vatNote: "Included in courier",
    codFeePct: 0,
    deliveredReplacesConfirm: true,
    callCenter: {
      gadget: { lead: 0, confirmed: 6, delivered: 10 },
      cosmetic: { lead: 0, confirmed: 6, delivered: 10 },
    },
    zones: [
      { id: "casa", label: "Casablanca / Mohammedia", shipping: 29 },
      { id: "rabat", label: "Rabat / Salé / Témara / Kénitra", shipping: 29 },
      { id: "tanger", label: "Tanger / Tétouan", shipping: 32 },
      { id: "marrakech", label: "Marrakech / Agadir / Safi", shipping: 35 },
      { id: "fes", label: "Fès / Meknès / Oujda / Taza", shipping: 35 },
      { id: "other", label: "Other cities", shipping: 39 },
      { id: "mix", label: "Average mix", shipping: 33 },
    ],
  },
];

export function marketById(id: MarketId) {
  return MARKETS.find((m) => m.id === id) || MARKETS[0];
}

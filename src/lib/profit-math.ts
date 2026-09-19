export type CalcInput = {
  leads: number;
  cpl: number;
  confRate: number;
  delRate: number;
  aovUsd: number;
  avgPieces: number;
  productCost: number;
  feeLead: number;
  feeConfirmed: number;
  feeDeliveredCc: number;
  deliveredReplacesConfirm: boolean;
  feeReturn: number;
  feeFulfill: number;
  feeShipDelivered: number;
  codFeePct: number;
};

export type CalcResult = {
  confirmed: number;
  delivered: number;
  returned: number;
  shipped: number;
  adSpend: number;
  ccLead: number;
  ccConfirm: number;
  ccDeliver: number;
  fulfill: number;
  shipDelivered: number;
  shipReturned: number;
  cogs: number;
  codFees: number;
  ops: number;
  totalCost: number;
  revenue: number;
  profit: number;
  roi: number;
  profitPerDelivered: number;
  costPerDelivered: number;
  contributionPerDelivered: number;
  maxCpl: number;
  beRoas: number;
};

function n(v: number) {
  return Number.isFinite(v) ? v : 0;
}

export function runCalc(raw: CalcInput): CalcResult {
  const i = {
    leads: Math.max(0, n(raw.leads)),
    cpl: Math.max(0, n(raw.cpl)),
    confRate: Math.min(1, Math.max(0, n(raw.confRate))),
    delRate: Math.min(1, Math.max(0, n(raw.delRate))),
    aovUsd: Math.max(0, n(raw.aovUsd)),
    avgPieces: Math.max(0, n(raw.avgPieces)),
    productCost: Math.max(0, n(raw.productCost)),
    feeLead: Math.max(0, n(raw.feeLead)),
    feeConfirmed: Math.max(0, n(raw.feeConfirmed)),
    feeDeliveredCc: Math.max(0, n(raw.feeDeliveredCc)),
    deliveredReplacesConfirm: raw.deliveredReplacesConfirm,
    feeReturn: Math.max(0, n(raw.feeReturn)),
    feeFulfill: Math.max(0, n(raw.feeFulfill)),
    feeShipDelivered: Math.max(0, n(raw.feeShipDelivered)),
    codFeePct: Math.min(1, Math.max(0, n(raw.codFeePct))),
  };

  const confirmed = i.leads * i.confRate;
  const shipped = confirmed;
  const delivered = confirmed * i.delRate;
  const returned = Math.max(0, shipped - delivered);

  const adSpend = i.leads * i.cpl;
  const ccLead = i.leads * i.feeLead;
  let ccConfirm = 0;
  let ccDeliver = 0;
  if (i.deliveredReplacesConfirm) {
    ccConfirm = returned * i.feeConfirmed;
    ccDeliver = delivered * i.feeDeliveredCc;
  } else {
    ccConfirm = confirmed * i.feeConfirmed;
    ccDeliver = delivered * i.feeDeliveredCc;
  }
  const fulfill = shipped * i.feeFulfill;
  const shipDelivered = delivered * i.feeShipDelivered;
  const shipReturned = returned * i.feeReturn;
  const cogs = shipped * i.avgPieces * i.productCost;
  const revenue = delivered * i.aovUsd;
  const codFees = revenue * i.codFeePct;
  const ops = ccLead + ccConfirm + ccDeliver + fulfill + shipDelivered + shipReturned + cogs + codFees;
  const totalCost = adSpend + ops;
  const profit = revenue - totalCost;
  const roi = adSpend > 0 ? profit / adSpend : 0;
  const profitPerDelivered = delivered > 0 ? profit / delivered : 0;
  const costPerDelivered = delivered > 0 ? totalCost / delivered : 0;
  const contributionPerDelivered = delivered > 0 ? (revenue - ops) / delivered : 0;

  const otherPerLead =
    i.leads > 0 ? ops / i.leads : 0;
  const revenuePerLead = i.leads > 0 ? revenue / i.leads : 0;
  const maxCpl = revenuePerLead - otherPerLead;
  const beRoas = maxCpl > 0 && i.aovUsd > 0 ? i.aovUsd / Math.max(maxCpl, 0.0001) : 0;

  return {
    confirmed,
    delivered,
    returned,
    shipped,
    adSpend,
    ccLead,
    ccConfirm,
    ccDeliver,
    fulfill,
    shipDelivered,
    shipReturned,
    cogs,
    codFees,
    ops,
    totalCost,
    revenue,
    profit,
    roi,
    profitPerDelivered,
    costPerDelivered,
    contributionPerDelivered,
    maxCpl,
    beRoas,
  };
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { isAdminUnlocked, lockAdmin, unlockAdmin } from "@/lib/admin-auth";
import { MARKETS, marketById, type Category, type MarketId } from "@/lib/cod-markets";
import { runCalc } from "@/lib/profit-math";

const API = process.env.NEXT_PUBLIC_ADMIN_API_URL || process.env.NEXT_PUBLIC_API_URL || "https://api.naseem.beauty";
const KEY_STORE = "naseem-admin-key";

type Aov = {
  order_count: number;
  revenue_sar: number;
  aov_sar: number;
  aov_usd: number;
  avg_pieces: number;
  sar_per_usd: number;
  source: string;
};

function money(n: number) {
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const sign = n < 0 ? "-" : "";
  return `${sign}$${formatted}`;
}

function usd(n: number) {
  return Math.round(n * 100) / 100;
}

function Field({
  label, value, onChange, suffix, hint,
}: {
  label: string; value: number; onChange: (v: number) => void; suffix?: string; hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-[#9cb3a8]">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-[#2a3a34] bg-[#161d1a] px-3 py-2 focus-within:border-[#3d8f6b]">
        <input
          type="number"
          step="any"
          className="w-full bg-transparent text-[15px] font-semibold text-[#e8efe9] outline-none"
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        />
        {suffix ? <span className="shrink-0 text-xs text-[#7f968c]">{suffix}</span> : null}
      </div>
      {hint ? <span className="mt-1 block text-[11px] text-[#6f857c]">{hint}</span> : null}
    </label>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"calculator" | "aov">("calculator");
  const [section, setSection] = useState<"breakeven" | "scale">("breakeven");
  const [aov, setAov] = useState<Aov | null>(null);
  const [marketId, setMarketId] = useState<MarketId>("KSA");
  const [category, setCategory] = useState<Category>("cosmetic");
  const [zone, setZone] = useState("mix");
  const [manualAov, setManualAov] = useState(false);

  const [leads, setLeads] = useState(1000);
  const [cpl, setCpl] = useState(3);
  const [confRate, setConfRate] = useState(0.45);
  const [delRate, setDelRate] = useState(0.65);
  const [aovUsd, setAovUsd] = useState(53.07);
  const [avgPieces, setAvgPieces] = useState(1.4);
  const [productCost, setProductCost] = useState(4);
  const [feeLead, setFeeLead] = useState(0.5);
  const [feeConfirmed, setFeeConfirmed] = useState(2);
  const [feeDeliveredCc, setFeeDeliveredCc] = useState(3);
  const [feeReturn, setFeeReturn] = useState(2.99);
  const [feeFulfill, setFeeFulfill] = useState(0);
  const [feeShipDelivered, setFeeShipDelivered] = useState(4.99);
  const [codFeePct, setCodFeePct] = useState(0.05);

  const market = marketById(marketId);

  useEffect(() => {
    setAuthed(isAdminUnlocked());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!authed) return;
    const stored = sessionStorage.getItem(KEY_STORE) || "";
    fetch(`${API}/admin/aov`, { headers: stored ? { "X-Admin-Key": stored } : {} })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Aov | null) => {
        if (!data) return;
        setAov(data);
        if (!manualAov) {
          setAovUsd(data.aov_usd);
          setAvgPieces(data.avg_pieces);
        }
      })
      .catch(() => undefined);
  }, [authed]);

  useEffect(() => {
    const cc = market.callCenter[category];
    const rate = market.toUsd;
    setFeeLead(usd(cc.lead * rate));
    setFeeConfirmed(usd(cc.confirmed * rate));
    setFeeDeliveredCc(usd(cc.delivered * rate));
    setFeeReturn(usd(market.shippingWithCc.returned * rate));
    setFeeFulfill(usd(market.fulfillment * rate));
    setCodFeePct(market.codFeePct);
    if (market.zones) {
      const z = market.zones.find((x) => x.id === zone) || market.zones[market.zones.length - 1];
      setFeeShipDelivered(usd(z.shipping * rate));
    } else {
      setFeeShipDelivered(usd(market.shippingWithCc.delivered * rate));
    }
  }, [market, category, zone]);

  const input = useMemo(() => ({
    leads,
    cpl,
    confRate,
    delRate,
    aovUsd,
    avgPieces,
    productCost,
    feeLead,
    feeConfirmed,
    feeDeliveredCc,
    deliveredReplacesConfirm: Boolean(market.deliveredReplacesConfirm),
    feeReturn,
    feeFulfill,
    feeShipDelivered,
    codFeePct,
  }), [leads, cpl, confRate, delRate, aovUsd, avgPieces, productCost, feeLead, feeConfirmed, feeDeliveredCc, feeReturn, feeFulfill, feeShipDelivered, codFeePct, market.deliveredReplacesConfirm]);

  const result = useMemo(() => runCalc(input), [input]);
  const be = useMemo(() => runCalc({ ...input, cpl: Math.max(0, result.maxCpl) }), [input, result.maxCpl]);

  if (!ready) {
    return <div className="min-h-screen bg-[#0f1412]" />;
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3d8f6b]">Naseem admin</p>
        <h1 className="mt-2 text-3xl font-black">Login</h1>
        <p className="mt-2 text-sm text-[#9cb3a8]">هاد الحساب خاصو كلمة السر. ماشي مفتوح للعموم.</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            const ok = await unlockAdmin(password);
            if (!ok) {
              setError("كلمة السر غالطة.");
              return;
            }
            setError("");
            setAuthed(true);
          }}
        >
          <label className="block">
            <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-[#9cb3a8]">Password</span>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[#2a3a34] bg-[#161d1a] px-3 py-3 text-[15px] font-semibold outline-none focus:border-[#3d8f6b]"
            />
          </label>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <button type="submit" className="w-full rounded-full bg-[#3d8f6b] px-4 py-3 text-sm font-bold text-white">
            دخول
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-16">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3d8f6b]">Naseem admin</p>
          <h1 className="text-3xl font-black">COD profit</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setTab("calculator")} className={`rounded-full px-4 py-2 text-sm font-bold ${tab === "calculator" ? "bg-[#3d8f6b] text-white" : "bg-[#1b2521] text-[#9cb3a8]"}`}>Profit calculator</button>
          <button onClick={() => setTab("aov")} className={`rounded-full px-4 py-2 text-sm font-bold ${tab === "aov" ? "bg-[#3d8f6b] text-white" : "bg-[#1b2521] text-[#9cb3a8]"}`}>Lifetime AOV</button>
          <button
            onClick={() => {
              lockAdmin();
              setAuthed(false);
              setPassword("");
            }}
            className="rounded-full bg-[#1b2521] px-4 py-2 text-sm font-bold text-[#9cb3a8]"
          >
            خروج
          </button>
        </div>
      </header>

      <div className="mb-5 grid gap-3 sm:grid-cols-4">
        <Stat label="Lifetime AOV" value={aov ? money(aov.aov_usd) : money(aovUsd)} sub="USD" />
        <Stat label="Avg pieces / order" value={aov ? String(aov.avg_pieces) : String(avgPieces)} sub="units in the AOV basket" />
        <Stat label="Orders" value={aov ? String(aov.order_count) : "manual"} sub={aov?.source === "orders" ? "live database" : "type AOV below"} />
        <Stat label="Revenue" value={aov ? money(aov.revenue_sar / (aov.sar_per_usd || 3.75)) : "—"} sub="lifetime USD" />
      </div>

      {tab === "aov" ? (
        <div className="rounded-2xl border border-[#2a3a34] bg-[#161d1a] p-6 text-sm leading-7 text-[#c5d5cc]">
          All numbers are USD. Average pieces is total item quantity ÷ orders — that is the basket that created this AOV. Override both in the calculator if you want to model a different offer.
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            {MARKETS.map((m) => (
              <button
                key={m.id}
                onClick={() => setMarketId(m.id)}
                className={`rounded-full px-3 py-1.5 text-sm font-bold ${marketId === m.id ? "bg-[#e8efe9] text-[#0f1412]" : "bg-[#1b2521] text-[#9cb3a8]"}`}
              >
                {m.id === "MA" ? "Morocco" : m.id}
              </button>
            ))}
          </div>

          <p className="mb-4 text-sm text-[#9cb3a8]">
            Fees prefills from <b className="text-[#e8efe9]">{market.provider}</b> · {market.name}. Everything is in USD and editable.
          </p>

          <div className="mb-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <Box title="Campaign variables">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Leads" value={leads} onChange={setLeads} />
                  <Field label="Cost per lead" value={cpl} onChange={setCpl} suffix="$" />
                  <Field label="Confirmation rate" value={Math.round(confRate * 1000) / 10} onChange={(v) => setConfRate(v / 100)} suffix="%" />
                  <Field label="Delivery rate" value={Math.round(delRate * 1000) / 10} onChange={(v) => setDelRate(v / 100)} suffix="%" hint="of confirmed orders" />
                  <Field
                    label="AOV"
                    value={aovUsd}
                    onChange={(v) => { setManualAov(true); setAovUsd(v); }}
                    suffix="$"
                  />
                  <Field
                    label="Avg pieces / order"
                    value={avgPieces}
                    onChange={(v) => { setManualAov(true); setAvgPieces(v); }}
                    hint="units that made this AOV"
                  />
                  <Field label="Product cost / piece" value={productCost} onChange={setProductCost} suffix="$" />
                  <div>
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-[#9cb3a8]">Category</span>
                    <div className="flex gap-2">
                      {(["cosmetic", "gadget"] as Category[]).map((c) => (
                        <button key={c} onClick={() => setCategory(c)} className={`flex-1 rounded-xl py-2 text-sm font-bold capitalize ${category === c ? "bg-[#3d8f6b] text-white" : "bg-[#1b2521] text-[#9cb3a8]"}`}>{c}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </Box>

              <Box title="Unit fees ($)">
                {market.zones ? (
                  <label className="mb-3 block">
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-[#9cb3a8]">Digylog city zone</span>
                    <select
                      value={zone}
                      onChange={(e) => setZone(e.target.value)}
                      className="w-full rounded-xl border border-[#2a3a34] bg-[#161d1a] px-3 py-2 text-sm font-semibold"
                    >
                      {market.zones.map((z) => (
                        <option key={z.id} value={z.id}>{z.label} — ${usd(z.shipping * market.toUsd).toFixed(2)}</option>
                      ))}
                    </select>
                  </label>
                ) : null}
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Per lead (call center)" value={feeLead} onChange={setFeeLead} suffix="$" />
                  <Field label="Per confirmed lead" value={feeConfirmed} onChange={setFeeConfirmed} suffix="$" hint={market.deliveredReplacesConfirm ? "Digylog: $0.60 if not delivered" : "COD Network confirmation"} />
                  <Field label="Per delivered order" value={feeDeliveredCc} onChange={setFeeDeliveredCc} suffix="$" hint={market.deliveredReplacesConfirm ? "Digylog: $1.00 if delivered" : "extra CC fee on delivery"} />
                  <Field label="Per return" value={feeReturn} onChange={setFeeReturn} suffix="$" />
                  <Field label="Per fulfilled (left warehouse)" value={feeFulfill} onChange={setFeeFulfill} suffix="$" />
                  <Field label="Shipping delivered" value={feeShipDelivered} onChange={setFeeShipDelivered} suffix="$" />
                  <Field label="COD fee" value={Math.round(codFeePct * 1000) / 10} onChange={(v) => setCodFeePct(v / 100)} suffix="%" />
                </div>
              </Box>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <button onClick={() => setSection("breakeven")} className={`flex-1 rounded-xl py-2 text-sm font-bold ${section === "breakeven" ? "bg-[#3d8f6b] text-white" : "bg-[#1b2521]"}`}>Breakeven</button>
                <button onClick={() => setSection("scale")} className={`flex-1 rounded-xl py-2 text-sm font-bold ${section === "scale" ? "bg-[#3d8f6b] text-white" : "bg-[#1b2521]"}`}>Scale profit</button>
              </div>

              {section === "breakeven" ? (
                <Box title="Breakeven">
                  <Big label="Max CPL" value={money(result.maxCpl)} good={result.maxCpl > 0} />
                  <p className="mt-2 text-sm text-[#9cb3a8]">Pay more than this per lead and you lose money at these rates.</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Mini label="Contribution / delivered" value={money(result.contributionPerDelivered)} />
                    <Mini label="Delivered / 100 leads" value={(result.delivered / Math.max(leads, 1) * 100).toFixed(1)} />
                    <Mini label="Confirm → deliver" value={`${Math.round(confRate * 100)}% × ${Math.round(delRate * 100)}%`} />
                    <Mini label="AOV after COD %" value={money(aovUsd * (1 - codFeePct))} />
                  </div>
                  <div className="mt-4 rounded-xl bg-[#0f1412] p-3 text-xs text-[#9cb3a8]">
                    At max CPL ({money(Math.max(0, result.maxCpl))}) profit is {money(be.profit)} on {leads} leads.
                  </div>
                </Box>
              ) : (
                <Box title={`P&L on ${leads.toLocaleString()} leads`}>
                  <Big label="Net profit" value={money(result.profit)} good={result.profit >= 0} />
                  <div className="mt-4 space-y-1.5 text-sm">
                    <Row k="Revenue" v={money(result.revenue)} />
                    <Row k="Ad spend" v={money(result.adSpend)} />
                    <Row k="Call center" v={money(result.ccLead + result.ccConfirm + result.ccDeliver)} />
                    <Row k="Fulfillment" v={money(result.fulfill)} />
                    <Row k="Shipping delivered" v={money(result.shipDelivered)} />
                    <Row k="Returns" v={money(result.shipReturned)} />
                    <Row k="COGS" v={money(result.cogs)} />
                    <Row k="COD % fees" v={money(result.codFees)} />
                    <Row k="Total cost" v={money(result.totalCost)} />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Mini label="ROI on ads" value={`${Math.round(result.roi * 100)}%`} />
                    <Mini label="Profit / delivered" value={money(result.profitPerDelivered)} />
                    <Mini label="Confirmed" value={Math.round(result.confirmed).toLocaleString()} />
                    <Mini label="Delivered / returned" value={`${Math.round(result.delivered)} / ${Math.round(result.returned)}`} />
                  </div>
                </Box>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#2a3a34] bg-[#161d1a] p-5">
      <h2 className="mb-4 text-lg font-black">{title}</h2>
      {children}
    </section>
  );
}
function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-[#2a3a34] bg-[#161d1a] p-4">
      <div className="text-[11px] font-bold uppercase tracking-wide text-[#9cb3a8]">{label}</div>
      <div className="mt-1 text-2xl font-black">{value}</div>
      <div className="text-xs text-[#6f857c]">{sub}</div>
    </div>
  );
}
function Big({ label, value, good }: { label: string; value: string; good?: boolean }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-wide text-[#9cb3a8]">{label}</div>
      <div className={`mt-1 text-4xl font-black ${good === false ? "text-red-300" : "text-[#7dcca8]"}`}>{value}</div>
    </div>
  );
}
function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#0f1412] p-3">
      <div className="text-[10px] font-bold uppercase text-[#6f857c]">{label}</div>
      <div className="mt-1 font-black">{value}</div>
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 text-[#c5d5cc]">
      <span>{k}</span>
      <span className="font-bold text-[#e8efe9]">{v}</span>
    </div>
  );
}

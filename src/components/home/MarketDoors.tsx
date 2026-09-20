"use client";

import { useMarketLine } from "@/hooks/useMarketLine";

export function MarketDoors() {
  const { line, choose } = useMarketLine();

  return (
    <section className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl gap-2 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => choose("care")}
          className={`min-h-[44px] flex-1 rounded-full px-3 text-sm font-bold transition-colors ${
            line === "care"
              ? "bg-brand text-white shadow-sm"
              : "bg-cream text-gray-700 ring-1 ring-gray-200"
          }`}
        >
          عناية حساسة · السعودية · ريال
        </button>
        <button
          type="button"
          onClick={() => choose("beauty")}
          className={`min-h-[44px] flex-1 rounded-full px-3 text-sm font-bold transition-colors ${
            line === "beauty"
              ? "bg-[#2a0f16] text-white shadow-sm"
              : "bg-cream text-gray-700 ring-1 ring-gray-200"
          }`}
        >
          جمال · المغرب · د.م.
        </button>
      </div>
    </section>
  );
}

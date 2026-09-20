"use client";

import { usePathname, useRouter } from "next/navigation";

import { useMarketLine } from "@/hooks/useMarketLine";
import { pathLang } from "@/lib/lang";
import { homePathForLine, lineHref } from "@/lib/market";

export function MarketDoors() {
  const { line, choose } = useMarketLine();
  const pathname = usePathname() || "/ar";
  const router = useRouter();
  const lang = pathLang(pathname);

  const onChoose = (next: typeof line) => {
    choose(next);
    const target = lineHref(homePathForLine(lang, next), next);
    const onBeautyPage = /\/beauty\/?$/.test(pathname.replace(/\/+$/, "") || pathname);
    const onHome = /^\/(ar|en)\/?$/.test(pathname);
    if (next === "beauty" && onHome) {
      router.push(target);
      return;
    }
    if (next === "care" && onBeautyPage) {
      router.push(target);
    }
  };

  return (
    <section className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl gap-2 px-4 py-3 sm:px-6">
        <button
          type="button"
          data-door="care"
          onClick={() => onChoose("care")}
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
          data-door="beauty"
          onClick={() => onChoose("beauty")}
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

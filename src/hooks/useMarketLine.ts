"use client";

import { useEffect, useState } from "react";

import {
  DEFAULT_MARKET_LINE,
  detectMarketLine,
  MARKET_LINE_EVENT,
  MARKET_LINE_KEY,
  persistMarketLine,
  type MarketLine,
} from "@/lib/market";

export function useMarketLine() {
  const [line, setLine] = useState<MarketLine>(DEFAULT_MARKET_LINE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = detectMarketLine(window.location.search);
    setLine(next);
    window.sessionStorage.setItem(MARKET_LINE_KEY, next);
    setReady(true);

    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<MarketLine>).detail;
      if (detail === "care" || detail === "beauty") setLine(detail);
    };
    window.addEventListener(MARKET_LINE_EVENT, onChange);
    return () => window.removeEventListener(MARKET_LINE_EVENT, onChange);
  }, []);

  const choose = (next: MarketLine) => {
    persistMarketLine(next);
    setLine(next);
  };

  return { line, choose, ready };
}

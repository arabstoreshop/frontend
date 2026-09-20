"use client";

import { useEffect } from "react";

import { persistMarketLine, type MarketLine } from "@/lib/market";

export function MarketSync({ line }: { line: MarketLine }) {
  useEffect(() => {
    persistMarketLine(line);
  }, [line]);
  return null;
}

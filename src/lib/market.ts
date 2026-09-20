export type MarketLine = "care" | "beauty";

export const MARKET_LINE_KEY = "naseem-line";
export const MARKET_LINE_EVENT = "naseem-line";

/** Default attention path when ads/session have no line: Saudi care. */
export const DEFAULT_MARKET_LINE: MarketLine = "care";

export function isMarketLine(value: string | null | undefined): value is MarketLine {
  return value === "care" || value === "beauty";
}

export function detectMarketLine(search = ""): MarketLine {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const explicit = params.get("line");
  if (isMarketLine(explicit)) return explicit;

  const utm = [
    params.get("utm_campaign"),
    params.get("utm_content"),
    params.get("utm_term"),
    params.get("utm_source"),
  ]
    .filter(Boolean)
    .join(" ");

  if (/beauty|maroc|morocco|mad|جمال/i.test(utm)) return "beauty";
  if (/care|saudi|ksa|hemorrhoid|بواسير|عناية/i.test(utm)) return "care";

  if (typeof window !== "undefined") {
    const saved = window.sessionStorage.getItem(MARKET_LINE_KEY);
    if (isMarketLine(saved)) return saved;
  }

  return DEFAULT_MARKET_LINE;
}

export function persistMarketLine(line: MarketLine) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(MARKET_LINE_KEY, line);
  const url = new URL(window.location.href);
  url.searchParams.set("line", line);
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new CustomEvent(MARKET_LINE_EVENT, { detail: line }));
}

export function lineHref(path: string, line: MarketLine) {
  const [pathname, hash = ""] = path.split("#");
  const joiner = pathname.includes("?") ? "&" : "?";
  const withLine = `${pathname}${joiner}line=${line}`;
  return hash ? `${withLine}#${hash}` : withLine;
}

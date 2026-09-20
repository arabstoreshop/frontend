export type MarketLine = "care" | "beauty";

export const MARKET_LINE_KEY = "naseem-line";
export const MARKET_LINE_EVENT = "naseem-line";
export const MARKET_LINE_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

/** Default attention path when ads/session have no line: Saudi care. */
export const DEFAULT_MARKET_LINE: MarketLine = "care";

export function isMarketLine(value: string | null | undefined): value is MarketLine {
  return value === "care" || value === "beauty";
}

export function lineFromPathname(pathname: string): MarketLine | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (/^\/(ar|en)\/beauty$/.test(clean)) return "beauty";
  return null;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const parts = document.cookie.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(`${name}=`)) {
      return decodeURIComponent(trimmed.slice(name.length + 1));
    }
  }
  return null;
}

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${MARKET_LINE_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function applyMarketLineToDocument(line: MarketLine) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-line", line);
}

export function detectMarketLine(search = "", pathname = ""): MarketLine {
  const pathLine = lineFromPathname(pathname || (typeof window !== "undefined" ? window.location.pathname : ""));
  if (pathLine) return pathLine;

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
    const cookie = readCookie(MARKET_LINE_KEY);
    if (isMarketLine(cookie)) return cookie;
    const saved = window.sessionStorage.getItem(MARKET_LINE_KEY);
    if (isMarketLine(saved)) return saved;
  }

  return DEFAULT_MARKET_LINE;
}

export function persistMarketLine(line: MarketLine) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(MARKET_LINE_KEY, line);
  writeCookie(MARKET_LINE_KEY, line);
  applyMarketLineToDocument(line);

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

export function homePathForLine(lang: string, line: MarketLine) {
  return line === "beauty" ? `/${lang}/beauty` : `/${lang}`;
}

/** Inline blocking script: set data-line from query/cookie before first paint. */
export const MARKET_BOOTSTRAP_SCRIPT = `(function(){try{var path=location.pathname||"/";if(/^\\/en(\\/|$)/.test(path)){location.replace(path.replace(/^\\/en/,"/ar")+location.search+location.hash);return}var k="naseem-line";var params=new URLSearchParams(location.search);var q=params.get("line");var cookie="";var parts=document.cookie.split(";");for(var i=0;i<parts.length;i++){var p=parts[i].trim();if(p.indexOf(k+"=")==0)cookie=decodeURIComponent(p.slice(k.length+1))}var stored="";try{stored=sessionStorage.getItem(k)||""}catch(e){}var utm=[params.get("utm_campaign"),params.get("utm_content"),params.get("utm_term"),params.get("utm_source")].join(" ");var line;if(/\\/(ar|en)\\/beauty\\/?$/.test(path))line="beauty";else if(q==="care"||q==="beauty")line=q;else if(/beauty|maroc|morocco|mad|\\u062c\\u0645\\u0627\\u0644/i.test(utm))line="beauty";else if(/care|saudi|ksa|hemorrhoid|\\u0628\\u0648\\u0627\\u0633\\u064a\\u0631|\\u0639\\u0646\\u0627\\u064a\\u0629/i.test(utm))line="care";else if(cookie==="care"||cookie==="beauty")line=cookie;else if(stored==="care"||stored==="beauty")line=stored;else line="care";document.documentElement.setAttribute("data-line",line);document.cookie=k+"="+line+"; Path=/; Max-Age=2592000; SameSite=Lax";try{sessionStorage.setItem(k,line)}catch(e){}}catch(e){document.documentElement.setAttribute("data-line","care")}})();`;

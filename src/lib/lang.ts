export type StoreLang = "ar" | "en";

export function pathLang(pathname: string | null | undefined): StoreLang {
  const first = (pathname || "").split("/").filter(Boolean)[0];
  return first === "en" ? "en" : "ar";
}

export function withLang(lang: string, href: string): string {
  if (!href || href.startsWith("#") || href.startsWith("http")) return href;
  const clean = href.startsWith("/") ? href : `/${href}`;
  if (clean === `/${lang}` || clean.startsWith(`/${lang}/`)) return clean;
  if (clean === "/") return `/${lang}`;
  return `/${lang}${clean}`;
}

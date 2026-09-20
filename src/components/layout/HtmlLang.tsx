"use client";

import { useEffect } from "react";

export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang === "en" ? "en" : "ar";
    html.dir = lang === "en" ? "ltr" : "rtl";
  }, [lang]);
  return null;
}

import type { MetadataRoute } from "next";

import { PRODUCTS } from "@/lib/products";

const SITE = "https://naseem.beauty";

export default function sitemap(): MetadataRoute.Sitemap {
  const langs = ["ar", "en"] as const;
  const staticPaths = ["", "/collection", "/about", "/faq", "/contact", "/terms", "/privacy", "/shipping", "/track"];
  const entries: MetadataRoute.Sitemap = [];
  for (const lang of langs) {
    for (const path of staticPaths) {
      entries.push({
        url: `${SITE}/${lang}${path}`,
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const product of PRODUCTS) {
      entries.push({
        url: `${SITE}/${lang}/products/${product.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }
  return entries;
}

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/profit", "/en", "/en/"] },
    sitemap: "https://naseem.beauty/sitemap.xml",
    host: "https://naseem.beauty",
  };
}

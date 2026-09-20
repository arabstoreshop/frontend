import type { Metadata } from "next";

import { HomeExperience } from "@/components/home/HomeExperience";

export const metadata: Metadata = {
  title: "نسيم | عناية حساسة — الدفع عند الاستلام في السعودية",
  description:
    "9 منتجات للعناية الحساسة. 199 / 279 / 349 ريال. الدفع عند الاستلام داخل السعودية. ولمسار الجمال: ?line=beauty · 199 / 279 / 388 د.م. فالمغرب.",
  openGraph: {
    title: "نسيم | عناية حساسة",
    description: "9 منتجات للعناية الحساسة — 199 / 279 / 349 ريال. الدفع عند الاستلام داخل السعودية.",
    locale: "ar_SA",
    images: [{ url: "/brand/hero-collection.jpg", width: 1200, height: 630, alt: "مجموعة نسيم للعناية الحساسة" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "نسيم | عناية حساسة",
    description: "199 / 279 / 349 ريال · الدفع عند الاستلام داخل السعودية.",
    images: ["/brand/hero-collection.jpg"],
  },
};

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang === "en" ? "en" : "ar";
  return <HomeExperience lang={lang} />;
}

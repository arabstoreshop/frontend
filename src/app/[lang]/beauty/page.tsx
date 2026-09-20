import type { Metadata } from "next";

import { HomeExperience } from "@/components/home/HomeExperience";
import { MarketSync } from "@/components/home/MarketSync";

export const metadata: Metadata = {
  title: "نسيم للجمال | المغرب — 199 / 279 / 388 د.م.",
  description:
    "سكالب · بارير · ريغارد. 6 منتجات تجميل، 199 / 279 / 388 د.م. الدفع عند الاستلام فالمغرب. علبة صيدلية.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "نسيم للجمال | المغرب",
    description: "199 / 279 / 388 د.م. · الدفع عند الاستلام فالمغرب. سكالب · بارير · ريغارد.",
    locale: "ar_MA",
    images: [{ url: "/images/beauty/system.webp", width: 1200, height: 630, alt: "مجموعة نسيم للجمال" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "نسيم للجمال | المغرب",
    description: "199 / 279 / 388 د.م. · الدفع عند الاستلام فالمغرب.",
    images: ["/images/beauty/system.webp"],
  },
};

export default function BeautyHomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang === "en" ? "en" : "ar";
  return (
    <>
      <MarketSync line="beauty" />
      <HomeExperience lang={lang} />
    </>
  );
}

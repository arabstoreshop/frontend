import type { Metadata } from "next";

import { CollectionExperience } from "@/components/product/CollectionExperience";

export const metadata: Metadata = {
  title: "مجموعة نسيم — عناية حساسة + جمال المغرب",
  description:
    "عناية حساسة: 199 / 279 / 349 ريال داخل السعودية. جمال المغرب: 199 / 279 / 388 د.م. مسار واحد لكل جلسة عبر ?line=care|beauty.",
};

export default function CollectionPage({ params }: { params: { lang: string } }) {
  const lang = params.lang === "en" ? "en" : "ar";
  return <CollectionExperience lang={lang} />;
}

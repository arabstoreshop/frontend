import type { Metadata } from "next";

import { CollectionExperience } from "@/components/product/CollectionExperience";

export const metadata: Metadata = {
  title: "مجموعة نسيم للعناية الحساسة",
  description:
    "9 منتجات للعناية الحساسة — 199 / 279 / 349 ريال داخل السعودية. لمسار الجمال المغربي: ?line=beauty أو /beauty.",
};

export default function CollectionPage({ params }: { params: { lang: string } }) {
  const lang = params.lang === "en" ? "en" : "ar";
  return <CollectionExperience lang={lang} />;
}

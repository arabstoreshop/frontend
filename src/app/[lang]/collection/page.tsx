import type { Metadata } from "next";

import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  title: "جميع المنتجات | نسيم",
  description: "تصفح مجموعة نسيم الكاملة من منتجات العناية الشخصية",
};

export default async function CollectionPage({ params: { lang } }: { params: { lang: "ar" | "en" } }) {
  const dict = await getDictionary(lang);
  const isEn = lang === 'en';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isEn ? "Naseem Collection" : "مجموعة نسيم"}
        </h1>
        <p className="text-gray-500">
          {isEn ? "Carefully selected personal care products — to soothe and support your daily routine" : "منتجات عناية شخصية مختارة بعناية — تهدّئ وتدعم روتينك اليومي"}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.sku} product={product} lang={lang} />
        ))}
      </div>
      <div className="mt-14 p-6 bg-cream rounded-2xl text-center">
        <p className="text-xs text-gray-400 leading-relaxed">
          {isEn ? "Naseem products are for personal care and do not replace medical advice for severe conditions, bleeding, or continuous pain." : "منتجات نسيم للعناية الشخصية ولا تُغني عن استشارة الطبيب في الحالات الشديدة أو النزيف أو الألم المستمر."}
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

import { ProductCard } from "@/components/product/ProductCard";
import { getBeautyProducts, getCareProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "مجموعة نسيم — جمال المغرب + العناية الحساسة",
  description: "نسيم للجمال: سكالب، بارير، ريغارد — سيروم وكريم وباتش + جامي حلال. والدفع عند الاستلام فالمغرب.",
};

export default function CollectionPage({ params }: { params: { lang: string } }) {
  const lang = params.lang === "en" ? "en" : "ar";
  const beauty = getBeautyProducts();
  const care = getCareProducts();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-10">
        <p className="mb-2 text-sm font-bold tracking-[0.2em] text-[#c9a27a]">NASEEM</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">مجموعة نسيم</h1>
        <p className="text-gray-500">جمال المغرب (6 منتجات) وعناية حساسة.</p>
      </div>

      <h2 className="mb-4 text-xl font-extrabold text-gray-950">نسيم للجمال · المغرب</h2>
      <p className="mb-6 text-sm text-gray-500">199 / 279 / 388 د.م. · الدفع عند الاستلام</p>
      <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {beauty.map((product) => (
          <ProductCard key={product.sku} product={product} lang={lang} />
        ))}
      </div>

      <h2 className="mb-4 mt-14 text-xl font-extrabold text-gray-950">العناية الحساسة</h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {care.map((product) => (
          <ProductCard key={product.sku} product={product} lang={lang} />
        ))}
      </div>
    </div>
  );
}

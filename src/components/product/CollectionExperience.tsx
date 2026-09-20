"use client";

import { MarketDoors } from "@/components/home/MarketDoors";
import { ProductCard } from "@/components/product/ProductCard";
import { getBeautyProducts, getCareProducts } from "@/lib/products";

export function CollectionExperience({ lang }: { lang: "ar" | "en" }) {
  const beauty = getBeautyProducts();
  const care = getCareProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-14">
      <div className="-mx-4 mb-8 sm:-mx-6">
        <MarketDoors />
      </div>

      <div data-market="care">
        <div className="mb-10">
          <p className="mb-2 text-sm font-bold tracking-[0.2em] text-[#c9a27a]">NASEEM</p>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">مجموعة نسيم للعناية الحساسة</h1>
          <p className="text-gray-500">
            9 منتجات للعناية الحساسة — 199 / 279 / 349 ريال. الدفع عند الاستلام داخل السعودية.
          </p>
        </div>
        <section id="care">
          <h2 className="mb-4 text-xl font-extrabold text-gray-950">العناية الحساسة</h2>
          <p className="mb-6 text-sm text-gray-500">199 / 279 / 349 ريال · الدفع عند الاستلام داخل السعودية</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {care.map((product) => (
              <ProductCard key={product.sku} product={product} lang={lang} />
            ))}
          </div>
        </section>
      </div>

      <div data-market="beauty">
        <div className="mb-10">
          <p className="mb-2 text-sm font-bold tracking-[0.2em] text-[#c9a27a]">NASEEM BEAUTY</p>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">نسيم للجمال</h1>
          <p className="text-gray-500">
            سكالب · بارير · ريغارد — 199 / 279 / 388 د.م. الدفع عند الاستلام فالمغرب.
          </p>
        </div>
        <section id="beauty">
          <h2 className="mb-4 text-xl font-extrabold text-gray-950">نسيم للجمال · المغرب</h2>
          <p className="mb-6 text-sm text-gray-500">199 / 279 / 388 د.م. · الدفع عند الاستلام</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {beauty.map((product) => (
              <ProductCard key={product.sku} product={product} lang={lang} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "جميع المنتجات — 9 حلول متخصصة للبواسير | نسيم",
  description: "تصفح مجموعة نسيم الكاملة: جل كيتوزان، كبسولات ديوسمين وكركمين، ألياف سيليوم، بخاخ أعشاب، مناديل طبية، تحاميل، وسادة طبية، وحوض مقعدة.",
};

export default function CollectionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">مجموعة نسيم المتكاملة</h1>
        <p className="text-gray-500">
          9 منتجات متخصصة لعلاج البواسير — من العلاج الفوري إلى الوقاية والراحة اليومية
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>
      <div className="mt-14 p-6 bg-cream rounded-2xl text-center">
        <p className="text-xs text-gray-400 leading-relaxed">
          منتجات نسيم للعناية الشخصية ولا تُغني عن استشارة الطبيب في الحالات الشديدة أو النزيف أو الألم المستمر.
        </p>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
  lang?: "ar" | "en";
}

export function ProductCard({ product, showAddToCart = true, lang = "ar" }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const isEn = lang === "en";

  const handleQuickAdd = () => {
    addItem({
      sku: product.sku,
      slug: product.slug,
      name: isEn && product.nameEn ? product.nameEn : product.name,
      image: product.image,
      quantity: 1,
      isUpsell: false,
    });
    openCart();
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image */}
      <Link href={`/${lang}/products/${product.slug}`} className="block">
        <div className="relative aspect-square bg-cream overflow-hidden">
          <Image
            src={product.image}
            alt={isEn && product.nameEn ? product.nameEn : product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 start-3">
            <Badge variant="secondary" className="text-[10px]">
              {isEn && product.categoryEn ? product.categoryEn : product.category}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between gap-1 sm:gap-3">
          <div className="flex items-center gap-0.5 sm:gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
            ))}
          </div>
          <span className="text-[9px] sm:text-[11px] font-semibold text-gray-400">
            {isEn ? "+1200 Orders" : "+1200 طلب"}
          </span>
        </div>
        <Link href={`/${lang}/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-snug hover:text-brand transition-colors line-clamp-2">
            {isEn && product.nameEn ? product.nameEn : product.name}
          </h3>
        </Link>
        <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2 leading-relaxed hidden sm:block">
          {isEn && product.descriptionEn ? product.descriptionEn : product.description}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-base sm:text-lg font-bold text-brand">{formatPrice(199, lang)}</span>
            <p className="text-[9px] sm:text-[11px] text-gray-400">
              {isEn ? "2 for 279 SAR · 3 for 349 SAR" : "قطعتين 279 ريال · ثلاث 349 ريال"}
            </p>
          </div>
        </div>
        <p className="rounded-full bg-brand-50 px-2 sm:px-3 py-1 sm:py-1.5 text-center text-[9px] sm:text-[11px] font-semibold text-brand">
          {isEn ? "Limited Quantity" : "الكمية محدودة"}
        </p>
      </div>
    </div>
  );
}

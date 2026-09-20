"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useMarketLine } from "@/hooks/useMarketLine";
import { lineHref } from "@/lib/market";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  lang?: "ar" | "en";
}

export function ProductCard({ product, lang = "ar" }: ProductCardProps) {
  const isEn = lang === "en";
  const { line } = useMarketLine();
  const productLine = product.line === "beauty" ? "beauty" : "care";
  const href = lineHref(`/${lang}/products/${product.slug}`, productLine || line);

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image */}
      <Link href={href} className="block">
        <div className="relative aspect-square bg-cream overflow-hidden">
          <Image
            src={product.image}
            alt={isEn && product.nameEn ? product.nameEn : product.name}
            fill
            unoptimized
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
            {isEn ? "+2,400 Orders" : "+2,400 طلب"}
          </span>
        </div>
        <Link href={href}>
          <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-snug hover:text-brand transition-colors line-clamp-2">
            {isEn && product.nameEn ? product.nameEn : product.name}
          </h3>
        </Link>
        <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2 leading-relaxed hidden sm:block">
          {isEn && product.descriptionEn ? product.descriptionEn : product.description}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-base sm:text-lg font-bold text-brand">
              {formatPrice(199, lang, product.currency === "MAD" ? "MAD" : "SAR")}
            </span>
            <p className="text-[9px] sm:text-[11px] text-gray-400">
              {product.currency === "MAD"
                ? isEn
                  ? "2 for 279 DH · 3 for 388 DH"
                  : "قطعتين 279 د.م. · ثلاث 388 د.م."
                : isEn
                  ? "2 for 279 SAR · 3 for 349 SAR"
                  : "قطعتين 279 ريال · ثلاث 349 ريال"}
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

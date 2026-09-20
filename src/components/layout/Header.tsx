"use client";

import { Menu, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useMarketLine } from "@/hooks/useMarketLine";
import { pathLang, withLang } from "@/lib/lang";
import { homePathForLine, lineHref } from "@/lib/market";
import { useCartStore } from "@/store/cart";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { items, openCart } = useCartStore();
  const cartCount = items.filter((i) => !i.isUpsell).length;
  const { line } = useMarketLine();

  const pathname = usePathname();
  const currentLang = pathLang(pathname);

  const href = (path: string) => lineHref(withLang(currentLang, path), line);

  const navLinks = [
    { href: lineHref(homePathForLine(currentLang, line), line), label: "الرئيسية" },
    { href: href("/collection"), label: "المنتجات" },
    { href: href("/about"), label: "عن نسيم" },
    { href: href("/contact"), label: "تواصل معنا" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href={lineHref(homePathForLine(currentLang, line), line)} className="flex items-center gap-2.5 shrink-0">
          <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-sm ring-1 ring-brand/10">
            <Image
              src="/favicon.png"
              alt="Naseem"
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold text-brand tracking-tight">نسيم</span>
            <span className="text-[10px] text-gray-400 tracking-widest uppercase">
              {line === "beauty" ? "جمال المغرب" : "عناية حساسة"}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-brand transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Cart + Language + Mobile Menu */}
        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            className="relative flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand"
            aria-label="سلة التسوق"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -left-0.5 w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-brand-50 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 animate-fade-in">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-brand py-2.5 px-3 rounded-lg hover:bg-brand-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

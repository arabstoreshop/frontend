"use client";

import { Globe, Menu, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useCartStore } from "@/store/cart";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { items, openCart } = useCartStore();
  const cartCount = items.filter((i) => !i.isUpsell).length;
  
  const pathname = usePathname();
  const router = useRouter();
  const currentLang = pathname.startsWith('/en') ? 'en' : 'ar';
  
  const toggleLanguage = () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath || `/${newLang}`);
  };

  const navLinks = [
    { href: `/${currentLang}`, label: currentLang === 'ar' ? "الرئيسية" : "Home" },
    { href: `/${currentLang}/collection`, label: currentLang === 'ar' ? "المنتجات" : "Products" },
    { href: `/${currentLang}/about`, label: currentLang === 'ar' ? "عن نسيم" : "About Us" },
    { href: `/${currentLang}/contact`, label: currentLang === 'ar' ? "تواصل معنا" : "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href={`/${currentLang}`} className="flex items-center gap-2.5 shrink-0">
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
              {currentLang === "ar" ? "Global Hemorrhoid Care" : "Global Hemorrhoid Care"}
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
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors text-gray-700 text-xs font-semibold border border-gray-200"
            aria-label="Language"
          >
            <Globe className="w-3.5 h-3.5" />
            {currentLang === 'ar' ? 'English' : 'العربية'}
          </button>

          <button
            onClick={openCart}
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-brand-50 transition-colors text-gray-700 hover:text-brand"
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
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-brand-50 transition-colors text-gray-700"
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

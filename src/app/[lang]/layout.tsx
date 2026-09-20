import type { Metadata } from "next";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HtmlLang } from "@/components/layout/HtmlLang";
import { PixelScripts } from "@/components/pixels/PixelScripts";

export function generateStaticParams() {
  return [{ lang: "ar" }, { lang: "en" }];
}

const arabicLayoutMetadata: Metadata = {
  title: {
    default: "نسيم | عناية حساسة — Naseem",
    template: "%s | Naseem",
  },
  description:
    "نسيم للعناية الحساسة: 9 منتجات، 199 / 279 / 349 ريال، الدفع عند الاستلام داخل السعودية. ولمسار الجمال المغربي: /beauty.",
  keywords: [
    "Naseem",
    "نسيم",
    "عناية حساسة",
    "الدفع عند الاستلام",
    "السعودية",
    "chitosan gel",
    "diosmin",
  ],
  metadataBase: new URL("https://naseem.beauty"),
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: ["/favicon.png"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "نسيم | عناية حساسة",
    description: "9 منتجات للعناية الحساسة — 199 / 279 / 349 ريال. الدفع عند الاستلام داخل السعودية.",
    url: "https://naseem.beauty",
    siteName: "Naseem",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "/brand/hero-collection.jpg",
        width: 1200,
        height: 630,
        alt: "مجموعة نسيم للعناية الحساسة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "نسيم | عناية حساسة",
    description: "199 / 279 / 349 ريال · الدفع عند الاستلام داخل السعودية.",
    images: ["/brand/hero-collection.jpg"],
  },
  robots: { index: true, follow: true },
};

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (params.lang === "en") {
    return {
      ...arabicLayoutMetadata,
      title: "Naseem",
      description: "The live Naseem catalog is Arabic. Use /ar/ for the storefront.",
      robots: { index: false, follow: false },
      alternates: { canonical: "https://naseem.beauty/ar/" },
    };
  }
  return arabicLayoutMetadata;
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dir = params.lang === "en" ? "ltr" : "rtl";
  return (
    <div lang={params.lang} dir={dir} className="min-h-screen flex flex-col font-arabic">
      <HtmlLang lang={params.lang} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer lang={params.lang === "en" ? "en" : "ar"} />
      <CartDrawer />
      <CheckoutModal />
      <PixelScripts />
    </div>
  );
}

import type { Metadata } from "next";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PixelScripts } from "@/components/pixels/PixelScripts";

export function generateStaticParams() {
  return [{ lang: "ar" }, { lang: "en" }];
}

export const metadata: Metadata = {
  title: {
    default: "نسيم | جمال وعناية — Naseem Beauty",
    template: "%s | Naseem",
  },
  description:
    "نسيم للجمال: سكالب، بارير، ريغارد — موضعي + جامي حلال. الدفع عند الاستلام فالمغرب. ومجموعة العناية الحساسة.",
  keywords: [
    "Naseem",
    "نسيم",
    "hemorrhoid treatment",
    "علاج البواسير",
    "chitosan gel",
    "diosmin",
    "psyllium fiber",
    "global wellness brand",
    "Saudi Arabia",
  ],
  metadataBase: new URL("https://naseem.beauty"),
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: ["/favicon.png"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Naseem | Global Hemorrhoid Care",
    description:
      "One problem. Nine solutions. Naseem offers a complete hemorrhoid care system — from instant relief to long-term prevention.",
    url: "https://naseem.beauty",
    siteName: "Naseem",
    locale: "ar_SA",
    alternateLocale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/hero-collection.jpg",
        width: 1200,
        height: 630,
        alt: "Naseem hemorrhoid care collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naseem | Global Hemorrhoid Care",
    description: "Complete hemorrhoid care — 9 specialized products, one trusted brand.",
    images: ["/brand/hero-collection.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <PixelScripts />
    </div>
  );
}

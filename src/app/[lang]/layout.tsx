import type { Metadata } from "next";
import "./globals.css";

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
    default: "Naseem | Global Hemorrhoid Care — نسيم",
    template: "%s | Naseem",
  },
  description:
    "Naseem is a global specialty brand for hemorrhoid care — 9 science-backed products that treat the same problem from every angle: topical relief, vein support, daily hygiene, and comfort. Discreet shipping across Saudi Arabia.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-arabic antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
        <PixelScripts />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PixelScripts } from "@/components/pixels/PixelScripts";

export const metadata: Metadata = {
  title: {
    default: "نسيم | منتجات العناية الشخصية — Naseem",
    template: "%s | نسيم",
  },
  description:
    "نسيم — منتجات عناية شخصية مميزة تهدّئ وتدعم الراحة اليومية. شحن سريع لجميع مناطق المملكة العربية السعودية.",
  keywords: ["نسيم", "عناية شخصية", "منتجات طبيعية", "المملكة العربية السعودية"],
  metadataBase: new URL("https://naseem.beauty"),
  openGraph: {
    title: "نسيم | عناية شخصية",
    description: "منتجات عناية شخصية مميزة للمرأة والرجل السعودي",
    url: "https://naseem.beauty",
    siteName: "نسيم",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "نسيم | Naseem",
    description: "منتجات عناية شخصية مميزة",
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

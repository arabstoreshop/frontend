import type { Metadata } from "next";
import "./[lang]/globals.css";
import { MARKET_BOOTSTRAP_SCRIPT } from "@/lib/market";

export const metadata: Metadata = {
  title: "Naseem",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-line="care" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MARKET_BOOTSTRAP_SCRIPT }} />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

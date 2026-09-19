import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Profit Calculator",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f1412] text-[#e8efe9]" style={{ fontFamily: "Tajawal, sans-serif" }}>
      {children}
    </div>
  );
}

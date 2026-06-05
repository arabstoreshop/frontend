import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-800 text-white mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                ن
              </div>
              <div>
                <div className="text-xl font-bold">نسيم</div>
                <div className="text-[10px] text-white/50 tracking-widest uppercase">Naseem</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              منتجات عناية شخصية مختارة بعناية للمرأة والرجل السعودي.
              جودة فعلية، بمكونات مثبتة.
            </p>
            <p className="text-white/40 text-xs mt-4 leading-relaxed">
              منتجات نسيم للعناية الشخصية ولا تُغني عن استشارة الطبيب في الحالات الشديدة أو النزيف أو الألم المستمر.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white/90">روابط سريعة</h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/collection" className="hover:text-white transition-colors">جميع المنتجات</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">عن نسيم</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link href="/track" className="hover:text-white transition-colors">تتبع طلبك</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold mb-4 text-white/90">السياسات</h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">الشروط والأحكام</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">الشحن والتوصيل</Link></li>
            </ul>
            <div className="mt-6 p-3 rounded-lg bg-white/10">
              <p className="text-xs text-white/60 leading-relaxed">
                💳 الدفع عند الاستلام فقط<br />
                📦 شحن سريع لجميع مناطق المملكة<br />
                🔒 تغليف خاص وسري
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/40">
          <p>© 2024 نسيم · Naseem. جميع الحقوق محفوظة.</p>
          <p>المملكة العربية السعودية 🇸🇦</p>
        </div>
      </div>
    </footer>
  );
}

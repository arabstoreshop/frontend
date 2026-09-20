import Image from "next/image";
import Link from "next/link";

import { withLang, type StoreLang } from "@/lib/lang";

export function Footer({ lang = "ar" }: { lang?: StoreLang }) {
  const href = (path: string) => withLang(lang, path);
  return (
    <footer className="bg-brand-800 text-white mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-white/20">
                <Image src="/favicon.png" alt="Naseem" fill className="object-cover" sizes="36px" />
              </div>
              <div>
                <div className="text-xl font-bold">نسيم</div>
                <div className="text-[10px] text-white/50 tracking-widest uppercase">Naseem</div>
              </div>
            </div>
            <p data-market="care" className="text-white/70 text-sm leading-relaxed max-w-xs">
              نسيم للعناية الحساسة. 9 منتجات، 199 / 279 / 349 ريال، الدفع عند الاستلام داخل السعودية.
            </p>
            <p data-market="beauty" className="text-white/70 text-sm leading-relaxed max-w-xs">
              نسيم للجمال. سكالب · بارير · ريغارد — 199 / 279 / 388 د.م. الدفع عند الاستلام فالمغرب.
            </p>
            <p className="text-white/40 text-xs mt-4 leading-relaxed">
              منتجات نسيم للعناية الشخصية ولا تُغني عن استشارة الطبيب في الحالات الشديدة أو النزيف أو الألم المستمر.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white/90">روابط سريعة</h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href={href("/collection")} className="hover:text-white transition-colors">جميع المنتجات</Link></li>
              <li><Link href={href("/about")} className="hover:text-white transition-colors">عن نسيم</Link></li>
              <li><Link href={href("/faq")} className="hover:text-white transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link href={href("/track")} className="hover:text-white transition-colors">تتبع طلبك</Link></li>
              <li><Link href={href("/contact")} className="hover:text-white transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white/90">السياسات</h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href={href("/privacy")} className="hover:text-white transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href={href("/terms")} className="hover:text-white transition-colors">الشروط والأحكام</Link></li>
              <li><Link href={href("/shipping")} className="hover:text-white transition-colors">الشحن والتوصيل</Link></li>
            </ul>
            <div className="mt-6 p-3 rounded-lg bg-white/10">
              <p data-market="care" className="text-xs text-white/60 leading-relaxed">
                💳 الدفع عند الاستلام<br />
                📦 داخل السعودية<br />
                🔒 تغليف خاص
              </p>
              <p data-market="beauty" className="text-xs text-white/60 leading-relaxed">
                💳 الدفع عند الاستلام<br />
                📦 توصيل المغرب<br />
                🔒 علبة صيدلية
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/40">
          <p>© 2026 نسيم · Naseem. جميع الحقوق محفوظة.</p>
          <p data-market="care">السعودية 🇸🇦</p>
          <p data-market="beauty">المغرب 🇲🇦</p>
        </div>
      </div>
    </footer>
  );
}

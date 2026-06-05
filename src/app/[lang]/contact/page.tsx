import { Mail, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا | نسيم",
  description: "تواصل مع فريق نسيم — نحن هنا للمساعدة",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">تواصل معنا</h1>
        <p className="text-gray-500">
          فريق نسيم متاح للإجابة على استفساراتك. نرد خلال 24 ساعة.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 mb-10">
        {[
          {
            icon: <MessageCircle className="w-6 h-6" />,
            title: "واتساب",
            value: "+966 5X XXX XXXX",
            desc: "الأسرع في الرد — يومياً من 9 صباحاً إلى 10 مساءً",
            href: "https://wa.me/9665XXXXXXXX",
            cta: "ابدأ محادثة",
          },
          {
            icon: <Mail className="w-6 h-6" />,
            title: "البريد الإلكتروني",
            value: "hello@naseem.beauty",
            desc: "للاستفسارات التفصيلية والشراكات",
            href: "mailto:hello@naseem.beauty",
            cta: "أرسل إيميل",
          },
          {
            icon: <Phone className="w-6 h-6" />,
            title: "تتبع الطلب",
            value: "تتبع طلبك مباشرة",
            desc: "ادخل رقم طلبك للاطلاع على حالته",
            href: "/track",
            cta: "تتبع الطلب",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand shrink-0">
              {item.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-0.5">{item.title}</h3>
              <p className="text-brand font-medium text-sm mb-1">{item.value}</p>
              <p className="text-xs text-gray-400 mb-3">{item.desc}</p>
              <a
                href={item.href}
                className="inline-flex text-sm font-medium text-white bg-brand px-4 py-1.5 rounded-lg hover:bg-brand-600 transition-colors"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {item.cta}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 bg-cream rounded-2xl text-center">
        <p className="text-sm text-gray-500 leading-relaxed">
          ساعات العمل: السبت – الخميس، 9 صباحاً – 10 مساءً بتوقيت الرياض 🇸🇦
        </p>
      </div>
    </div>
  );
}

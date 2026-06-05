import { CheckCircle, Heart, Leaf, Shield } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "عن نسيم | Naseem",
  description: "تعرف على قصة نسيم ورسالتنا في تقديم منتجات عناية شخصية مميزة للسوق السعودي",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg">
          ن
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">عن نسيم</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          نسيم ولدت من إدراك حقيقي — أن ملايين الأشخاص في المملكة يعانون من انزعاج يومي صامت
          ولا يجدون منتجات عناية تراعي احتياجاتهم الخاصة وخصوصيتهم.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-cream rounded-3xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">رسالتنا</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          نسيم هي علامة تجارية سعودية للعناية الشخصية، مُصمَّمة لتقديم راحة حقيقية وهادئة — بعيداً عن
          المبالغة والادعاءات الطبية. نختار كل منتج بعناية، ونُصمم تجربة الشراء لتكون خاصة وسهلة
          وتحترم كرامة المستخدم.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {[
          {
            icon: <Heart className="w-6 h-6" />,
            title: "العناية الحقيقية",
            desc: "نختار منتجاتنا بناءً على فاعليتها الفعلية وسلامة مكوناتها، لا على الترويج التجاري.",
          },
          {
            icon: <Shield className="w-6 h-6" />,
            title: "الخصوصية أولاً",
            desc: "كل طلب يصل في تغليف مجهول الهوية. خصوصيتك ليست خياراً — هي معيار.",
          },
          {
            icon: <Leaf className="w-6 h-6" />,
            title: "مكونات مختارة",
            desc: "نُفضل المكونات الطبيعية الآمنة ونتحاشى التركيبات العدوانية.",
          },
          {
            icon: <CheckCircle className="w-6 h-6" />,
            title: "صدق في التواصل",
            desc: "لا ندعي علاجاً أو ضماناً مطلقاً. نقدم منتجات تُساعد وتُهدئ ضمن روتين العناية.",
          },
        ].map((value) => (
          <div
            key={value.title}
            className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand shrink-0">
              {value.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{value.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 mb-10">
        <p className="text-sm text-gray-500 leading-relaxed">
          ⚠️ <strong>تنبيه مهم:</strong> منتجات نسيم للعناية الشخصية ولا تُغني عن استشارة الطبيب في
          الحالات الشديدة أو النزيف أو الألم المستمر. إذا كنت تعاني من أعراض حادة، يُرجى استشارة
          طبيب مختص.
        </p>
      </div>

      <div className="text-center">
        <Button size="lg" asChild>
          <Link href="/collection">تصفح منتجاتنا</Link>
        </Button>
      </div>
    </div>
  );
}

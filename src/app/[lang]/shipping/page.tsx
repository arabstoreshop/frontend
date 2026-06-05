import { Clock, MapPin, Package, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشحن والتوصيل | نسيم",
};

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">الشحن والتوصيل</h1>
      <p className="text-gray-500 mb-10">كل ما تحتاج معرفته عن توصيل طلبك</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {[
          {
            icon: <MapPin className="w-6 h-6" />,
            title: "نطاق التوصيل",
            desc: "جميع مناطق ومدن المملكة العربية السعودية",
          },
          {
            icon: <Clock className="w-6 h-6" />,
            title: "مدة التوصيل",
            desc: "من 2 إلى 5 أيام عمل حسب المنطقة",
          },
          {
            icon: <Package className="w-6 h-6" />,
            title: "رسوم الشحن",
            desc: "شحن مجاني على جميع الطلبات",
          },
          {
            icon: <Shield className="w-6 h-6" />,
            title: "التغليف",
            desc: "تغليف خاص ومجهول الهوية لحفظ خصوصيتك",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand shrink-0">
              {item.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">كيف يعمل التوصيل؟</h2>
          <ol className="list-decimal list-inside space-y-2 mr-4">
            <li>تُؤكد طلبك وتستلم رقم الطلب</li>
            <li>يتم تجهيز طلبك وشحنه خلال يوم عمل واحد</li>
            <li>سيتواصل معك مندوب التوصيل قبل الوصول</li>
            <li>تستلم طلبك وتدفع نقداً عند الاستلام</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">الدفع عند الاستلام</h2>
          <p>
            لا تحتاج لبطاقة ائتمانية أو دفع مسبق. اللقطة عندك ادفع عند استلام الطرد مباشرة من
            المندوب.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">تتبع الطلب</h2>
          <p>
            يمكنك تتبع حالة طلبك باستخدام رقم الطلب في{" "}
            <a href="/track" className="text-brand underline">صفحة التتبع</a>
            {" "}أو بالتواصل مع فريقنا.
          </p>
        </section>
      </div>
    </div>
  );
}

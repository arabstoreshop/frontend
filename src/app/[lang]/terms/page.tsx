import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام | نسيم",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">الشروط والأحكام</h1>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">١. قبول الشروط</h2>
          <p>
            باستخدامك لموقع نسيم وتقديم طلبك، فإنك توافق على الشروط والأحكام المذكورة في هذه الصفحة.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">٢. المنتجات والأسعار</h2>
          <p>
            جميع الأسعار بالريال السعودي وتشمل ضريبة القيمة المضافة. نحتفظ بالحق في تعديل الأسعار في
            أي وقت. سعر الطلب يُحدَّد وقت التأكيد.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">٣. الطلبات والدفع</h2>
          <p>
            جميع الطلبات تُدفع نقداً عند الاستلام. في حال رفض استلام الطلب دون مبرر مقبول، نحتفظ بالحق
            في تقييد الطلبات المستقبلية.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">٤. التوصيل</h2>
          <p>
            نوصل لجميع مناطق المملكة العربية السعودية. مواعيد التوصيل تقديرية وقد تتأثر بظروف خارجة عن
            إرادتنا. لا نتحمل مسؤولية التأخير الناجم عن شركات الشحن.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">٥. الإرجاع والاستبدال</h2>
          <p>
            نقبل الإرجاع خلال 7 أيام من الاستلام في حال وجود عيب مصنعي أو خطأ في الطلب. المنتجات
            المستخدمة لا تُقبل للإرجاع لأسباب صحية.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">٦. حدود المسؤولية</h2>
          <p>
            منتجات نسيم للعناية الشخصية ولا تُغني عن الاستشارة الطبية. لا نتحمل مسؤولية أي ردود فعل
            تحسسية ناجمة عن عدم اتباع تعليمات الاستخدام.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">٧. الملكية الفكرية</h2>
          <p>
            جميع محتويات الموقع — بما في ذلك الاسم التجاري والشعار والصور والنصوص — ملك حصري لنسيم.
          </p>
        </section>
      </div>

      <p className="text-xs text-gray-400 mt-10">آخر تحديث: يناير 2024</p>
    </div>
  );
}

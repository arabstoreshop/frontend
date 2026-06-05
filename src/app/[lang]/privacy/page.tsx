import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | نسيم",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 prose prose-gray max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">سياسة الخصوصية</h1>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">١. المعلومات التي نجمعها</h2>
          <p>
            عند تقديم طلبك، نجمع اسمك ورقم جوالك فقط. هذه المعلومات ضرورية لمعالجة طلبك وتنسيق التوصيل.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">٢. كيف نستخدم معلوماتك</h2>
          <p>نستخدم بياناتك لـ:</p>
          <ul className="list-disc list-inside space-y-1 mr-4 mt-2">
            <li>معالجة وتأكيد طلبك</li>
            <li>التواصل معك بشأن التوصيل</li>
            <li>تحسين خدماتنا</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">٣. حماية البيانات</h2>
          <p>
            نحن لا نبيع أو نشارك بياناتك الشخصية مع أي طرف ثالث لأغراض تسويقية. رقم جوالك مُشفَّر ومحمي.
            التغليف مجهول الهوية لحفظ خصوصيتك التامة.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">٤. ملفات تعريف الارتباط (Cookies)</h2>
          <p>
            نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتتبع أداء الموقع. يمكنك إلغاء تفعيلها من
            إعدادات متصفحك.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">٥. حذف بياناتك</h2>
          <p>
            يمكنك طلب حذف بياناتك في أي وقت بالتواصل معنا عبر البريد الإلكتروني: hello@naseem.beauty
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">٦. تعديلات السياسة</h2>
          <p>
            نحتفظ بالحق في تعديل هذه السياسة في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة.
          </p>
        </section>
      </div>

      <p className="text-xs text-gray-400 mt-10">آخر تحديث: يناير 2024</p>
    </div>
  );
}

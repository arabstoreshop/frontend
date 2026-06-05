"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "كيف أطلب من نسيم؟",
    a: "اختر المنتج المناسب، حدد الكمية، ثم اضغط على 'أضف إلى السلة' وأتمم الطلب بإدخال اسمك ورقم جوالك فقط. الدفع يكون عند الاستلام.",
  },
  {
    q: "هل الدفع آمن؟",
    a: "نعم. جميع الطلبات تُدفع نقداً عند الاستلام — لا تحتاج لبطاقة ائتمانية أو دفع مسبق.",
  },
  {
    q: "كم يستغرق التوصيل؟",
    a: "عادةً من يومين إلى خمسة أيام عمل لجميع مناطق المملكة العربية السعودية.",
  },
  {
    q: "هل التغليف سري؟",
    a: "نعم تماماً. طلبك يصل في تغليف مجهول الهوية بدون أي مؤشر على محتوى الطرد.",
  },
  {
    q: "هل المنتجات آمنة للاستخدام؟",
    a: "منتجاتنا مصممة للاستخدام الشخصي اليومي وتحتوي على مكونات مختارة. مع ذلك، إذا كنت تعاني من أعراض حادة أو استمرار الألم أو النزيف، يُرجى استشارة طبيب متخصص.",
  },
  {
    q: "هل يمكنني إرجاع المنتج؟",
    a: "نقبل الإرجاع خلال 7 أيام من الاستلام في حال وجود عيب في المنتج أو خطأ في الطلب. تواصل معنا عبر واتساب.",
  },
  {
    q: "ما الفرق بين الكميات المتاحة؟",
    a: "قطعة واحدة بـ 199 ريال، قطعتان بـ 279 ريال (وفّر 119 ريال)، ثلاث قطع بـ 349 ريال (الأوفر). تفيد الكميات الأكبر من يرغب في استمرارية الاستخدام.",
  },
  {
    q: "هل منتجاتكم علاج طبي؟",
    a: "لا. منتجات نسيم للعناية الشخصية وتهدف إلى دعم الراحة اليومية. لا تُغني عن استشارة الطبيب في الحالات الطبية.",
  },
  {
    q: "كيف أتتبع طلبي؟",
    a: "بعد تأكيد الطلب، ستحصل على رقم طلب يمكنك استخدامه في صفحة 'تتبع الطلب'. يمكنك أيضاً التواصل مع فريقنا عبر واتساب.",
  },
];

export function FaqAccordion() {
  return (
    <Accordion.Root type="single" collapsible className="space-y-3">
      {faqs.map((faq, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <Accordion.Trigger className="flex items-center justify-between w-full px-5 py-4 text-start font-medium text-gray-900 hover:bg-cream transition-colors group">
            <span>{faq.q}</span>
            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
            <div className="px-5 pb-4 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
              {faq.a}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

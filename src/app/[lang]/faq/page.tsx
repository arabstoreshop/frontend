import type { Metadata } from "next";

import { FaqAccordion } from "@/components/faq/FaqAccordion";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة | نسيم",
  description: "إجابات على أكثر الأسئلة شيوعاً حول منتجات نسيم وطلبك",
};

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">الأسئلة الشائعة</h1>
        <p className="text-gray-500">إجابات على أكثر الأسئلة شيوعاً</p>
      </div>

      <FaqAccordion />

      <div className="mt-10 p-5 bg-cream rounded-2xl text-center">
        <p className="text-sm text-gray-600 mb-3">لم تجد إجابتك؟</p>
        <a
          href="/contact"
          className="inline-flex items-center text-brand font-medium text-sm hover:underline"
        >
          تواصل مع فريقنا ←
        </a>
      </div>
    </div>
  );
}

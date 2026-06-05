import {
  ArrowLeft,
  Award,
  CheckCircle,
  ClipboardCheck,
  HeartPulse,
  Package,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "نسيم | عناية حساسة للبواسير والتهيّج داخل السعودية",
  description:
    "نسيم يقدم روتين عناية حساس بثلاث خطوات: تبريد للحكة والحرارة، دعم للتكرار، ومناديل ألوفيرا للتهيّج بعد الحمام. الدفع عند الاستلام داخل السعودية.",
};

const trustItems = {
  ar: [
    "الدفع عند الاستلام 🤝",
    "توصيل سريع لكافة السعودية 🚚",
    "تركيبة معتمدة وآمنة 🇸🇦",
    "+50,000 عميل سعيد ⭐",
  ],
  en: [
    "Cash on Delivery 🤝",
    "Fast Delivery across KSA 🚚",
    "Certified & Safe Formula 🇸🇦",
    "+50,000 Happy Customers ⭐",
  ]
};

const stats = {
  ar: [
    { value: "+50,000", label: "عميل سعيد" },
    { value: "4.8/5", label: "تقييم العملاء" },
    { value: "3", label: "خطوات واضحة" },
    { value: "100%", label: "خصوصية وسرية" },
  ],
  en: [
    { value: "+50,000", label: "Happy Customers" },
    { value: "4.8/5", label: "Customer Rating" },
    { value: "3", label: "Clear Steps" },
    { value: "100%", label: "Privacy & Discretion" },
  ]
};

const problemCards = {
  ar: [
    {
      title: "التبريد السريع",
      subtitle: "تخفيف الحكة والحرارة المزعجة",
      href: "/products/menthol-cooling-gel",
      icon: Sparkles,
    },
    {
      title: "الدعم اليومي",
      subtitle: "تقليل تكرار الانزعاج والضغط",
      href: "/products/fiber-vein-tablets",
      icon: HeartPulse,
    },
    {
      title: "العناية اللطيفة",
      subtitle: "عناية بعد الحمام بدون تهيج",
      href: "/products/aloe-soothing-wipes",
      icon: ShieldCheck,
    },
  ],
  en: [
    {
      title: "Fast Cooling",
      subtitle: "Relieve annoying itch and heat",
      href: "/products/menthol-cooling-gel",
      icon: Sparkles,
    },
    {
      title: "Daily Support",
      subtitle: "Reduce recurring discomfort and pressure",
      href: "/products/fiber-vein-tablets",
      icon: HeartPulse,
    },
    {
      title: "Gentle Care",
      subtitle: "After-bathroom care without irritation",
      href: "/products/aloe-soothing-wipes",
      icon: ShieldCheck,
    },
  ]
};

const reviews = {
  ar: [
    {
      name: "س. العتيبي",
      city: "الرياض",
      text: "أكثر شيء طمّنني أن الطلب كان خاص ومافيه أي تفاصيل محرجة على التغليف.",
    },
    {
      name: "ن. الحربي",
      city: "جدة",
      text: "الشرح واضح. عرفت أختار المنتج حسب المشكلة بدل ما أشتري شيء عشوائي.",
    },
    {
      name: "م. الشهري",
      city: "الدمام",
      text: "الدفع عند الاستلام خلاني أطلب بدون تردد، والروتين كامل منطقي.",
    },
  ],
  en: [
    {
      name: "S. Al-Otaibi",
      city: "Riyadh",
      text: "The most reassuring thing was that the order was private with no embarrassing details on the packaging.",
    },
    {
      name: "N. Al-Harbi",
      city: "Jeddah",
      text: "Clear explanation. I knew how to choose the product based on the problem instead of buying randomly.",
    },
    {
      name: "M. Al-Shehri",
      city: "Dammam",
      text: "Cash on delivery made me order without hesitation, and the whole routine makes sense.",
    },
  ]
};

const qualitySteps = {
  ar: [
    "سرية التغليف",
    "سرعة التوصيل",
    "دقة التركيبة",
    "رضا العملاء",
    "الدعم المستمر",
  ],
  en: [
    "Discreet Packaging",
    "Fast Delivery",
    "Precise Formula",
    "Customer Satisfaction",
    "Continuous Support",
  ]
};

import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage({ params: { lang } }: { params: { lang: "ar" | "en" } }) {
  const dict = await getDictionary(lang);
  const isEn = lang === 'en';

  return (
    <>
      <section className="bg-brand-800 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-4 py-2 text-center text-xs sm:flex-row sm:gap-3 sm:text-sm">
          <span>{dict.common.delivery}</span>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-cream to-white">
        <div className="absolute inset-x-0 top-16 h-32 bg-[radial-gradient(circle_at_center,rgba(63,107,90,0.18),transparent_65%)]" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand shadow-sm ring-1 ring-brand/10">
              <ShieldCheck className="h-4 w-4" />
              {isEn ? "The Specialized Sensitive Care Brand in Saudi Arabia" : "العلامة المتخصصة للعناية الحساسة في السعودية"}
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold leading-tight text-gray-950 sm:text-5xl lg:text-6xl">
                {isEn ? "Your sensitive comfort deserves" : "راحتك الحساسة تستحق"}
                <span className="block text-brand">{isEn ? "a clear routine without embarrassment" : "روتيناً واضحاً بدون إحراج"}</span>
              </h1>
              <p className="max-w-xl text-lg leading-8 text-gray-600">
                {isEn ? "Naseem combines three important angles in one routine: cooling for itch and heat, support for recurrence, and gentler care after the bathroom. Order online with private packaging and cash on delivery." : "نسيم يجمع ثلاث زوايا مهمة في روتين واحد: تبريد للحكة والحرارة، دعم لتكرار المشكلة، وعناية ألطف بعد الحمام. اطلب أونلاين بتغليف خاص والدفع عند الاستلام."}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="xl" asChild>
                <Link href={`/${lang}/collection`}>
                  {dict.common.buyNow}
                  <ArrowLeft className={`h-5 w-5 ${isEn ? "rotate-180" : ""}`} />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="#problems">{isEn ? "Choose by problem" : "اختر حسب مشكلتك"}</Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-700">
                {isEn ? "4.8/5 from customers looking for a private clear solution" : "4.8/5 من عملاء يبحثون عن حل خاص وواضح"}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-100 to-sand shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop"
                alt="روتين نسيم للعناية الحساسة"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/35 via-transparent to-transparent" />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
                <p className="text-sm font-bold text-gray-950">مثلث الراحة من نسيم</p>
                <p className="mt-1 text-xs text-gray-500">تبريد + دعم + عناية يومية</p>
              </div>
            </div>

            <div className="absolute -left-2 top-8 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-100 sm:-left-8">
              <Package className="mb-2 h-6 w-6 text-brand" />
              <p className="text-sm font-bold text-gray-950">تركيبة معتمدة</p>
              <p className="text-xs text-gray-500">آمنة وفعالة</p>
            </div>

            <div className="absolute -right-2 bottom-8 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-100 sm:-right-8">
              <Truck className="mb-2 h-6 w-6 text-brand" />
              <p className="text-sm font-bold text-gray-950">داخل الإمارات</p>
              <p className="text-xs text-gray-500">توصيل سريع</p>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-brand py-4 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm font-semibold sm:px-6">
          {[...trustItems[lang], ...trustItems[lang]].map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center gap-2 text-white/95">
              <CheckCircle className="h-4 w-4" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4">
          {stats[lang].map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-gray-100 bg-cream p-6 text-center">
              <p className="text-3xl font-extrabold text-brand">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="problems" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold text-brand">{isEn ? "Shop By Goal" : "تسوّق حسب هدفك"}</p>
            <h2 className="text-3xl font-extrabold text-gray-950 sm:text-4xl">
              {isEn ? "What result are you looking for?" : "ما النتيجة التي تبحث عنها؟"}
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              {isEn ? "Choose your goal and we will recommend the best product for it." : "اختر الهدف المطلوب وسنرشح لك أفضل منتج لتحقيقه."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {problemCards[lang].map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group rounded-3xl border border-gray-100 bg-gradient-to-br from-cream to-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-950">{card.title}</h3>
                  <p className="mt-3 min-h-12 text-sm leading-6 text-gray-500">{card.subtitle}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-brand">
                    {isEn ? "Discover Product" : "اكتشف المنتج"}
                    <ArrowLeft className={`h-4 w-4 transition group-hover:-translate-x-1 ${isEn ? "rotate-180" : ""}`} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold text-brand">{isEn ? "The Complete Routine" : "الروتين الكامل"}</p>
              <h2 className="text-3xl font-extrabold text-gray-950 sm:text-4xl">
                {isEn ? "Naseem Routine Products" : "منتجات روتين نسيم"}
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                {isEn ? "Shop our carefully selected products for a comfortable and clear routine." : "تسوق منتجاتنا المختارة بعناية لروتين مريح وواضح."}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href={`/${lang}/collection`}>{isEn ? "View All Products" : "عرض كل المنتجات"}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.sku} product={product} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-[2rem] bg-brand-50 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1000&auto=format&fit=crop"
              alt="معيار نسيم"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-brand-900/20" />
            <div className="absolute inset-x-6 bottom-6 rounded-3xl bg-white/95 p-6 shadow-xl backdrop-blur">
              <p className="text-sm font-bold text-brand">{isEn ? "Naseem Standard" : "معيار نسيم للخصوصية"}</p>
              <p className="mt-2 text-2xl font-extrabold text-gray-950">
                {isEn ? "100% Private Delivery" : "توصيل سري وتغليف خاص"}
              </p>
            </div>
          </div>

          <div className="order-1 space-y-6 lg:order-2">
            <p className="text-sm font-bold text-brand">{isEn ? "Why are we different?" : "لماذا نحن مختلفون؟"}</p>
            <h2 className="text-3xl font-extrabold leading-tight text-gray-950 sm:text-4xl">
              {isEn ? "Understanding Sensitive Needs" : "نفهم احتياجك الحساس"}
            </h2>
            <p className="leading-8 text-gray-600">
              {isEn ? "We do not just sell products; we offer a clear routine to support you without embarrassment. Every product is chosen to address a specific issue with complete privacy from ordering to delivery." : "نحن لا نبيع منتجات عشوائية، بل نقدم روتيناً واضحاً لدعمك بدون إحراج. كل منتج مختار لمعالجة زاوية محددة من المشكلة، مع سرية تامة من الطلب وحتى الاستلام."}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                isEn ? "Targeted effective ingredients" : "مكونات فعالة وموجهة",
                isEn ? "100% discreet packaging without details" : "تغليف سري 100% بدون تفاصيل",
                isEn ? "Designed for clear results" : "مصمم لنتائج واضحة وملموسة",
                isEn ? "Cash on delivery without risk" : "الدفع عند الاستلام وبدون مجازفة",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-cream p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span className="text-sm font-semibold text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold text-brand">{isEn ? "Quality Standard" : "معيار الجودة"}</p>
            <h2 className="text-3xl font-extrabold text-gray-950 sm:text-4xl">
              {isEn ? "5 Steps Before Reaching You" : "5 مراحل قبل أن يصلك المنتج"}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {qualitySteps[lang].map((step, index) => (
              <div key={step} className="rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-extrabold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="text-sm font-bold text-gray-900">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-brand p-8 text-white sm:p-10">
            <Truck className="mb-6 h-12 w-12 text-white" />
            <h2 className="text-3xl font-extrabold">{isEn ? "Why Cash on Delivery?" : "لماذا الدفع عند الاستلام؟"}</h2>
            <p className="mt-4 leading-8 text-white/85">
              {isEn ? "We believe your trust is more precious than any order. That's why we offer cash on delivery — pay only when your products arrive." : "نؤمن أن ثقتك أغلى من أي طلب. لذلك نقدم لك خيار الدفع عند الاستلام — لا تدفع إلا بعد ما توصلك المنتجات."}
            </p>
          </div>

          <div className="grid gap-4">
            {[
              { title: isEn ? "No Credit Card Needed" : "بدون بطاقة بنكية", text: isEn ? "We don't need your card number. Pay cash upon receipt." : "لا نحتاج رقم بطاقة. ادفع كاش عند الاستلام." },
              { title: isEn ? "No Risk" : "بدون مجازفة", text: isEn ? "See the product first. If you're not satisfied, reject it." : "شوف المنتج أولاً. إذا مو راضي، ارفضه." },
              { title: isEn ? "Fast Delivery" : "توصيل سريع", text: isEn ? "To all regions in KSA as fast as possible." : "لكافة مناطق السعودية بأسرع وقت ممكن." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-3xl border border-gray-100 bg-cream p-6">
                <ClipboardCheck className="h-7 w-7 shrink-0 text-brand" />
                <div>
                  <h3 className="font-extrabold text-gray-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <div className="mb-3 flex justify-center text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-6 w-6 fill-current" />
              ))}
            </div>
            <h2 className="text-3xl font-extrabold text-gray-950 sm:text-4xl">
              {isEn ? "Customers Who Chose Privacy & Clarity" : "عملاء اختاروا الخصوصية والوضوح"}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {reviews[lang].map((review) => (
              <div key={review.name} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="mb-4 flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="min-h-20 text-sm leading-7 text-gray-700">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <p className="font-bold text-gray-950">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand py-16 text-white sm:py-20">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Award className="mx-auto mb-6 h-14 w-14 text-sand" />
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            {isEn ? "Start Your Journey Today" : "ابدأ رحلة راحتك اليوم"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/85">
            {isEn ? "Choose the relief you deserve. Cash on delivery, fast shipping across KSA, and ordering takes less than a minute." : "اختر الراحة التي تستحقها. الدفع عند الاستلام، والتوصيل سريع لكافة أنحاء السعودية، والطلب يتم خلال أقل من دقيقة."}
          </p>
          <div className="mt-8">
            <Button size="xl" variant="secondary" className="font-bold text-brand" asChild>
              <Link href={`/${lang}/collection`}>{dict.common.buyNow}</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/70">
            {isEn ? "129 SAR for one item • 199 SAR for two • 269 SAR for the full course" : "129 ريال للعبوة • 199 ريال لعبوتين • 269 ريال للكورس الكامل"}
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-6 mb-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs leading-relaxed text-gray-400">
            {isEn ? "Our products are designed for personal care and do not replace medical advice in severe medical conditions." : "منتجاتنا مصممة للعناية الشخصية ولا تُغني عن استشارة الطبيب في الحالات الطبية الشديدة."}
          </p>
        </div>
      </section>

      {/* Sticky Buy Button for Home Page */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 animate-in slide-in-from-bottom duration-500">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <Link 
            href={`/${lang}/collection`}
            className="w-full sm:w-80 flex items-center justify-center bg-brand text-white px-8 py-3.5 rounded-full font-bold text-lg shadow-lg hover:bg-brand-700 transition-colors"
          >
            {dict.common.buyNow}
          </Link>
        </div>
      </div>
    </>
  );
}

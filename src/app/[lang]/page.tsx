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
  title: "نسيم | علاج البواسير المتكامل — 9 منتجات متخصصة | السعودية",
  description:
    "نسيم يقدم حلولاً متكاملة لعلاج البواسير: جل الكيتوزان، كبسولات الديوسمين والكركمين، ألياف السيليوم، مناديل الويتش هازل، تحاميل، بخاخ أعشاب، وسادة طبية، وحوض مقعدة. الدفع عند الاستلام داخل السعودية.",
};

const trustItems = [
  "الدفع عند الاستلام",
  "تغليف خاص بدون إحراج",
  "توصيل داخل السعودية",
  "منتجات عناية حساسة مختارة بعناية",
];

const stats = [
  { value: "+50,000", label: "عميل سعيد" },
  { value: "4.8/5", label: "تقييم العملاء" },
  { value: "9", label: "منتجات متخصصة" },
  { value: "100%", label: "خصوصية وسرية" },
];

const problemCards = [
  {
    title: "الألم والنزيف الفوري",
    subtitle: "جل الكيتوزان وبخاخ الأعشاب — راحة فورية من أول استخدام",
    href: "/products/chitosan-bio-gel",
    icon: Sparkles,
  },
  {
    title: "تكرار البواسير",
    subtitle: "كبسولات الديوسمين والكركمين — عالج السبب من الداخل",
    href: "/products/diosmin-hesperidin-capsules",
    icon: HeartPulse,
  },
  {
    title: "الوقاية والعناية اليومية",
    subtitle: "ألياف السيليوم ومناديل الويتش هازل — امنع المشكلة قبل حدوثها",
    href: "/products/psyllium-fiber-capsules",
    icon: ShieldCheck,
  },
];

const reviews = [
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
];

const qualitySteps = [
  "اختيار المشكلة",
  "مراجعة المكونات",
  "تقييم طريقة الاستخدام",
  "تجربة العميل",
  "تحسين الروتين",
];

export default function HomePage() {
  return (
    <>
      <section className="bg-brand-800 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-4 py-2 text-center text-xs sm:flex-row sm:gap-3 sm:text-sm">
          <span>توصيل داخل السعودية</span>
          <span className="hidden text-white/40 sm:inline">-</span>
          <span>الدفع عند الاستلام</span>
          <span className="hidden text-white/40 sm:inline">-</span>
          <span>تغليف خاص بدون تفاصيل محرجة</span>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-cream to-white">
        <div className="absolute inset-x-0 top-16 h-32 bg-[radial-gradient(circle_at_center,rgba(63,107,90,0.18),transparent_65%)]" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand shadow-sm ring-1 ring-brand/10">
              <ShieldCheck className="h-4 w-4" />
              علامة عالمية متخصصة في علاج البواسير
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold leading-tight text-gray-950 sm:text-5xl lg:text-6xl">
                تخلّص من البواسير
                <span className="block text-brand">بحلول متكاملة مُثبتة علمياً</span>
              </h1>
              <p className="max-w-xl text-lg leading-8 text-gray-600">
                نسيم يقدّم 9 منتجات متخصصة: علاج فوري بالكيتوزان، دعم للأوردة بالديوسمين والكركمين، وقاية بالألياف، عناية يومية، وراحة للجلوس. اطلب أونلاين بتغليف سري والدفع عند الاستلام.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="xl" asChild>
                <Link href="/collection">
                  تسوّق روتين نسيم
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="#problems">اختر حسب مشكلتك</Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-700">
                4.8/5 من عملاء يبحثون عن حل خاص وواضح
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-100 to-sand shadow-2xl">
              <Image
                src="/brand/hero-collection.jpg"
                alt="مجموعة نسيم المتكاملة لعلاج البواسير"
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
              <p className="text-sm font-bold text-gray-950">تغليف خاص</p>
              <p className="text-xs text-gray-500">بدون تفاصيل محرجة</p>
            </div>

            <div className="absolute -right-2 bottom-8 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-100 sm:-right-8">
              <Truck className="mb-2 h-6 w-6 text-brand" />
              <p className="text-sm font-bold text-gray-950">داخل السعودية</p>
              <p className="text-xs text-gray-500">الدفع عند الاستلام</p>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-brand py-4 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm font-semibold sm:px-6">
          {[...trustItems, ...trustItems].map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center gap-2 text-white/95">
              <CheckCircle className="h-4 w-4" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4">
          {stats.map((stat) => (
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
            <p className="mb-3 text-sm font-bold text-brand">تسوّق حسب ما يزعجك</p>
            <h2 className="text-3xl font-extrabold text-gray-950 sm:text-4xl">
              ما هي مشكلتك الأساسية؟
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              البواسير مشكلة مركّبة تحتاج حلولاً متعددة. اختر حسب ما يزعجك
              الآن ونسيم يرشّحلك المنتج الأنسب.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {problemCards.map((card) => {
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
                    اكتشف المنتج
                    <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
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
              <p className="mb-3 text-sm font-bold text-brand">الأكثر طلباً</p>
              <h2 className="text-3xl font-extrabold text-gray-950 sm:text-4xl">
                مجموعة نسيم المتكاملة
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                9 منتجات متخصصة — علاج فوري، دعم داخلي، وقاية، عناية يومية، وراحة. اختر ما يناسبك أو اجمعها في باقة.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/collection">عرض كل المنتجات</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.slice(0, 6).map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
          {PRODUCTS.length > 6 && (
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/collection">عرض جميع المنتجات ({PRODUCTS.length})</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-[2rem] bg-brand-50 lg:order-1">
            <Image
              src="/images/products/chitosan-gel.jpg"
              alt="العلم وراء نسيم — جل الكيتوزان الحيوي"
              fill
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-brand-900/20" />
            <div className="absolute inset-x-6 bottom-6 rounded-3xl bg-white/95 p-6 shadow-xl backdrop-blur">
              <p className="text-sm font-bold text-brand">معيار نسيم للجودة</p>
              <p className="mt-2 text-2xl font-extrabold text-gray-950">
                لا نبيع منتجات عشوائية
              </p>
            </div>
          </div>

          <div className="order-1 space-y-6 lg:order-2">
            <p className="text-sm font-bold text-brand">العلم وراء نسيم</p>
            <h2 className="text-3xl font-extrabold leading-tight text-gray-950 sm:text-4xl">
              كل منتج له وظيفة واضحة في روتين الراحة
            </h2>
            <p className="leading-8 text-gray-600">
              كل منتج مبني على أبحاث علمية: الكيتوزان للحماية والإرقاء، الديوسمين لتقوية الأوردة، الكركمين لوقف التطوّر، السيليوم لمنع الإمساك. مكونات مُثبتة بتجارب سريرية — بدون ادعاءات فارغة.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "مكونات مفهومة ومذكورة بوضوح",
                "تجربة طلب خاصة وحساسة",
                "روتين بثلاث زوايا وليس منتجاً واحداً",
                "لغة واضحة بدون ادعاءات علاج نهائي",
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
            <p className="mb-3 text-sm font-bold text-brand">معيار نسيم</p>
            <h2 className="text-3xl font-extrabold text-gray-950 sm:text-4xl">
              خمس خطوات قبل أن يحمل المنتج اسم نسيم
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {qualitySteps.map((step, index) => (
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
            <h2 className="text-3xl font-extrabold">لماذا الدفع عند الاستلام؟</h2>
            <p className="mt-4 leading-8 text-white/85">
              لأن الثقة في هذا النوع من المنتجات أهم من أي شيء. لا تحتاج بطاقة
              بنكية، ولا تدفع قبل وصول الطلب. يصلك بتغليف خاص، وتدفع عند
              الاستلام داخل السعودية.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              { title: "بدون بطاقة بنكية", text: "الطلب يتم باسمك ورقم جوالك فقط." },
              { title: "تغليف خاص", text: "لا توجد تفاصيل محرجة على الغلاف الخارجي." },
              { title: "تأكيد أوضح", text: "صفحة الشكر توضّح المبلغ والمنتجات وخطوات الاستلام." },
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
              عملاء اختاروا الخصوصية والوضوح
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {reviews.map((review) => (
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
            ابدأ بروتين نسيم اليوم
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/85">
            اختر منتجاً واحداً أو اجمع عدة منتجات في باقة متكاملة. الدفع عند
            الاستلام، والتغليف سري، والطلب يتم خلال أقل من دقيقة.
          </p>
          <div className="mt-8">
            <Button size="xl" variant="secondary" className="font-bold text-brand" asChild>
              <Link href="/collection">تسوّق الآن</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/70">
            199 ريال للقطعة • 279 ريال لقطعتين • 349 ريال لثلاث قطع
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-6 mb-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs leading-relaxed text-gray-400">
            منتجات نسيم للعناية الشخصية ولا تُغني عن استشارة الطبيب في الحالات
            الشديدة أو النزيف أو الألم المستمر.
          </p>
        </div>
      </section>

      {/* Sticky Buy Button for Home Page */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 animate-in slide-in-from-bottom duration-500">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <Link 
            href="/collection" 
            className="w-full sm:w-80 flex items-center justify-center bg-brand text-white px-8 py-3.5 rounded-full font-bold text-lg shadow-lg hover:bg-brand-700 transition-colors"
          >
            تسوّق الآن
          </Link>
        </div>
      </div>
    </>
  );
}

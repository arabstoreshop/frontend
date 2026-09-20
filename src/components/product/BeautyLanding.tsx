import { CheckCircle, Clock, Heart, Shield, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MarketSync } from "@/components/home/MarketSync";
import { OfferSelector } from "@/components/product/OfferSelector";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getBeautyLanding } from "@/lib/beauty-landing";
import { withLang } from "@/lib/lang";
import { getCrossells, getProductBySlug } from "@/lib/products";
import type { Product } from "@/types";

export function BeautyLanding({ product, lang = "ar" }: { product: Product; lang?: string }) {
  const landing = getBeautyLanding(product);
  const crossSells = getCrossells(product.sku);
  const pair = landing ? getProductBySlug(landing.pairingSlug) : undefined;
  const gallery = Array.from(new Set(product.images));

  return (
    <div className="bg-[#fbf7f2]">
      <MarketSync line="beauty" />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="mb-4 text-xs font-bold tracking-[0.25em] text-[#c9a27a]">NASEEM BEAUTY · المغرب</p>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={gallery} name={product.name} />

          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-[#7a4b2a] ring-1 ring-[#c9a27a]/30">
              {product.category}
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-extrabold leading-tight text-gray-950 sm:text-4xl">{product.name}</h1>
              {landing && <p className="text-lg font-semibold text-[#7a4b2a]">{landing.hook}</p>}
              <p className="text-base leading-8 text-gray-600">{landing?.promise ?? product.description}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              +2,400 طلب · 4.8/5 · الدفع عند الاستلام
            </div>
            <ul className="space-y-2.5">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm font-medium text-gray-800">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#c9a27a]" />
                  {benefit}
                </li>
              ))}
            </ul>
            <div id="buy" className="rounded-3xl border border-[#e8d8c4] bg-white p-5 shadow-sm sm:p-6 mb-24 md:mb-0">
              <p className="mb-4 text-sm font-bold text-gray-900">199 / 279 / 388 د.م. · الأكثر طلباً: جوج</p>
              <OfferSelector product={product} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Truck, text: "توصيل المغرب" },
                { icon: Shield, text: "دفع عند الباب" },
                { icon: Heart, text: "علبة صيدلية" },
              ].map((item) => (
                <div key={item.text} className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 text-center">
                  <item.icon className="h-5 w-5 text-[#c9a27a]" />
                  <span className="text-[11px] font-bold text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {landing && (
          <>
            <section className="mt-20 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white shadow-sm">
                <Image src={landing.problemImage} alt={landing.problemTitle} fill unoptimized className="object-cover" />
              </div>
              <div className="space-y-5">
                <p className="text-sm font-bold tracking-wide text-[#b42318]">المشكل</p>
                <h2 className="text-3xl font-extrabold text-gray-950">{landing.problemTitle}</h2>
                <p className="text-lg leading-8 text-gray-600">{landing.problemLead}</p>
                <ul className="space-y-3">
                  {(product.painPoints ?? []).map((pain) => (
                    <li key={pain} className="flex items-start gap-3 rounded-2xl bg-white p-4 text-gray-800">
                      <span className="font-bold text-[#b42318]">✕</span>
                      {pain}
                    </li>
                  ))}
                </ul>
                <p className="rounded-2xl bg-[#f3e6d4] p-5 text-lg font-semibold text-gray-900">
                  {product.emotionalBenefit}
                </p>
              </div>
            </section>

            <section className="mt-20 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
              <div className="order-2 space-y-5 md:order-1">
                <p className="text-sm font-bold tracking-wide text-[#c9a27a]">العلبة</p>
                <h2 className="text-3xl font-extrabold text-gray-950">كتبان صيدلية، ماشي سوق</h2>
                <p className="text-lg leading-8 text-gray-600">{product.description}</p>
                <p className="text-base leading-7 text-gray-500">{product.scienceProof}</p>
              </div>
              <div className="relative order-1 aspect-square overflow-hidden rounded-[2rem] bg-white shadow-sm md:order-2">
                <Image src={landing.packImage} alt={product.name} fill unoptimized className="object-cover" />
              </div>
            </section>

            {landing.labelImage && (
              <section className="mt-20 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-[#2a0f16] shadow-sm">
                  <Image src={landing.labelImage} alt={`لاصقة ${product.name}`} fill unoptimized className="object-cover" />
                </div>
                <div className="space-y-5">
                  <p className="text-sm font-bold tracking-wide text-[#c9a27a]">التركيبة</p>
                  <h2 className="text-3xl font-extrabold text-gray-950">مكتوب على العلبة، ماشي إعلان</h2>
                  <div className="space-y-4">
                    {(product.ingredientsDetails ?? []).map((ingredient, index) => (
                      <div key={ingredient.name} className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-sm font-bold text-[#c9a27a]">{index + 1}</p>
                        <h3 className="mt-1 text-lg font-bold text-gray-950">{ingredient.name}</h3>
                        <p className="mt-1 text-gray-600">{ingredient.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {!landing.labelImage && product.ingredientsDetails && (
              <section className="mt-20">
                <p className="text-sm font-bold tracking-wide text-[#c9a27a]">التركيبة</p>
                <h2 className="mt-2 text-3xl font-extrabold text-gray-950">المكوّنات اللي كتقول الحقيقة</h2>
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {product.ingredientsDetails.map((ingredient) => (
                    <div key={ingredient.name} className="rounded-2xl bg-white p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-950">{ingredient.name}</h3>
                      <p className="mt-2 text-gray-600">{ingredient.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2">
              <div className="rounded-[2rem] bg-white p-8 shadow-sm">
                <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-[#c9a27a]">
                  <Clock className="h-4 w-4" />
                  {landing.ritualTitle}
                </div>
                <h2 className="text-3xl font-extrabold text-gray-950">طريقة الاستعمال</h2>
                <ol className="mt-6 space-y-4">
                  {landing.ritualSteps.map((step, index) => (
                    <li key={step} className="flex gap-4 text-lg text-gray-700">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3e6d4] font-bold text-[#7a4b2a]">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-[2rem] bg-[#2a0f16] p-8 text-white">
                <h2 className="text-3xl font-extrabold">شنو كيبان</h2>
                <div className="mt-6 space-y-5">
                  {landing.timeline.map((item) => (
                    <div key={item.day} className="border-b border-white/10 pb-4 last:border-0">
                      <p className="text-sm font-bold text-[#c9a27a]">{item.day}</p>
                      <p className="mt-1 text-lg">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {pair && (
              <section className="mt-20 overflow-hidden rounded-[2rem] bg-white shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-square">
                    <Image src={pair.image} alt={pair.name} fill unoptimized className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center space-y-4 p-8">
                    <p className="text-sm font-bold text-[#c9a27a]">كمّلي الروتين</p>
                    <h2 className="text-3xl font-extrabold text-gray-950">{pair.name}</h2>
                    <p className="text-lg leading-8 text-gray-600">{landing.pairingPitch}</p>
                    <Link
                      href={withLang(lang, `/products/${pair.slug}?line=beauty`)}
                      className="inline-flex w-fit rounded-full bg-[#2a0f16] px-6 py-3 font-bold text-white"
                    >
                      شوفي العلبة
                    </Link>
                  </div>
                </div>
              </section>
            )}

            <section className="mt-20 text-center">
              <p className="text-sm font-bold text-[#c9a27a]">تجارب من المغرب</p>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-950">كازا، رباط، مراكش</h2>
              <div className="mt-10 grid grid-cols-1 gap-4 text-right md:grid-cols-3">
                {landing.reviews.map((review) => (
                  <div key={review.name} className="rounded-2xl bg-white p-6 text-right shadow-sm">
                    <div className="mb-3 flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="leading-7 text-gray-700">&quot;{review.text}&quot;</p>
                    <p className="mt-4 font-bold text-gray-950">
                      {review.name} · {review.city}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div className="rounded-[2rem] bg-white p-8">
                <h2 className="text-3xl font-extrabold text-gray-950">أسئلة قبل ما تطلبي</h2>
                <Accordion type="single" collapsible className="mt-6 w-full">
                  {landing.faqs.map((faq, index) => (
                    <AccordionItem key={faq.q} value={`faq-${index}`}>
                      <AccordionTrigger className="text-right font-bold">{faq.q}</AccordionTrigger>
                      <AccordionContent className="leading-7 text-gray-600">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              <div className="flex flex-col justify-between rounded-[2rem] bg-[#2a0f16] p-8 text-white">
                <div>
                  <h2 className="text-3xl font-extrabold">أطلبي دابا، خلّصي فالدار</h2>
                  <p className="mt-4 text-lg leading-8 text-white/80">
                    قطعة 199 د.م. · جوج 279 د.م. · ثلاث 388 د.م. توصيل المغرب، الدفع عند الاستلام.
                  </p>
                </div>
                <Link
                  href="#buy"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[#c9a27a] px-8 py-4 text-lg font-bold text-[#2a0f16]"
                >
                  اختاري الكمية
                </Link>
              </div>
            </section>

            <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-6 text-gray-500">{landing.disclaimer}</p>
          </>
        )}

        {crossSells.length > 0 && (
          <section className="mt-20 pb-24">
            <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-950">نفس الدار، مشكل آخر</h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
              {crossSells.map((item) => (
                <ProductCard key={item.sku} product={item} lang={lang === "en" ? "en" : "ar"} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

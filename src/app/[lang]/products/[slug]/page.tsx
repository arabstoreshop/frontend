import { ArrowRight, CheckCircle, Package, Shield, Star, Truck, ShieldCheck, Activity, Award, Heart, Clock, AlertCircle, ThumbsUp, Zap, ChevronDown, ChevronUp } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OfferSelector } from "@/components/product/OfferSelector";
import { ProductCard } from "@/components/product/ProductCard";
import { getCrossells, getProductBySlug, PRODUCTS } from "@/lib/products";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "منتج غير موجود" };
  return {
    title: `${product.name} | نسيم`,
    description: product.description,
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const crossSells = getCrossells(product.sku);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-brand transition-colors">الرئيسية</Link>
        <ArrowRight className="w-3.5 h-3.5" />
        <Link href="/collection" className="hover:text-brand transition-colors">المنتجات</Link>
        <ArrowRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      {/* Main product */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-cream rounded-3xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.sfdaApproved && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span className="text-xs font-bold text-gray-900">مرخص SFDA</span>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <div key={i} className="relative aspect-square bg-sand rounded-xl overflow-hidden border border-gray-100">
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-medium text-brand bg-brand-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-3 leading-snug">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-400 font-medium">+480 تقييم من عميلاتنا</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>

          {/* Benefits */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">لماذا تختارين هذا المنتج؟</h3>
            <ul className="space-y-2.5">
              {product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Offer selector + CTA */}
          <div id="buy" className="p-6 bg-cream rounded-2xl border border-gray-100 shadow-sm">
            <OfferSelector product={product} />
          </div>

          {/* Trust row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Truck className="w-5 h-5" />, text: "شحن سريع" },
              { icon: <Package className="w-5 h-5" />, text: "تغليف سري" },
              { icon: <Shield className="w-5 h-5" />, text: "دفع عند الاستلام" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 text-brand text-center bg-gray-50/50"
              >
                {item.icon}
                <span className="text-xs text-gray-700 font-bold">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pain vs Solution Section (Image Left, Text Right) */}
      {product.painPoints && product.emotionalBenefit && (
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square bg-red-50 rounded-3xl overflow-hidden order-2 md:order-1 border border-red-100 shadow-sm">
            <div className="absolute inset-0 flex items-center justify-center text-red-200">
              <Activity className="w-32 h-32 opacity-50" />
            </div>
            {/* Optional Image placeholder */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-100/50 to-transparent"></div>
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-sm font-bold px-4 py-1.5 rounded-full mb-2">
              <AlertCircle className="w-4 h-4" />
              المشكلة التي تعانين منها
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">هل تعبتِ من هذه المعاناة بصمت؟</h2>
            <p className="text-gray-600 text-lg">نعلم أن هذه الأعراض تسلب منك راحتك وتجعلك في قلق مستمر. لستِ وحدك في هذا.</p>
            <ul className="space-y-4 mt-6">
              {product.painPoints.map((pain, i) => (
                <li key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-red-50/50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <span className="text-sm font-bold">✕</span>
                  </div>
                  <span className="text-gray-700 font-medium text-lg leading-relaxed">{pain}</span>
                </li>
              ))}
            </ul>
            <div className="p-6 bg-gradient-to-br from-brand-50 to-cream rounded-2xl border border-brand-100 mt-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-full -mr-12 -mt-12"></div>
              <h3 className="font-bold text-brand mb-3 flex items-center gap-2 text-xl relative z-10">
                <Heart className="w-6 h-6 fill-brand/20" />
                الحل الذي تستحقينه
              </h3>
              <p className="text-gray-800 leading-relaxed font-medium text-lg relative z-10">{product.emotionalBenefit}</p>
            </div>
          </div>
        </div>
      )}

      {/* Ingredients Spotlight (Image Right, Text Left) */}
      {product.ingredientsDetails && (
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                <Zap className="w-4 h-4" />
                سر الفعالية
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">مكونات طبيعية آمنة وفعالة</h2>
              <p className="text-gray-600 leading-relaxed text-lg mt-4">
                اخترنا لكِ أفضل ما في الطبيعة لضمان فعالية قصوى بدون أي أعراض جانبية مزعجة. تركيبة مصممة خصيصاً للمناطق الحساسة.
              </p>
            </div>
            <div className="space-y-5">
              {product.ingredientsDetails.map((ing, i) => (
                <div key={i} className="flex items-start gap-5 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center shrink-0 shadow-inner text-brand font-bold text-xl border border-brand-100">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">{ing.name}</h4>
                    <p className="text-gray-600 leading-relaxed">{ing.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] bg-gradient-to-bl from-green-50 to-cream rounded-3xl overflow-hidden order-1 md:order-2 border border-green-100 shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center text-green-200">
              <CheckCircle className="w-40 h-40 opacity-40" />
            </div>
             {/* Optional Image placeholder */}
             <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5 bg-repeat"></div>
          </div>
        </div>
      )}

      {/* Science & Authority (Image Left, Text Right) */}
      {product.scienceProof && (
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-50 rounded-3xl p-8 sm:p-12 border border-gray-100">
          <div className="relative aspect-square bg-white rounded-2xl overflow-hidden order-2 md:order-1 shadow-md border border-gray-100">
            <div className="absolute inset-0 flex items-center justify-center text-blue-100">
              <ShieldCheck className="w-32 h-32 opacity-60" />
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-6 py-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 w-max">
               <ShieldCheck className="w-8 h-8 text-green-600" />
               <div className="text-right">
                 <p className="text-sm font-bold text-gray-900">مرخص ومعتمد</p>
                 <p className="text-xs text-gray-500">هيئة الغذاء والدواء SFDA</p>
               </div>
            </div>
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full mb-2">
              <Shield className="w-4 h-4" />
              أمان وموثوقية
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">مثبت علمياً ومعتمد لراحتك</h2>
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-green-100 shadow-sm mt-6">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-lg font-bold text-gray-800">مرخص من هيئة الغذاء والدواء (SFDA)</span>
            </div>
            <div className="space-y-4 mt-6">
              <p className="text-gray-700 leading-relaxed text-lg font-medium">
                {product.scienceProof}
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                لا داعي للقلق بعد اليوم. منتجنا خضع لاختبارات صارمة لضمان أمانه التام للاستخدام اليومي، حتى للبشرة الأكثر حساسية. استخدميه بثقة تامة.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand" />
                <span className="font-medium text-gray-700">بدون كورتيزون</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand" />
                <span className="font-medium text-gray-700">لا يسبب ترقق الجلد</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand" />
                <span className="font-medium text-gray-700">آمن للاستخدام المتكرر</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand" />
                <span className="font-medium text-gray-700">مختبر جلدياً</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Proof & Reviews (New Section) */}
      <div className="mt-32 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-bold px-4 py-1.5 rounded-full mb-6">
          <ThumbsUp className="w-4 h-4" />
          تجارب حقيقية
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">آلاف النساء استعدن راحتهن</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          انضمي إلى أكثر من 2400 عميلة وثقن في منتجات نسيم للتخلص من الألم والإحراج.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
          {[
            { name: "سارة م.", city: "الرياض", text: "كنت أعاني بصمت لفترة طويلة ومحرجة أروح الصيدلية. المنتج هذا غير حياتي حرفياً، الراحة اللي حسيت فيها من أول يومين لا توصف.", rating: 5 },
            { name: "أم فهد", city: "جدة", text: "أفضل شيء إن التغليف كان سري جداً ومحد عرف وش طلبت. المنتج بارد ويهدي الحرارة بشكل فوري. أنصح فيه كل وحدة تعاني.", rating: 5 },
            { name: "نورة ع.", city: "الدمام", text: "جربت كريمات كثير بس هذا الوحيد اللي ما سبب لي حساسية ونتيجته طولت معي. الدفع عند الاستلام ريحني كثير.", rating: 5 }
          ].map((review, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex text-amber-400 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 font-medium">&quot;{review.text}&quot;</p>
              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="font-bold text-gray-900">{review.name}</span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  مشتري مؤكد - {review.city}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30-Day Warranty Banner */}
      <div className="mt-32 bg-gradient-to-r from-brand to-brand-700 rounded-3xl p-8 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-full mb-8 backdrop-blur-sm border border-white/20">
            <Award className="w-12 h-12 text-amber-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">الضمان الذهبي لمدة 30 يوماً</h2>
          <p className="text-white/90 mb-10 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            نحن واثقون من فعالية {product.name}. استخدميه لمدة 30 يوماً، وإذا لم تلاحظي الفرق الذي تستحقينه، سنعيد لكِ كامل المبلغ بدون أي أسئلة أو تعقيدات.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#buy" className="inline-flex items-center justify-center gap-3 bg-white text-brand px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-50 transition-colors">
              <Shield className="w-6 h-6 text-brand" />
              <span>تسوقي الآن براحة بال تامة</span>
            </Link>
          </div>
        </div>
      </div>

      {/* How to use & FAQ */}
      <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-cream rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm h-fit">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand text-sm font-bold px-4 py-1.5 rounded-full mb-6">
            <Clock className="w-4 h-4" />
            روتين العناية
          </div>
          <h2 className="font-bold text-gray-900 mb-6 text-3xl">طريقة الاستخدام الصحيحة</h2>
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            <p className="text-xl font-medium mb-6">{product.howToUse}</p>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 mt-8">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                نصائح لنتائج أفضل:
              </h4>
              <ul className="space-y-3 m-0 p-0 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold mt-1">•</span>
                  <span>الاستمرارية هي مفتاح النتائج الدائمة.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold mt-1">•</span>
                  <span>يفضل استخدامه بعد تنظيف وتجفيف المنطقة بلطف.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold mt-1">•</span>
                  <span>للاستخدام الخارجي فقط.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm h-fit">
           <h2 className="font-bold text-gray-900 mb-8 text-3xl">الأسئلة الشائعة</h2>
           <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-right font-bold text-lg">متى ألاحظ النتائج؟</AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed">
                معظم عملائنا يلاحظون تحسناً ملحوظاً في مستوى الراحة وتخفيف الحرارة من الأيام الأولى للاستخدام. للحصول على أفضل النتائج، ننصح بالاستمرار على الروتين لمدة أسبوعين على الأقل.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-right font-bold text-lg">هل المنتج آمن للاستخدام اليومي؟</AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed">
                نعم، بالتأكيد. تركيبتنا تعتمد على مكونات طبيعية 100% خالية من الكورتيزون والمواد الكيميائية القاسية، مما يجعلها آمنة تماماً للاستخدام اليومي المستمر دون التسبب في ترقق الجلد.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-right font-bold text-lg">كيف يتم تغليف الطلب؟ هل هو سري؟</AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed">
                نحن نقدر خصوصيتك تماماً. جميع طلباتنا يتم شحنها في صناديق سادة غير مميزة، ولا يوجد أي تفاصيل أو شعارات تدل على محتوى الشحنة من الخارج. المندوب لن يعرف محتوى الطلب.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-right font-bold text-lg">هل يمكنني الدفع عند الاستلام؟</AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed">
                نعم، نوفر خدمة الدفع عند الاستلام لجميع مناطق المملكة العربية السعودية لضمان راحتك وثقتك التامة عند الطلب.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-16 p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-2 text-gray-500">
          <AlertCircle className="w-5 h-5" />
          <span className="font-bold">تنويه هام</span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          منتجات نسيم مصممة للعناية الشخصية وتخفيف الأعراض المزعجة. هي لا تُغني عن استشارة الطبيب المختص في الحالات الشديدة، النزيف المستمر، أو الألم الحاد.
        </p>
      </div>

      {/* Cross-sells */}
      {crossSells.length > 0 && (
        <div className="mt-24 pb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">قد يعجبك أيضاً لنتائج أفضل</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-4xl mx-auto">
            {crossSells.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Buy Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 animate-in slide-in-from-bottom duration-500">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-brand font-bold">199 ريال للقطعة</p>
          </div>
          <Link 
            href="#buy" 
            className="flex-1 sm:flex-none w-full sm:w-64 flex items-center justify-center bg-brand text-white px-8 py-3.5 rounded-full font-bold text-lg shadow-lg hover:bg-brand-700 transition-colors"
          >
            أضف للسلة
          </Link>
        </div>
      </div>
    </div>
  );
}

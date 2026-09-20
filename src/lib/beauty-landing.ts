import type { Product } from "@/types";

export type BeautyLanding = {
  hook: string;
  promise: string;
  problemTitle: string;
  problemLead: string;
  problemImage: string;
  packImage: string;
  labelImage?: string;
  ritualTitle: string;
  ritualSteps: string[];
  timeline: { day: string; text: string }[];
  reviews: { name: string; city: string; text: string }[];
  faqs: { q: string; a: string }[];
  pairingSlug: string;
  pairingPitch: string;
  disclaimer: string;
};

const SCALP_REVIEWS = [
  { name: "سلمى ك.", city: "الدار البيضاء", text: "الفرشاة كانت عامرة كل صباح من الماء الكلسي. السيروم ماشي زيت، والعلبة بانها صيدلية. طلبت جوج." },
  { name: "إيمان ب.", city: "الرباط", text: "الجامي حلال والبكتين مكتوب. ماما فتحات العلبة وما ردّاتش. الشعر ما بقاش كيتقصّ بحال الأول." },
  { name: "هدى م.", city: "مراكش", text: "ما وعدونيش بالصلع. وعدوني بالتكسّر. وهاد الشي اللي بان بعد شهر." },
];

const BARRIER_REVIEWS = [
  { name: "ياسمين ر.", city: "طنجة", text: "وجهي كان كايحرق بعد الغسيل. الكريم ما فيه تبييض، غير ترطيب حاجز. الماكياج ولى كيثبت." },
  { name: "نادية ف.", city: "فاس", text: "العلبة بيضاء وذهب وردي، ماشي قنينة تبييض. خلّصت عند الباب بلا حشمة." },
  { name: "سارة ل.", city: "أكادير", text: "الجامي خوخ والفيتوسيراميد من الداخل. الجلد ما بقاش كايشد من الشمس." },
];

const REGARD_REVIEWS = [
  { name: "مريم ح.", city: "الدار البيضاء", text: "العلبة من الثلاجة، 15 دقيقة، الانتفاخ هبط قبل الزوم. هاد الشي اللي بغيته." },
  { name: "لينا ع.", city: "الرباط", text: "ما قالوش كيمحي الهالات نهائياً. قالو الانتفاخ. وبان من أول صباح." },
  { name: "أسماء ت.", city: "وجدة", text: "الجامي ديال العشا والباتش ديال الصباح. جوج طقوس، ماشي نفس الحاجة." },
];

const COD_FAQS = [
  {
    q: "كيفاش نخلّص؟",
    a: "الدفع عند الاستلام فالمغرب. كتبتي السمية والرقم، المندوب كيهضر معاك، وكتخلّصي فالدار.",
  },
  {
    q: "شنو كاين فالتغليف؟",
    a: "علبة صيدلية نسيم. تتحلّ قدام العائلة بلا حرج: سيروم، كريم، باتش، ولا جامي حلال.",
  },
  {
    q: "واش هادشي دواء؟",
    a: "لا. الموضعي تجميل. الجامي مكمل غذائي. ما كيعالجش مرض، وما كيعوّضش الطبيب.",
  },
];

export const BEAUTY_LANDINGS: Record<string, BeautyLanding> = {
  "naseem-scalp-serum": {
    hook: "شعري كيتقصّ من الماء الكلسي — ماشي صلع",
    promise: "طقوس 30 ليلة: قطّارة زجاج، سيراميد + نياسيناميد. كثافة ظاهرة، بلا زيت ثقيل وبلا وعود صلع.",
    problemTitle: "الفرشاة عامرة، والبالو عامر",
    problemLead: "الماء المغربي كلسي. كيطلي الفروة، والشعرة كاتقصّ فالدوش وعلى المخدّة. نتي ماشي صلعة — كثافتك كاتمشي مع الفرشاة.",
    problemImage: "/images/beauty/problem-hair.webp",
    packImage: "/images/beauty/scalp-serum.webp",
    ritualTitle: "4 إلى 6 قطرات، ليلاً، 30 ليلة",
    ritualSteps: [
      "شعرك ناشف أو رطب خفيف، بلا شطف من بعد.",
      "4 إلى 6 قطرات على الفروة، دلّكي 60 ثانية.",
      "نامي. كرري كل ليلة. الباقة 2 = 60 ليلة.",
    ],
    timeline: [
      { day: "ليلة 7", text: "الفروة مرتاحة، ما بقاش الدهن." },
      { day: "ليلة 21", text: "تكسّر أقل فالفرشاة." },
      { day: "ليلة 30+", text: "مظهر كثافة أوضح — الشعر كيحتاج وقت." },
    ],
    reviews: SCALP_REVIEWS,
    faqs: [
      { q: "واش كيعالج الصلع؟", a: "لا. ادّعاء تجميلي: تكسّر، فروة، مظهر الكثافة. ممنوع علاج الصلع ولا نتيجة 7 أيام." },
      ...COD_FAQS,
    ],
    pairingSlug: "naseem-scalp-gummies",
    pairingPitch: "السيروم من برا. الجامي من الداخل: بيوتين + زنك + سيليس البامبو، 30 يوم.",
    disclaimer: "منتج تجميلي. ما كيعالجش الصلع ولا أي مرض. استشيري طبيب إلا كان تساقط مفاجئ أو مرض جلدي.",
  },
  "naseem-barrier-cream": {
    hook: "وجه كايحرق بعد الغسيل — ماشي تبييض",
    promise: "كريم حاجز سيراميد NP ضد الشدّ والتقشّر من الماء والشمس. لمعان، بلا تبييض وبلا قنينة حليب.",
    problemTitle: "الجلد كايشد، والماكياج ما كيثبتش",
    problemLead: "الغاسول، الشمس، والماء الكلسي كيحرقو الوجه. نتي ما بغيتيش تبييض. بغيتي حاجز يرجع الجلد مرتاح اجتماعياً.",
    problemImage: "/images/beauty/problem-skin.webp",
    packImage: "/images/beauty/barrier-cream.webp",
    ritualTitle: "صباح ومساء، طبقة رقيقة",
    ritualSteps: [
      "على وجه رطب بعد التنظيف.",
      "طبقة رقيقة من المضخة. ما تغرقيش.",
      "النهار: SPF منفصل. بلا تبييض.",
    ],
    timeline: [
      { day: "يوم 1", text: "الشدّ كيهبط بعد أول استعمال." },
      { day: "أسبوع 1", text: "الماكياج كيثبت أحسن." },
      { day: "أسبوع 3", text: "مظهر حاجز مرتاح، إشراق بلا تبييض." },
    ],
    reviews: BARRIER_REVIEWS,
    faqs: [
      { q: "واش كيحيد السمرة؟", a: "لا. ادّعاء: confort، barrière، éclat. ممنوع تبييض ولا كتحيّد السمرة." },
      ...COD_FAQS,
    ],
    pairingSlug: "naseem-barrier-gummies",
    pairingPitch: "الكريم على الوجه. الجامي فيتوسيراميد + فيتامين C من الداخل، 30 يوم.",
    disclaimer: "منتج تجميلي. ما كيحيدش السمرة وما كيعالجش مرض جلدي. SPF النهار منفصل.",
  },
  "naseem-regard-patches": {
    hook: "كانبان مريضة وأنا غير عيّانة",
    promise: "5 أزواج هيدروجيل كافيين + ببتيد. من الثلاجة، 15 دقيقة. الانتفاخ كيهبط من استعمال واحد.",
    problemTitle: "هالات وانتفاخ فالفيزيو",
    problemLead: "الوجه نعسان فالاجتماع. الماكياج كيهبط تحت العين. ما بغيتيش كريم رخيص — بغيتي علبة تتحط فالتلاجة.",
    problemImage: "/images/beauty/problem-eyes.webp",
    packImage: "/images/beauty/regard-patches.webp",
    ritualTitle: "من الثلاجة، 15 دقيقة",
    ritualSteps: [
      "خلي العلبة فالتلاجة.",
      "زوج تحت العين، 15 دقيقة قبل الماكياج.",
      "5 أزواج فالعلبة. الباقة 2 = 10 صباحات.",
    ],
    timeline: [
      { day: "15 دقيقة", text: "الانتفاخ كيبان أقل." },
      { day: "صباح 3", text: "طقوس ثابتة قبل الزوم." },
      { day: "أسبوع", text: "مظهر صاحي — بلا ادعاء محي الهالات." },
    ],
    reviews: REGARD_REVIEWS,
    faqs: [
      { q: "واش كيمحي الهالات نهائياً؟", a: "لا. النتيجة البصرية للانتفاخ من استعمال واحد. الهالات العميقة ما كتمحيش بحبة ولا باتش." },
      ...COD_FAQS,
    ],
    pairingSlug: "naseem-regard-gummies",
    pairingPitch: "الباتش للصباح. الجامي بعد العشا: إل-ثيانين + عنب، بلا كافيين.",
    disclaimer: "منتج تجميلي. ما كيمحيش الهالات نهائياً. النتيجة البصرية للانتفاخ مؤقتة.",
  },
  "naseem-scalp-gummies": {
    hook: "تغذية الشعرة من الجذور — 30 يوم",
    promise: "جامي رمان، علبة عنبر، حلال بكتين. بيوتين + زنك + سيليس البامبو ضد تكسّر الماء الكلسي. مكمل، ماشي دواء صلع.",
    problemTitle: "البيوتين الجامبو الرخيص ما كيقنعش",
    problemLead: "شعري كيطير من الماء. بغيتي حاجة العائلة تفتحها: علبة صيدلية، حلال، بلا جيلاتين، بلا وعود 7 أيام.",
    problemImage: "/images/beauty/problem-hair.webp",
    packImage: "/images/beauty/store-scalp.webp",
    labelImage: "/images/beauty/label-scalp.webp",
    ritualTitle: "جوج حبات بعد الفطور",
    ritualSteps: [
      "جوج حبات بعد الفطور، كل يوم.",
      "60 حبة = 30 يوم. الباقة 2 = 60 يوم.",
      "الشعر كيحتاج 8 إلى 12 أسبوع. ماشي أسبوع.",
    ],
    timeline: [
      { day: "أسبوع 2", text: "طقوس ثابتة، العلبة كتبان صيدلية." },
      { day: "أسبوع 6", text: "تكسّر أقل فالفرشاة." },
      { day: "أسبوع 8–12", text: "مظهر كثافة من الداخل." },
    ],
    reviews: SCALP_REVIEWS,
    faqs: [
      { q: "واش حلال؟", a: "بكتين، بلا جيلاتين. مكمل غذائي. رقم تسجيل AMMPS كيتطبع على العلبة عند الإطلاق." },
      { q: "واش كيعالج الصلع؟", a: "لا. مكمل غذائي ضد مظهر التكسّر. ممنوع يعالج الصلع ولا نتيجة 7 أيام." },
      ...COD_FAQS,
    ],
    pairingSlug: "naseem-scalp-serum",
    pairingPitch: "الجامي من الداخل. السيروم ليلاً على الفروة: سيراميد + نياسيناميد.",
    disclaimer: "مكمل غذائي. ما كيعوّضش أكل متنوّع. حامل: رأي طبي. ما كيعالجش الصلع.",
  },
  "naseem-barrier-gummies": {
    hook: "بارير من الداخل — ماشي قنينة تبييض",
    promise: "جامي خوخ: فيتوسيراميد + فيتامين C + هيالورونيك. ترطيب الجدار من الداخل. ماشي كولاجين كذبة.",
    problemTitle: "الجلد كايشد من الشمس والماء",
    problemLead: "ما بغيتيش تبييض. والكولاجين فالجامي كذبة فالجرامات. هاد الشي فيتوسيراميد — سيراميد نباتي للترطيب.",
    problemImage: "/images/beauty/problem-skin.webp",
    packImage: "/images/beauty/store-barrier.webp",
    labelImage: "/images/beauty/label-barrier.webp",
    ritualTitle: "جوج حبات بعد الفطور، 30 يوم",
    ritualSteps: [
      "جوج حبات بعد الفطور.",
      "30 يوم على الأقل. الترطيب كيبان من الأسبوع 2–4.",
      "كمّلي بالكريم نسيم بارير على الوجه.",
    ],
    timeline: [
      { day: "أسبوع 2", text: "الشدّ كيهبط شوية." },
      { day: "أسبوع 4", text: "مظهر ترطيب من الداخل." },
      { day: "شهر 2", text: "حاجز أكثر راحة مع الكريم." },
    ],
    reviews: BARRIER_REVIEWS,
    faqs: [
      { q: "واش كيببّض؟", a: "لا. فيتوسيراميد للترطيب. فيتامين C بجرعة قانونية لمظهر الكولاجين الطبيعي. ممنوع تبييض." },
      ...COD_FAQS,
    ],
    pairingSlug: "naseem-barrier-cream",
    pairingPitch: "الجامي من الداخل. الكريم سيراميد NP على الوجه صباح ومساء.",
    disclaimer: "مكمل غذائي. ما كيببّضش وما كيعالجش مرض. حامل: رأي طبي.",
  },
  "naseem-regard-gummies": {
    hook: "نظارة المساء — ماشي باتش فحبة",
    promise: "جامي بنفسجي بعد العشا: إل-ثيانين + عنب + لوتين. بلا كافيين. الباتش كيهبط الانتفاخ في 15 دقيقة؛ هاد الشي طقوس نوم.",
    problemTitle: "وجه نعسان فالفيزيو",
    problemLead: "ما تصدّقيش جامي كيمحي الهالات بحال الباتش. بغيتي طقوس ليل: جوج حبات بعد العشا، والثلاجة بقات للباتش.",
    problemImage: "/images/beauty/problem-eyes.webp",
    packImage: "/images/beauty/store-regard.webp",
    labelImage: "/images/beauty/label-regard.webp",
    ritualTitle: "جوج حبات بعد العشا",
    ritualSteps: [
      "بعد العشا، بلا كافيين.",
      "60 حبة = 30 مساء.",
      "الانتفاخ ديال الصباح: باتش نسيم ريغارد من الثلاجة.",
    ],
    timeline: [
      { day: "ليلة 1", text: "طقوس واضحة بعد العشا." },
      { day: "أسبوع 2", text: "مظهر أقل نعاس." },
      { day: "شهر", text: "نظارة — بلا ادعاء محي الهالات." },
    ],
    reviews: REGARD_REVIEWS,
    faqs: [
      { q: "واش كيمحي الهالات؟", a: "لا. ادّعاء: نظارة / طقوس نوم. الباتش هو اللي كيهبط الانتفاخ في 15 دقيقة." },
      ...COD_FAQS,
    ],
    pairingSlug: "naseem-regard-patches",
    pairingPitch: "الجامي للمساء. الباتش كافيين للصباح من الثلاجة.",
    disclaimer: "مكمل غذائي. ما كيمحيش الهالات. حامل: رأي طبي. بلا كافيين.",
  },
};

export function getBeautyLanding(product: Product): BeautyLanding | undefined {
  return BEAUTY_LANDINGS[product.slug];
}

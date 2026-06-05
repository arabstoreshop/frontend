import type { Offer, Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "NSM-GEL-001",
    sku: "NSM-GEL-001",
    slug: "menthol-cooling-gel",
    name: "جل المنثول للتبريد ضد الحكة والحرارة",
    nameEn: "Menthol Cooling Gel",
    description: "جل مُنعّش بالمنثول مصمم لدعم إحساس التبريد وتهدئة الانزعاج الموضعي في المنطقة الحساسة عند الشعور بالحكة أو الحرارة.",
    descriptionEn: "A refreshing menthol gel designed to support a cooling sensation and soothe local discomfort in sensitive areas when experiencing itching or heat.",
    benefits: [
      "يساعد على تهدئة الإحساس بالحرارة والحكة",
      "يمنح إحساساً بالانتعاش الفوري",
      "تركيبة لطيفة على البشرة الحساسة",
      "سهل الاستخدام ويُمتص بسرعة"
    ],
    benefitsEn: [
      "Helps soothe the sensation of heat and itching",
      "Provides an instant feeling of freshness",
      "Gentle formula on sensitive skin",
      "Easy to use and absorbs quickly"
    ],
    howToUse: "ضع كمية صغيرة على المنطقة المراد تبريدها بعد الاستحمام أو عند الحاجة. للاستخدام الخارجي فقط.",
    howToUseEn: "Apply a small amount to the area to be cooled after showering or as needed. For external use only.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"],
    category: "عناية موضعية",
    categoryEn: "Topical Care",
    painPoints: [
      "ألم وحرقة مستمرة تمنعك من الجلوس براحة",
      "إحراج من زيارة الصيدلية أو التحدث عن المشكلة",
      "خوف من تفاقم الحالة واللجوء للجراحة",
      "حكة مزعجة تؤثر على تركيزك ويومك"
    ],
    painPointsEn: [
      "Constant pain and burning preventing comfortable sitting",
      "Embarrassment of visiting the pharmacy or discussing the problem",
      "Fear of the condition worsening and resorting to surgery",
      "Annoying itching that affects your focus and day"
    ],
    emotionalBenefit: "استعد راحتك في البيت أو خارج البيت، بدون إحراج وبطلب خاص يصل بتغليف لا يوضح تفاصيل المنتج.",
    emotionalBenefitEn: "Regain your comfort at home or outdoors, without embarrassment, with a private order that arrives in discreet packaging.",
    scienceProof: "يعتمد على فكرة التبريد الموضعي بالمنثول مع مكونات لطيفة ضمن روتين العناية الحساسة.",
    sfdaApproved: true,
    ingredientsDetails: [
      { name: "مستخلص المنثول", description: "يمنح برودة فورية تخدر الألم وتخفف الاحتقان بشكل طبيعي.", nameEn: "Menthol Extract", descriptionEn: "Provides instant coolness that numbs pain and naturally relieves congestion." },
      { name: "خلاصة الصبّار (الألوفيرا)", description: "يرطب بعمق ويهدئ التهيجات والاحمرار بسرعة فائقة.", nameEn: "Aloe Vera Extract", descriptionEn: "Deeply moisturizes and quickly soothes irritations and redness." },
      { name: "فيتامين E", description: "مضاد أكسدة قوي يساعد في تجديد الخلايا وتسريع التعافي.", nameEn: "Vitamin E", descriptionEn: "A powerful antioxidant that helps regenerate cells and speed up recovery." }
    ]
  },
  {
    id: "NSM-TAB-001",
    sku: "NSM-TAB-001",
    slug: "fiber-vein-tablets",
    name: "أقراص الألياف والأوردة ضد تكرار البواسير",
    nameEn: "Fiber & Vein Tablets",
    description: "أقراص يومية تجمع فكرة الألياف ودعم الأوردة لمن يريد روتيناً يساعد على تقليل الضغط وتكرار الانزعاج المرتبط بالحمام.",
    descriptionEn: "Daily tablets combining fiber and vein support for those wanting a routine to help reduce pressure and recurring discomfort associated with the bathroom.",
    benefits: [
      "يدعم حركة الأمعاء الصحية",
      "يساهم في تحسين الانتفاخ والانزعاج الهضمي",
      "يحتوي على ألياف طبيعية لدعم الشبع",
      "يدعم الدورة الدموية في الأوردة"
    ],
    benefitsEn: [
      "Supports healthy bowel movements",
      "Contributes to improving bloating and digestive discomfort",
      "Contains natural fibers to support satiety",
      "Supports blood circulation in veins"
    ],
    howToUse: "تناول قرصاً إلى قرصين يومياً مع كوب ماء كبير، ويُفضل مع الوجبات. استشر طبيبك قبل البدء.",
    howToUseEn: "Take one to two tablets daily with a large glass of water, preferably with meals. Consult your doctor before starting.",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=800&auto=format&fit=crop"],
    category: "مكملات غذائية",
    categoryEn: "Dietary Supplements",
    painPoints: [
      "إمساك مزمن يزيد من الضغط والألم",
      "انتفاخ وانزعاج هضمي مستمر",
      "ضعف في الدورة الدموية والأوردة",
      "صعوبة في الالتزام بنظام غذائي مليء بالألياف"
    ],
    painPointsEn: [
      "Chronic constipation increasing pressure and pain",
      "Continuous bloating and digestive discomfort",
      "Poor blood circulation and weak veins",
      "Difficulty sticking to a high-fiber diet"
    ],
    emotionalBenefit: "أضف زاوية الدعم اليومي بدل الاعتماد على التهدئة فقط، خصوصاً إذا كانت المشكلة ترجع كل فترة.",
    emotionalBenefitEn: "Add an angle of daily support instead of relying only on soothing, especially if the problem recurs periodically.",
    scienceProof: "يجمع بين الألياف لدعم روتين الحمام ومكونات موجهة لدعم راحة الأوردة ضمن نمط حياة متوازن.",
    sfdaApproved: true,
    ingredientsDetails: [
      { name: "بذور السيلليوم", description: "ألياف طبيعية تلين حركة الأمعاء وتمنع الإمساك المسبب للضغط.", nameEn: "Psyllium Husk", descriptionEn: "Natural fibers that soften bowel movements and prevent pressure-causing constipation." },
      { name: "مستخلص شجرة الغابة", description: "يدعم صحة الأوردة ويحسن الدورة الدموية لتقليل الاحتقان.", nameEn: "Forest Tree Extract", descriptionEn: "Supports vein health and improves blood circulation to reduce congestion." },
      { name: "فيتامين C والزنك", description: "يعززان المناعة ويدعمان التئام الأنسجة المتضررة.", nameEn: "Vitamin C & Zinc", descriptionEn: "Boost immunity and support the healing of damaged tissues." }
    ]
  },
  {
    id: "NSM-WIP-001",
    sku: "NSM-WIP-001",
    slug: "aloe-soothing-wipes",
    name: "مناديل الألوفيرا ضد التهيّج بعد الحمام",
    nameEn: "Aloe Soothing Wipes",
    description: "مناديل ألوفيرا لطيفة للعناية الحساسة بعد الحمام، مصممة لتقليل الاحتكاك والتهيّج مقارنة بالورق الجاف.",
    descriptionEn: "Gentle aloe vera wipes for sensitive care after the bathroom, designed to reduce friction and irritation compared to dry paper.",
    benefits: [
      "تهدئ التهيّج والاحمرار فوراً",
      "تُبقي المنطقة الحساسة نظيفة وجافة",
      "مُعطّرة برائحة خفيفة منعشة",
      "قابلة للتحلل البيولوجي"
    ],
    benefitsEn: [
      "Instantly soothes irritation and redness",
      "Keeps the sensitive area clean and dry",
      "Lightly scented with a refreshing fragrance",
      "Biodegradable"
    ],
    howToUse: "استخدم عوضاً عن الورق بعد الحمام مباشرة. مناسبة للبشرة الحساسة. لا تُستخدم داخلياً.",
    howToUseEn: "Use instead of paper directly after the bathroom. Suitable for sensitive skin. Not for internal use.",
    image: "https://images.unsplash.com/photo-1584824388145-25b41052601c?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1584824388145-25b41052601c?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop"],
    category: "عناية يومية",
    categoryEn: "Daily Care",
    painPoints: [
      "ألم وتهيج عند استخدام الورق الجاف العادي",
      "شعور بعدم النظافة التامة بعد الحمام",
      "تفاقم الالتهاب بسبب الاحتكاك",
      "صعوبة الحفاظ على النظافة خارج المنزل"
    ],
    painPointsEn: [
      "Pain and irritation when using regular dry paper",
      "Feeling of incomplete cleanliness after the bathroom",
      "Exacerbation of inflammation due to friction",
      "Difficulty maintaining hygiene outside the home"
    ],
    emotionalBenefit: "خطوة يومية بسيطة تمنحك إحساساً أنظف وألطف بعد الحمام، خصوصاً وقت التهيّج والحساسية.",
    emotionalBenefitEn: "A simple daily step that gives you a cleaner and gentler feeling after the bathroom, especially during irritation and sensitivity.",
    scienceProof: "تعتمد على الألوفيرا والبابونج كجزء من عناية يومية ألطف للبشرة الحساسة.",
    sfdaApproved: true,
    ingredientsDetails: [
      { name: "مستخلص الألوفيرا", description: "يهدئ البشرة المتهيجة ويوفر طبقة حماية لطيفة.", nameEn: "Aloe Vera Extract", descriptionEn: "Soothes irritated skin and provides a gentle protective layer." },
      { name: "البابونج", description: "مضاد طبيعي للالتهابات يساعد في تخفيف الاحمرار.", nameEn: "Chamomile", descriptionEn: "A natural anti-inflammatory that helps reduce redness." },
      { name: "ماء نقي", description: "ينظف بلطف دون التسبب في أي جفاف أو تهيج.", nameEn: "Purified Water", descriptionEn: "Cleanses gently without causing any dryness or irritation." }
    ]
  }
];

export const OFFERS: Offer[] = [
  {
    qty: 1,
    label: "قطعة واحدة",
    price: 199,
  },
  {
    qty: 2,
    label: "قطعتان",
    price: 279,
    originalPrice: 398,
    badge: "وفّر 119 ريال",
  },
  {
    qty: 3,
    label: "ثلاث قطع",
    price: 349,
    originalPrice: 597,
    badge: "الأكثر توفيراً",
  },
];

export const UPSELL_PRICE = 99;

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductBySku(sku: string): Product | undefined {
  return PRODUCTS.find((p) => p.sku === sku);
}

export function getCrossells(currentSku: string): Product[] {
  return PRODUCTS.filter((p) => p.sku !== currentSku).slice(0, 2);
}

export const BUNDLE_PRICES: Record<number, number> = {
  1: 129,
  2: 199,
  3: 269,
};

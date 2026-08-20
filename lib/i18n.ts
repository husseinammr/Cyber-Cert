export type Locale = "en" | "ar";

export const dictionary = {
  en: {
    dir: "ltr",
    nav: {
      home: "Home",
      free: "Free",
      certifications: "Certifications",
      careerPaths: "Career Paths",
      roadmaps: "Roadmaps",
      graph: "Cert Graph",
      findPath: "Find My Path",
      whatsNext: "What's Next?",
      compare: "Compare",
      startHere: "Start Here",
      bookmarks: "Bookmarks",
    },
    hero: {
      title: "Navigate Your Cybersecurity Career",
      subtitle:
        "A free, permanent, no-login guide to certifications, career paths and roadmaps for beginners through professionals.",
      searchPlaceholder: "Search certifications, careers, skills...",
      ctaPath: "Find My Path",
      ctaStart: "Start Here",
    },
    common: {
      level: "Level",
      category: "Category",
      provider: "Provider",
      free: "Free",
      paid: "Paid",
      practical: "Practical",
      theoretical: "Theoretical",
      both: "Practical + Theoretical",
      viewDetails: "View Details",
      bookmark: "Bookmark",
      bookmarked: "Bookmarked",
      compare: "Add to Compare",
      officialSite: "Official Website",
      priceWarning:
        "Prices and exam details change over time. Always confirm current pricing on the official provider website.",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    },
  },
  ar: {
    dir: "rtl",
    nav: {
      home: "الرئيسية",
      free: "مجاني",
      certifications: "الشهادات",
      careerPaths: "المسارات المهنية",
      roadmaps: "خرائط الطريق",
      graph: "خريطة الشهادات",
      findPath: "اعثر على مسارك",
      whatsNext: "ما التالي؟",
      compare: "قارن",
      startHere: "ابدأ هنا",
      bookmarks: "المحفوظات",
    },
    hero: {
      title: "تصفح مسارك المهني في الأمن السيبراني",
      subtitle:
        "دليل مجاني ودائم بدون تسجيل دخول للشهادات والمسارات المهنية وخرائط الطريق من المبتدئين إلى المحترفين.",
      searchPlaceholder: "ابحث عن شهادات، مسارات، مهارات...",
      ctaPath: "اعثر على مسارك",
      ctaStart: "ابدأ هنا",
    },
    common: {
      level: "المستوى",
      category: "الفئة",
      provider: "الجهة المانحة",
      free: "مجاني",
      paid: "مدفوع",
      practical: "عملي",
      theoretical: "نظري",
      both: "عملي ونظري",
      viewDetails: "عرض التفاصيل",
      bookmark: "حفظ",
      bookmarked: "محفوظ",
      compare: "أضف للمقارنة",
      officialSite: "الموقع الرسمي",
      priceWarning:
        "الأسعار وتفاصيل الاختبار قد تتغير. تحقق دائمًا من السعر الحالي على الموقع الرسمي للجهة المانحة.",
      beginner: "مبتدئ",
      intermediate: "متوسط",
      advanced: "متقدم",
    },
  },
} as const;

export function t(locale: Locale) {
  return dictionary[locale];
}

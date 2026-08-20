import { Category, Level, CostCategory } from "@/lib/types";
import { Locale } from "@/lib/i18n";

export const categoryLabels: Record<Category, { en: string; ar: string }> = {
  "red-team": { en: "Red Team", ar: "الفريق الأحمر" },
  "blue-team": { en: "Blue Team", ar: "الفريق الأزرق" },
  soc: { en: "SOC", ar: "مركز العمليات الأمنية" },
  dfir: { en: "DFIR", ar: "التحقيق الجنائي الرقمي" },
  pentest: { en: "Penetration Testing", ar: "اختبار الاختراق" },
  appsec: { en: "Web/AppSec", ar: "أمن التطبيقات" },
  cloud: { en: "Cloud Security", ar: "أمن السحابة" },
  network: { en: "Network Security", ar: "أمن الشبكات" },
  grc: { en: "GRC", ar: "الحوكمة والمخاطر والامتثال" },
  "threat-hunting": { en: "Threat Hunting", ar: "صيد التهديدات" },
  malware: { en: "Malware Analysis", ar: "تحليل البرمجيات الخبيثة" },
  "security-engineering": { en: "Security Engineering", ar: "هندسة الأمن" },
};

export const levelLabels: Record<Level, { en: string; ar: string }> = {
  beginner: { en: "Beginner", ar: "مبتدئ" },
  intermediate: { en: "Intermediate", ar: "متوسط" },
  advanced: { en: "Advanced", ar: "متقدم" },
};

export const costLabels: Record<CostCategory, { en: string; ar: string }> = {
  free: { en: "Free", ar: "مجاني" },
  "free-course-paid-exam": { en: "Free Course + Paid Exam", ar: "دورة مجانية + اختبار مدفوع" },
  paid: { en: "Paid", ar: "مدفوع" },
};

export function label(map: Record<string, { en: string; ar: string }>, key: string, locale: Locale) {
  return map[key]?.[locale] ?? key;
}

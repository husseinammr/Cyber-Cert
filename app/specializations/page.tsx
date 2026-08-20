"use client";

import Link from "next/link";
import { specializations, toneClasses } from "@/data/specializations";
import { useApp } from "@/lib/app-context";

export default function SpecializationsPage() {
  const { locale } = useApp();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">{locale === "ar" ? "اختر تخصصك" : "Choose Your Specialization"}</h1>
      <p className="text-slate-400 mb-8 max-w-2xl">
        {locale === "ar"
          ? "بعد إتقان الأساسيات، اختر الاتجاه الذي يناسب اهتماماتك. كل تخصص يعرض المهارات والأدوات والشهادات والمسار المهني الكامل."
          : "Once you've mastered the fundamentals, pick the direction that fits your interests. Each specialization shows skills, tools, certifications, and the full career path."}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {specializations.map((s) => {
          const tone = toneClasses[s.colorTone];
          return (
            <Link key={s.slug} href={`/specializations/${s.slug}`} className={`glass rounded-xl p-5 border ${tone.border} hover:brightness-110 transition-all flex flex-col gap-3`}>
              <span className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl border ${tone.border} ${tone.bg}`}>{s.icon}</span>
              <h2 className="font-semibold text-slate-100">{locale === "ar" ? s.nameAr : s.name}</h2>
              <p className="text-sm text-slate-400 line-clamp-3">{locale === "ar" ? s.summaryAr : s.summary}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

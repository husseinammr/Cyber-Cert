"use client";

import { useMemo, useState } from "react";
import { freeResources } from "@/data/free-resources";
import { useApp } from "@/lib/app-context";
import { Badge } from "@/components/Badge";

const typeMeta: Record<string, { en: string; ar: string; tone: "green" | "cyan" | "purple" | "amber" | "default" }> = {
  "free-cert": { en: "Completely Free Certification", ar: "شهادة مجانية بالكامل", tone: "green" },
  "free-course": { en: "Free Course", ar: "دورة مجانية", tone: "cyan" },
  "free-training": { en: "Free Training", ar: "تدريب مجاني", tone: "cyan" },
  "free-lab": { en: "Free Lab", ar: "مختبر مجاني", tone: "purple" },
  "free-badge": { en: "Free Certificate / Badge", ar: "شهادة/شارة مجانية", tone: "green" },
  "free-course-paid-exam": { en: "Free Course + Paid Exam", ar: "دورة مجانية + اختبار مدفوع", tone: "amber" },
};

export default function FreePage() {
  const { locale, dict } = useApp();
  const [type, setType] = useState<string>("all");
  const types = Object.keys(typeMeta);

  const filtered = useMemo(() => (type === "all" ? freeResources : freeResources.filter((r) => r.type === type)), [type]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">{dict.nav.free}</h1>
      <p className="text-slate-400 mb-6 max-w-2xl">
        {locale === "ar"
          ? "نميز بوضوح بين الشهادات المجانية بالكامل، الدورات المجانية، التدريب المجاني، المختبرات المجانية، الشارات المجانية، والدورات المجانية مع اختبار مدفوع. لن نصف أي شيء بأنه مجاني بالكامل إن لم يكن كذلك."
          : "We clearly separate completely free certifications, free courses, free training, free labs, free badges, and free courses with a paid exam. Nothing is ever mislabeled as fully free."}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setType("all")} className={`px-3 py-1.5 rounded-full text-sm border ${type === "all" ? "border-cyber-cyan text-cyber-cyan" : "border-cyber-border text-slate-400"}`}>
          {locale === "ar" ? "الكل" : "All"}
        </button>
        {types.map((t) => (
          <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-full text-sm border ${type === t ? "border-cyber-cyan text-cyber-cyan" : "border-cyber-border text-slate-400"}`}>
            {typeMeta[t][locale]}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((r) => (
          <a key={r.slug} href={r.url} target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-5 border border-cyber-border hover:border-cyber-cyan/40 transition-colors flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-slate-100">{r.name}</span>
            </div>
            <span className="text-xs text-slate-500">{r.provider}</span>
            <Badge tone={typeMeta[r.type].tone}>{typeMeta[r.type][locale]}</Badge>
            <p className="text-sm text-slate-400 line-clamp-4">{r.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

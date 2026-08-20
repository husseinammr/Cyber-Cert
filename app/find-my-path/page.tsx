"use client";

import { useState } from "react";
import Link from "next/link";
import { careerPaths } from "@/data/career-paths";
import { certifications } from "@/data/certifications";
import { useApp } from "@/lib/app-context";
import { Category, Level } from "@/lib/types";

const fieldToCategories: Record<string, Category[]> = {
  soc: ["soc", "blue-team"],
  offensive: ["pentest", "red-team"],
  cloud: ["cloud"],
  dfir: ["dfir", "malware"],
  appsec: ["appsec"],
  grc: ["grc"],
  "not-sure": ["soc", "network"],
};

export default function FindMyPathPage() {
  const { locale, dict } = useApp();
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState<Level>("beginner");
  const [field, setField] = useState<keyof typeof fieldToCategories>("not-sure");
  const [budget, setBudget] = useState<"free" | "low" | "any">("free");
  const [time, setTime] = useState<"low" | "medium" | "high">("medium");

  const steps = [
    {
      q: locale === "ar" ? "ما هو مستواك الحالي؟" : "What's your current level?",
      render: () => (
        <Options
          value={level}
          onChange={(v) => setLevel(v as Level)}
          options={[
            { v: "beginner", l: dict.common.beginner },
            { v: "intermediate", l: dict.common.intermediate },
            { v: "advanced", l: dict.common.advanced },
          ]}
        />
      ),
    },
    {
      q: locale === "ar" ? "ما المجال الذي يثير اهتمامك؟" : "Which field interests you most?",
      render: () => (
        <Options
          value={field}
          onChange={(v) => setField(v as any)}
          options={[
            { v: "soc", l: locale === "ar" ? "SOC / الفريق الأزرق" : "SOC / Blue Team" },
            { v: "offensive", l: locale === "ar" ? "اختبار الاختراق / الفريق الأحمر" : "Pentesting / Red Team" },
            { v: "cloud", l: locale === "ar" ? "أمن السحابة" : "Cloud Security" },
            { v: "dfir", l: "DFIR / Malware" },
            { v: "appsec", l: "AppSec" },
            { v: "grc", l: "GRC" },
            { v: "not-sure", l: locale === "ar" ? "لست متأكدًا بعد" : "Not sure yet" },
          ]}
        />
      ),
    },
    {
      q: locale === "ar" ? "ما هي ميزانيتك؟" : "What's your budget?",
      render: () => (
        <Options
          value={budget}
          onChange={(v) => setBudget(v as any)}
          options={[
            { v: "free", l: locale === "ar" ? "مجاني فقط" : "Free only" },
            { v: "low", l: locale === "ar" ? "منخفض" : "Low budget" },
            { v: "any", l: locale === "ar" ? "أي ميزانية" : "Any budget" },
          ]}
        />
      ),
    },
    {
      q: locale === "ar" ? "كم ساعة أسبوعيًا يمكنك التخصيص للدراسة؟" : "How many hours per week can you study?",
      render: () => (
        <Options
          value={time}
          onChange={(v) => setTime(v as any)}
          options={[
            { v: "low", l: "< 5" },
            { v: "medium", l: "5–15" },
            { v: "high", l: "15+" },
          ]}
        />
      ),
    },
  ];

  if (step >= steps.length) {
    const wantedCats = fieldToCategories[field];
    const matchedPaths = careerPaths.filter((p) => {
      const pathCerts = certifications.filter((c) => p.certifications.includes(c.slug));
      return pathCerts.some((c) => c.category.some((cat) => wantedCats.includes(cat)));
    });

    let recommendedCerts = certifications.filter((c) => c.category.some((cat) => wantedCats.includes(cat)));
    if (level === "beginner") recommendedCerts = recommendedCerts.filter((c) => c.level !== "advanced");
    if (level === "advanced") recommendedCerts = recommendedCerts.filter((c) => c.level !== "beginner");
    if (budget === "free") recommendedCerts = recommendedCerts.filter((c) => c.costCategory === "free-course-paid-exam");
    recommendedCerts = recommendedCerts.slice(0, 6);

    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6">{locale === "ar" ? "مسارك المقترح" : "Your Suggested Path"}</h1>

        {matchedPaths.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-3">{locale === "ar" ? "المسارات المهنية المقترحة" : "Suggested Career Paths"}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {matchedPaths.slice(0, 4).map((p) => (
                <Link key={p.slug} href={`/career-paths/${p.slug}`} className="glass rounded-xl p-4 border border-cyber-border hover:border-cyber-cyan/40">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-slate-400 line-clamp-2">{p.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-3">{locale === "ar" ? "الشهادات المقترحة" : "Suggested Certifications"}</h2>
          {recommendedCerts.length === 0 ? (
            <p className="text-slate-500">
              {locale === "ar" ? "لا توجد نتائج مطابقة تمامًا — جرّب توسيع الميزانية أو المستوى." : "No exact matches — try widening your budget or level."}
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {recommendedCerts.map((c) => (
                <Link key={c.slug} href={`/certifications/${c.slug}`} className="glass rounded-xl p-4 border border-cyber-border hover:border-cyber-cyan/40">
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="text-xs text-slate-500 mb-1">{c.provider}</p>
                  <p className="text-sm text-slate-400 line-clamp-2">{c.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button onClick={() => setStep(0)} className="px-4 py-2 rounded-lg border border-cyber-border text-slate-300">
            {locale === "ar" ? "ابدأ من جديد" : "Start over"}
          </button>
          <Link href="/roadmaps" className="px-4 py-2 rounded-lg bg-cyber-cyan text-cyber-bg font-semibold">
            {locale === "ar" ? "استكشف خرائط الطريق" : "Explore Roadmaps"}
          </Link>
        </div>
      </div>
    );
  }

  const current = steps[step];

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-6 flex gap-1.5">
        {steps.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-cyber-cyan" : "bg-white/10"}`} />
        ))}
      </div>
      <h1 className="text-2xl font-bold mb-8">{current.q}</h1>
      {current.render()}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-4 py-2 rounded-lg border border-cyber-border text-slate-300 disabled:opacity-30"
        >
          {locale === "ar" ? "السابق" : "Back"}
        </button>
        <button onClick={() => setStep((s) => s + 1)} className="px-5 py-2 rounded-lg bg-cyber-cyan text-cyber-bg font-semibold">
          {step === steps.length - 1 ? (locale === "ar" ? "عرض النتائج" : "See Results") : locale === "ar" ? "التالي" : "Next"}
        </button>
      </div>
    </div>
  );
}

function Options({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { v: string; l: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {options.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={`px-4 py-3 rounded-lg border text-left transition-colors ${
            value === o.v ? "border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan" : "border-cyber-border text-slate-300 hover:border-slate-500"
          }`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

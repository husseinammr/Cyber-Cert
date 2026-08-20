"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { foundationStageBySlug, foundationStages } from "@/data/foundation";
import { freeResources } from "@/data/free-resources";
import { specializations, toneClasses } from "@/data/specializations";
import { useApp } from "@/lib/app-context";
import { storage } from "@/lib/storage";

export default function FoundationStagePage() {
  const params = useParams<{ stage: string }>();
  const stage = foundationStageBySlug(params.stage);
  const { locale } = useApp();
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    setDone(storage.getProgress()["foundation-framework"] || []);
  }, []);

  if (!stage) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Stage not found</h1>
        <Link href="/start-here" className="text-cyber-cyan hover:underline">← Back to Start Here</Link>
      </div>
    );
  }

  const isDone = done.includes(stage.slug);
  const resources = freeResources.filter((r) => stage.freeResources.includes(r.slug));
  const isSpecializationStage = stage.slug === "specialization" || stage.order === foundationStages.length;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Stage progress bar */}
      <div className="flex items-center gap-1.5 mb-6">
        {foundationStages.map((s) => (
          <div key={s.slug} className={`h-1.5 flex-1 rounded-full ${s.order <= stage.order ? "bg-cyber-cyan" : "bg-white/10"}`} />
        ))}
      </div>

      <div className="flex items-center gap-3 mb-2">
        <span className="w-10 h-10 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan flex items-center justify-center font-bold text-sm">
          {String(stage.order).padStart(2, "0")}
        </span>
        <span className="text-xs uppercase tracking-widest text-slate-500">
          {locale === "ar" ? "المرحلة" : "Stage"} {stage.order} / {foundationStages.length}
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-2">{locale === "ar" ? stage.titleAr : stage.title}</h1>
      <p className="text-lg text-slate-400 mb-6">{locale === "ar" ? stage.taglineAr : stage.tagline}</p>
      <p className="text-slate-300 leading-relaxed mb-10">{locale === "ar" ? stage.introAr : stage.intro}</p>

      {/* Topics */}
      <Section title={locale === "ar" ? "المفاهيم التي ستغطيها" : "What You'll Cover"}>
        <div className="grid sm:grid-cols-2 gap-4">
          {stage.topics.map((group) => (
            <div key={group.group} className="glass rounded-lg p-4 border border-cyber-border">
              <h3 className="text-sm font-semibold text-cyber-cyan mb-2">{locale === "ar" ? group.groupAr : group.group}</h3>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-slate-300 before:content-['▹_'] before:text-slate-500">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Deep concepts: CONCEPT -> WHY -> RELEVANCE */}
      {stage.concepts.length > 0 && (
        <Section title={locale === "ar" ? "مفاهيم رئيسية بالعمق" : "Key Concepts in Depth"}>
          <div className="space-y-4">
            {stage.concepts.map((c) => (
              <div key={c.term} className="glass rounded-lg p-5 border border-cyber-border">
                <h3 className="font-semibold text-slate-100 mb-3">{c.term}</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">{locale === "ar" ? "لماذا يهم؟" : "Why It Matters"}</p>
                    <p className="text-slate-300">{locale === "ar" ? c.whyAr : c.why}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-cyber-cyan mb-1">{locale === "ar" ? "الصلة بالأمن السيبراني" : "Cybersecurity Relevance"}</p>
                    <p className="text-slate-300">{locale === "ar" ? c.relevanceAr : c.relevance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title={locale === "ar" ? "لماذا يهم هذا في الأمن السيبراني" : "Why This Matters in Cybersecurity"}>
        <p className="text-slate-300 leading-relaxed">{locale === "ar" ? stage.whyMattersAr : stage.whyMatters}</p>
      </Section>

      <Section title={locale === "ar" ? "أنت جاهز للمرحلة التالية عندما..." : "You're Ready for the Next Stage When..."}>
        <ul className="space-y-2">
          {(locale === "ar" ? stage.readyWhenAr : stage.readyWhen).map((r) => (
            <li key={r} className="flex gap-2 text-sm text-slate-300">
              <span className="text-emerald-400">✓</span>
              {r}
            </li>
          ))}
        </ul>
      </Section>

      {resources.length > 0 && (
        <Section title={locale === "ar" ? "مصادر مجانية موصى بها" : "Recommended Free Resources"}>
          <div className="flex flex-wrap gap-2">
            {resources.map((r) => (
              <a key={r.slug} href={r.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-md border border-cyber-border text-sm text-slate-300 hover:border-cyber-cyan hover:text-cyber-cyan">
                {r.name} ↗
              </a>
            ))}
          </div>
        </Section>
      )}

      <Section title={locale === "ar" ? "تمارين عملية موصى بها" : "Recommended Practical Exercises"}>
        <ol className="space-y-2">
          {(locale === "ar" ? stage.practiceAr : stage.practice).map((p, i) => (
            <li key={p} className="flex gap-3 text-sm text-slate-300">
              <span className="shrink-0 w-6 h-6 rounded-full bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 flex items-center justify-center text-xs">{i + 1}</span>
              {p}
            </li>
          ))}
        </ol>
      </Section>

      <Section title={locale === "ar" ? "أخطاء شائعة للمبتدئين" : "Common Beginner Mistakes"}>
        <ul className="space-y-2">
          {(locale === "ar" ? stage.mistakesAr : stage.mistakes).map((m) => (
            <li key={m} className="flex gap-2 text-sm text-slate-300">
              <span className="text-red-400">✕</span>
              {m}
            </li>
          ))}
        </ul>
      </Section>

      {/* Specialization preview if this is the last stage */}
      {isSpecializationStage && (
        <Section title={locale === "ar" ? "اختر تخصصك التالي" : "Choose Your Next Specialization"}>
          <div className="grid sm:grid-cols-3 gap-3">
            {specializations.map((s) => {
              const tone = toneClasses[s.colorTone];
              return (
                <Link key={s.slug} href={`/specializations/${s.slug}`} className={`rounded-lg p-3 border ${tone.border} ${tone.bg} hover:brightness-125 transition-all flex items-center gap-2`}>
                  <span className="text-lg">{s.icon}</span>
                  <span className={`text-sm font-medium ${tone.text}`}>{locale === "ar" ? s.nameAr : s.name}</span>
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-cyber-border">
        <button
          onClick={() => setDone(storage.toggleStep("foundation-framework", stage.slug)["foundation-framework"] || [])}
          className={`px-4 py-2 rounded-lg border text-sm font-medium ${
            isDone ? "border-cyber-cyan text-cyber-cyan bg-cyber-cyan/10" : "border-cyber-border text-slate-300"
          }`}
        >
          {isDone ? (locale === "ar" ? "✓ تم إكمال هذه المرحلة" : "✓ Stage Completed") : locale === "ar" ? "وضع علامة كمكتمل" : "Mark as Complete"}
        </button>

        {stage.nextStageSlug && !isSpecializationStage && (
          <Link href={`/start-here/${stage.nextStageSlug}`} className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg font-semibold text-sm">
            {locale === "ar" ? "متابعة إلى المرحلة التالية" : "Continue to Next Stage"} →
          </Link>
        )}
        <Link href="/start-here" className="px-4 py-2 rounded-lg border border-cyber-border text-slate-300 text-sm">
          {locale === "ar" ? "عرض الإطار الكامل" : "View Full Framework"}
        </Link>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold mb-3 text-slate-100">{title}</h2>
      {children}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { foundationStages } from "@/data/foundation";
import { specializations } from "@/data/specializations";
import { useApp } from "@/lib/app-context";
import { storage } from "@/lib/storage";
import { toneClasses } from "@/data/specializations";

export default function StartHerePage() {
  const { locale, dict } = useApp();
  const [progress, setProgress] = useState<string[]>([]);

  useEffect(() => {
    setProgress(storage.getProgress()["foundation-framework"] || []);
  }, []);

  const isDone = (slug: string) => progress.includes(slug);
  const completedCount = foundationStages.filter((s) => isDone(s.slug)).length;
  const pct = Math.round((completedCount / foundationStages.length) * 100);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <span className="text-xs tracking-widest uppercase text-cyber-cyan/80 border border-cyber-cyan/30 rounded-full px-3 py-1">
        {locale === "ar" ? "ابدأ من هنا" : "Start Here"}
      </span>
      <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-3">
        {locale === "ar" ? "إطار عمل أساسيات الأمن السيبراني" : "The Cybersecurity Foundation Framework"}
      </h1>
      <p className="text-slate-400 max-w-2xl mb-6">
        {locale === "ar"
          ? "قبل التخصص في أي مجال، اجتز هذه المراحل الست بالترتيب. كل مرحلة تفتح صفحة تعليمية تفصيلية بمفاهيمها ومواردها المجانية وتمارينها العملية."
          : "Before specializing in any field, work through these six stages in order. Each stage opens a detailed learning page with its concepts, free resources, and hands-on exercises."}
      </p>

      <div className="mb-10">
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-purple transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-sm text-slate-500 mt-2">
          {pct}% {locale === "ar" ? "مكتمل" : "complete"} — {locale === "ar" ? "يُحفظ في متصفحك فقط" : "saved in your browser only"}
        </p>
      </div>

      <div className="relative">
        <div className="glass border border-cyber-border rounded-2xl p-6 sm:p-10">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full border border-cyber-cyan/40 text-cyber-cyan text-sm font-semibold tracking-wide">
              {locale === "ar" ? "الأساس" : "FOUNDATION"}
            </span>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-cyber-cyan/50 via-cyber-border to-cyber-purple/50 hidden sm:block" />

            <div className="w-full flex flex-col gap-4">
              {foundationStages.map((stage) => (
                <div key={stage.slug} className="flex items-stretch gap-4 sm:gap-6 relative">
                  <div className="hidden sm:flex flex-col items-center w-6 shrink-0">
                    <div className={`w-3 h-3 rounded-full border-2 mt-6 z-10 ${isDone(stage.slug) ? "bg-cyber-cyan border-cyber-cyan" : "bg-cyber-bg border-cyber-border"}`} />
                  </div>
                  <Link
                    href={`/start-here/${stage.slug}`}
                    className={`flex-1 glass rounded-xl p-5 border transition-colors flex items-center gap-4 hover:border-cyber-cyan/50 ${
                      isDone(stage.slug) ? "border-cyber-cyan/40" : "border-cyber-border"
                    }`}
                  >
                    <span
                      className={`shrink-0 w-11 h-11 rounded-lg flex items-center justify-center font-bold text-sm border ${
                        isDone(stage.slug) ? "bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan" : "bg-white/5 border-cyber-border text-slate-400"
                      }`}
                    >
                      {isDone(stage.slug) ? "✓" : String(stage.order).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-100">{locale === "ar" ? stage.titleAr : stage.title}</p>
                      <p className="text-sm text-slate-400 line-clamp-1">{locale === "ar" ? stage.taglineAr : stage.tagline}</p>
                    </div>
                    <span className="text-slate-500 shrink-0">→</span>
                  </Link>
                </div>
              ))}
            </div>

            <div className="h-8 w-px bg-gradient-to-b from-cyber-border to-cyber-purple/50 my-2" />

            <div className="w-full">
              <div className="text-center mb-5">
                <span className="inline-block px-4 py-1.5 rounded-full border border-cyber-purple/40 text-cyber-purple text-sm font-semibold tracking-wide">
                  06 — {locale === "ar" ? "اختر تخصصك" : "SPECIALIZATION"}
                </span>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {specializations.map((s) => {
                  const tone = toneClasses[s.colorTone];
                  return (
                    <Link
                      key={s.slug}
                      href={`/specializations/${s.slug}`}
                      className={`rounded-lg p-3 border ${tone.border} ${tone.bg} hover:brightness-125 transition-all flex items-center gap-2`}
                    >
                      <span className="text-lg">{s.icon}</span>
                      <span className={`text-sm font-medium ${tone.text}`}>{locale === "ar" ? s.nameAr : s.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href={`/start-here/${foundationStages[0].slug}`} className="px-5 py-3 rounded-lg bg-cyber-cyan text-cyber-bg font-semibold">
          {locale === "ar" ? "ابدأ بالمرحلة الأولى" : "Begin Stage 01"}
        </Link>
        <Link href="/find-my-path" className="px-5 py-3 rounded-lg border border-cyber-border text-slate-200">
          {dict.hero.ctaPath}
        </Link>
      </div>
    </div>
  );
}

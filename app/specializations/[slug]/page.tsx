"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { specializationBySlug, toneClasses } from "@/data/specializations";
import { certBySlug } from "@/data/certifications";
import { freeResources } from "@/data/free-resources";
import { useApp } from "@/lib/app-context";

export default function SpecializationDetailPage() {
  const params = useParams<{ slug: string }>();
  const spec = specializationBySlug(params.slug);
  const { locale, dict } = useApp();

  if (!spec) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Specialization not found</h1>
        <Link href="/start-here" className="text-cyber-cyan hover:underline">← Back to Start Here</Link>
      </div>
    );
  }

  const tone = toneClasses[spec.colorTone];
  const beginner = spec.beginnerCerts.map(certBySlug).filter(Boolean);
  const intermediate = spec.intermediateCerts.map(certBySlug).filter(Boolean);
  const advanced = spec.advancedCerts.map(certBySlug).filter(Boolean);
  const labs = freeResources.filter((r) => spec.labs.includes(r.slug));

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className={`flex items-center gap-3 mb-4`}>
        <span className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border ${tone.border} ${tone.bg}`}>{spec.icon}</span>
        <div>
          <h1 className="text-3xl font-bold">{locale === "ar" ? spec.nameAr : spec.name}</h1>
        </div>
      </div>
      <p className="text-slate-300 leading-relaxed max-w-2xl mb-8">{locale === "ar" ? spec.summaryAr : spec.summary}</p>

      <div className="glass rounded-xl p-5 border border-cyber-border mb-10">
        <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
          {locale === "ar" ? "مناسب لمن" : "Who May Enjoy This"}
        </p>
        <p className="text-slate-300 text-sm">{locale === "ar" ? spec.whoEnjoysAr : spec.whoEnjoys}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-lg font-semibold mb-3">{locale === "ar" ? "المهارات المطلوبة" : "Required Skills"}</h2>
          <div className="flex flex-wrap gap-2">
            {spec.skills.map((s) => (
              <span key={s} className="px-2.5 py-1 rounded-full text-xs border border-cyber-border text-slate-300">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3">{locale === "ar" ? "الأدوات الشائعة" : "Common Tools"}</h2>
          <div className="flex flex-wrap gap-2">
            {spec.tools.map((s) => (
              <span key={s} className="px-2.5 py-1 rounded-full text-xs border border-cyber-border text-slate-300">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications by level */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">{locale === "ar" ? "الشهادات حسب المستوى" : "Certifications by Level"}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <CertLevelBlock label={dict.common.beginner} certs={beginner} tone="green" locale={locale} />
          <CertLevelBlock label={dict.common.intermediate} certs={intermediate} tone="amber" locale={locale} />
          <CertLevelBlock label={dict.common.advanced} certs={advanced} tone="purple" locale={locale} />
        </div>
      </div>

      {labs.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-3">{locale === "ar" ? "مختبرات موصى بها" : "Recommended Labs"}</h2>
          <div className="flex flex-wrap gap-2">
            {labs.map((l) => (
              <a key={l.slug} href={l.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-md border border-cyber-border text-sm text-slate-300 hover:border-cyber-cyan hover:text-cyber-cyan">
                {l.name} ↗
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-3">{locale === "ar" ? "إمكانيات مهنية" : "Career Possibilities"}</h2>
        <div className="flex flex-wrap items-center gap-2">
          {(locale === "ar" ? spec.careersAr : spec.careers).map((c, i, arr) => (
            <span key={c} className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full text-sm glass border border-cyber-border">{c}</span>
              {i < arr.length - 1 && <span className="text-slate-600">→</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-cyber-border">
        <Link href={`/career-paths/${spec.careerPathSlug}`} className="px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-bg font-semibold text-sm">
          {locale === "ar" ? "استكشف هذا المسار" : "Explore This Path"} →
        </Link>
        {spec.roadmapSlug && (
          <Link href={`/roadmaps/${spec.roadmapSlug}`} className="px-5 py-2.5 rounded-lg border border-cyber-border text-slate-200 text-sm">
            {locale === "ar" ? "عرض خارطة الطريق التفاعلية" : "View Interactive Roadmap"}
          </Link>
        )}
      </div>
    </div>
  );
}

function CertLevelBlock({ label, certs, tone, locale }: { label: string; certs: any[]; tone: "green" | "amber" | "purple"; locale: string }) {
  const toneClass = { green: "text-emerald-300", amber: "text-amber-300", purple: "text-purple-300" }[tone];
  return (
    <div className="glass rounded-lg p-4 border border-cyber-border">
      <p className={`text-xs uppercase tracking-wide mb-2 ${toneClass}`}>{label}</p>
      {certs.length === 0 ? (
        <p className="text-xs text-slate-500">{locale === "ar" ? "لا توجد بعد" : "None yet"}</p>
      ) : (
        <ul className="space-y-1.5">
          {certs.map((c) => (
            <li key={c.slug}>
              <Link href={`/certifications/${c.slug}`} className="text-sm text-slate-300 hover:text-cyber-cyan">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

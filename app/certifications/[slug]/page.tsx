"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { certBySlug, certifications } from "@/data/certifications";
import { useApp } from "@/lib/app-context";
import { categoryLabels, levelLabels, costLabels, label } from "@/lib/labels";
import { Badge } from "@/components/Badge";
import { storage } from "@/lib/storage";

export default function CertDetailPage() {
  const params = useParams<{ slug: string }>();
  const cert = certBySlug(params.slug);
  const { locale, dict } = useApp();
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (cert) {
      storage.addRecent(cert.slug);
      setBookmarked(storage.getBookmarks().includes(cert.slug));
    }
  }, [cert]);

  if (!cert) return <NotFoundBlock />;

  const related = certifications.filter((c) => cert.relatedCerts.includes(c.slug));
  const next = certifications.filter((c) => cert.nextCerts.includes(c.slug));

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl font-bold">{cert.name}</h1>
        <button
          onClick={() => setBookmarked(storage.toggleBookmark(cert.slug).includes(cert.slug))}
          className={`shrink-0 text-2xl ${bookmarked ? "text-cyber-cyan" : "text-slate-500 hover:text-slate-300"}`}
          aria-label="bookmark"
        >
          {bookmarked ? "★" : "☆"}
        </button>
      </div>
      <p className="text-slate-400 mb-4">{cert.provider}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        <Badge tone="green">{dict.common.level}: {label(levelLabels, cert.level, locale)}</Badge>
        <Badge tone="cyan">{label(costLabels, cert.costCategory, locale)}</Badge>
        <Badge>{cert.examType.replace(/-/g, " ")}</Badge>
        {cert.category.map((c) => (
          <Badge key={c}>{label(categoryLabels, c, locale)}</Badge>
        ))}
      </div>

      <a
        href={cert.officialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-cyan text-cyber-bg font-semibold mb-8"
      >
        {dict.common.officialSite} ↗
      </a>

      <div className="glass border border-amber-500/30 bg-amber-500/5 rounded-lg p-4 mb-8 text-sm text-amber-300">
        ⚠ {dict.common.priceWarning}
      </div>

      <Section title={locale === "ar" ? "الوصف" : "Description"}>
        <p className="text-slate-300 leading-relaxed">{cert.description}</p>
      </Section>

      <Section title={locale === "ar" ? "المهارات المكتسبة" : "Skills Covered"}>
        <ul className="grid sm:grid-cols-2 gap-2">
          {cert.skills.map((s) => (
            <li key={s} className="text-slate-300 text-sm before:content-['▹_'] before:text-cyber-cyan">{s}</li>
          ))}
        </ul>
      </Section>

      <Section title={locale === "ar" ? "المتطلبات المسبقة" : "Prerequisites"}>
        <ul className="space-y-1">
          {cert.prerequisites.map((p) => (
            <li key={p} className="text-slate-300 text-sm before:content-['▹_'] before:text-cyber-cyan">{p}</li>
          ))}
        </ul>
      </Section>

      <div className="grid sm:grid-cols-2 gap-8">
        <Section title={locale === "ar" ? "من يجب أن يأخذها" : "Who Should Take This"}>
          <ul className="space-y-1">
            {cert.whoShouldTake.map((p) => (
              <li key={p} className="text-slate-300 text-sm before:content-['✓_'] before:text-emerald-400">{p}</li>
            ))}
          </ul>
        </Section>
        <Section title={locale === "ar" ? "من لا يجب أن يأخذها بعد" : "Who Should NOT Take This Yet"}>
          <ul className="space-y-1">
            {cert.whoShouldNotTake.map((p) => (
              <li key={p} className="text-slate-300 text-sm before:content-['✕_'] before:text-red-400">{p}</li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title={locale === "ar" ? "خارطة طريق التحضير" : "Preparation Roadmap"}>
        <ol className="space-y-2">
          {cert.prepRoadmap.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm text-slate-300">
              <span className="shrink-0 w-6 h-6 rounded-full bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 flex items-center justify-center text-xs">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </Section>

      {related.length > 0 && (
        <Section title={locale === "ar" ? "شهادات ذات صلة" : "Related Certifications"}>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link key={r.slug} href={`/certifications/${r.slug}`} className="px-3 py-1.5 rounded-md border border-cyber-border text-sm text-slate-300 hover:border-cyber-cyan hover:text-cyber-cyan">
                {r.name}
              </Link>
            ))}
          </div>
        </Section>
      )}

      {next.length > 0 && (
        <Section title={locale === "ar" ? "الشهادات التالية" : "Next Certifications"}>
          <div className="flex flex-wrap gap-2">
            {next.map((r) => (
              <Link key={r.slug} href={`/certifications/${r.slug}`} className="px-3 py-1.5 rounded-md border border-cyber-border text-sm text-slate-300 hover:border-cyber-cyan hover:text-cyber-cyan">
                {r.name}
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-3 text-slate-100">{title}</h2>
      {children}
    </div>
  );
}

function NotFoundBlock() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold mb-4">Certification not found</h1>
      <Link href="/certifications" className="text-cyber-cyan hover:underline">← Back to Certifications</Link>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { roadmapBySlug } from "@/data/roadmaps";
import { certBySlug } from "@/data/certifications";
import { useApp } from "@/lib/app-context";
import { storage } from "@/lib/storage";
import { RoadmapStep } from "@/lib/types";

export default function RoadmapDetail() {
  const params = useParams<{ slug: string }>();
  const roadmap = roadmapBySlug(params.slug);
  const { locale } = useApp();
  const [done, setDone] = useState<string[]>([]);
  const [selected, setSelected] = useState<RoadmapStep | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    if (roadmap) setDone(storage.getProgress()[roadmap.slug] || []);
  }, [roadmap]);

  const flatOrder = useMemo(() => (roadmap ? roadmap.steps.map((s) => s.title) : []), [roadmap]);

  if (!roadmap) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Roadmap not found</h1>
        <Link href="/roadmaps" className="text-cyber-cyan hover:underline">← Back</Link>
      </div>
    );
  }

  const progressPct = Math.round((done.length / roadmap.steps.length) * 100);
  const isDone = (title: string) => done.includes(title);
  const toggle = (title: string) => setDone(storage.toggleStep(roadmap.slug, title)[roadmap.slug] || []);

  const openNode = (step: RoadmapStep) => {
    setSelected(step);
    setSelectedIndex(flatOrder.indexOf(step.title));
  };

  const priorTitle = selectedIndex > 0 ? flatOrder[selectedIndex - 1] : null;
  const nextTitle = selectedIndex >= 0 && selectedIndex < flatOrder.length - 1 ? flatOrder[selectedIndex + 1] : null;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-1">{locale === "ar" && roadmap.nameAr ? roadmap.nameAr : roadmap.name}</h1>
      <p className="text-sm text-slate-500 mb-6">
        {locale === "ar" ? "إطار عمل تفاعلي — اضغط أي عقدة لعرض تفاصيلها" : "An interactive framework — click any node to see its details"}
      </p>

      <div className="mb-10">
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-purple transition-all" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="text-sm text-slate-500 mt-2">{progressPct}% {locale === "ar" ? "مكتمل — يُحفظ في متصفحك فقط" : "complete — saved in your browser only"}</p>
      </div>

      {/* The connected framework */}
      <div className="glass border border-cyber-border rounded-2xl p-5 sm:p-8 mb-8">
        <div className="flex flex-col items-center">
          {roadmap.flow.map((row, i) => {
            const isLast = i === roadmap.flow.length - 1;
            if (Array.isArray(row)) {
              return (
                <div key={i} className="w-full flex flex-col items-center">
                  <Connector />
                  <div className="w-full grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                    {row.map((step) => (
                      <Node
                        key={step.title}
                        step={step}
                        done={isDone(step.title)}
                        active={selected?.title === step.title}
                        onClick={() => openNode(step)}
                        onToggle={() => toggle(step.title)}
                        locale={locale}
                        compact
                      />
                    ))}
                  </div>
                  {!isLast && <Connector />}
                </div>
              );
            }
            return (
              <div key={row.title} className="w-full flex flex-col items-center">
                {i > 0 && <Connector />}
                <div className="w-full max-w-md">
                  <Node
                    step={row}
                    done={isDone(row.title)}
                    active={selected?.title === row.title}
                    onClick={() => openNode(row)}
                    onToggle={() => toggle(row.title)}
                    locale={locale}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node detail panel */}
      {selected && (
        <div className="glass border border-cyber-cyan/40 rounded-xl p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h2 className="text-xl font-bold text-slate-100">{locale === "ar" && selected.titleAr ? selected.titleAr : selected.title}</h2>
            <button
              onClick={() => toggle(selected.title)}
              className={`shrink-0 text-sm px-3 py-1.5 rounded-md border ${
                isDone(selected.title) ? "border-cyber-cyan text-cyber-cyan bg-cyber-cyan/10" : "border-cyber-border text-slate-300"
              }`}
            >
              {isDone(selected.title) ? "✓ " + (locale === "ar" ? "مكتمل" : "Done") : locale === "ar" ? "وضع علامة كمكتمل" : "Mark complete"}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
            <InfoBlock label={locale === "ar" ? "أين أنا؟" : "Where Am I?"} value={`${locale === "ar" ? roadmap.nameAr ?? roadmap.name : roadmap.name} — ${locale === "ar" ? "المرحلة" : "Stage"} ${selectedIndex + 1}/${flatOrder.length}`} />
            <InfoBlock label={locale === "ar" ? "لماذا أحتاج هذا؟" : "Why Do I Need This?"} value={locale === "ar" && selected.descriptionAr ? selected.descriptionAr : selected.description} />
          </div>

          {(selected.why || selected.whyAr) && (
            <div className="mb-4 text-sm">
              <p className="text-xs uppercase tracking-wide text-cyber-cyan mb-1">{locale === "ar" ? "أهمية إضافية" : "Additional Context"}</p>
              <p className="text-slate-300">{locale === "ar" && selected.whyAr ? selected.whyAr : selected.why}</p>
            </div>
          )}

          {selected.resources && selected.resources.length > 0 && (
            <div className="mb-4">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">{locale === "ar" ? "الشهادات ذات الصلة" : "Related Certifications"}</p>
              <div className="flex flex-wrap gap-2">
                {selected.resources.map((slug) => {
                  const cert = certBySlug(slug);
                  if (!cert) return null;
                  return (
                    <Link key={slug} href={`/certifications/${slug}`} className="text-xs px-2.5 py-1 rounded-full border border-cyber-border text-slate-300 hover:border-cyber-cyan hover:text-cyber-cyan">
                      {cert.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-3 border-t border-cyber-border text-xs text-slate-500">
            {priorTitle && <span>{locale === "ar" ? "اكتملت سابقًا:" : "Completed before:"} {priorTitle}</span>}
            {nextTitle && <span className="ms-auto">{locale === "ar" ? "التالي:" : "What Comes Next:"} {nextTitle}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

function Connector() {
  return <div className="h-6 w-px bg-cyber-border" />;
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">{label}</p>
      <p className="text-slate-300">{value}</p>
    </div>
  );
}

function Node({
  step,
  done,
  active,
  onClick,
  onToggle,
  locale,
  compact,
}: {
  step: RoadmapStep;
  done: boolean;
  active: boolean;
  onClick: () => void;
  onToggle: () => void;
  locale: string;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl border p-4 transition-colors ${
        active ? "border-cyber-cyan bg-cyber-cyan/10" : done ? "border-cyber-cyan/40 glass" : "border-cyber-border glass hover:border-slate-500"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`font-medium text-sm ${active ? "text-cyber-cyan" : "text-slate-100"}`}>
          {locale === "ar" && step.titleAr ? step.titleAr : step.title}
        </span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
            done ? "bg-cyber-cyan border-cyber-cyan text-cyber-bg" : "border-cyber-border text-transparent"
          }`}
        >
          ✓
        </span>
      </div>
      {!compact && <p className="text-xs text-slate-400 mt-1 line-clamp-2">{locale === "ar" && step.descriptionAr ? step.descriptionAr : step.description}</p>}
    </button>
  );
}

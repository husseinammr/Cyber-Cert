"use client";

import Link from "next/link";
import { roadmaps } from "@/data/roadmaps";
import { useApp } from "@/lib/app-context";

export default function RoadmapsPage() {
  const { locale, dict } = useApp();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">{dict.nav.roadmaps}</h1>
      <p className="text-slate-400 mb-8 max-w-2xl">
        {locale === "ar"
          ? "كل خارطة طريق هي إطار عمل متصل بصريًا — أساس، ثم مهارات أساسية، ثم أدوات وممارسة عملية، ثم شهادات، ثم مستوى احترافي. ليست قوائم عامة موحدة، بل بنية خاصة بكل مسار."
          : "Every roadmap is a visually connected framework — foundation, then core skills, tools and hands-on practice, certifications, and professional level. Not a generic list — each path has its own structure."}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {roadmaps.map((r) => (
          <Link key={r.slug} href={`/roadmaps/${r.slug}`} className="glass rounded-xl p-5 border border-cyber-border hover:border-cyber-cyan/40 transition-colors flex flex-col gap-2">
            <h2 className="font-semibold text-slate-100">{locale === "ar" && r.nameAr ? r.nameAr : r.name}</h2>
            <p className="text-sm text-slate-400">{r.flow.length} {locale === "ar" ? "مراحل" : "phases"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

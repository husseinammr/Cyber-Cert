"use client";

import { useMemo, useState } from "react";
import { certifications } from "@/data/certifications";
import CertCard from "@/components/CertCard";
import { useApp } from "@/lib/app-context";
import { categoryLabels, levelLabels, label } from "@/lib/labels";
import { Category, Level, CostCategory } from "@/lib/types";

export default function CertificationsPage() {
  const { locale, dict } = useApp();
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<Level | "all">("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const [cost, setCost] = useState<CostCategory | "all">("all");
  const [practical, setPractical] = useState<"all" | "practical" | "theoretical" | "both">("all");

  const filtered = useMemo(() => {
    return certifications.filter((c) => {
      if (level !== "all" && c.level !== level) return false;
      if (category !== "all" && !c.category.includes(category)) return false;
      if (cost !== "all" && c.costCategory !== cost) return false;
      if (practical !== "all" && c.practical !== practical) return false;
      if (q.trim()) {
        const query = q.toLowerCase();
        if (
          !c.name.toLowerCase().includes(query) &&
          !c.provider.toLowerCase().includes(query) &&
          !c.skills.some((s) => s.toLowerCase().includes(query))
        )
          return false;
      }
      return true;
    });
  }, [q, level, category, cost, practical]);

  const categories = Object.keys(categoryLabels) as Category[];
  const levels: Level[] = ["beginner", "intermediate", "advanced"];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">{dict.nav.certifications}</h1>
      <p className="text-slate-400 mb-8">{filtered.length} {locale === "ar" ? "شهادة" : "certifications"}</p>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="glass border border-cyber-border rounded-xl p-5 h-fit space-y-5">
          <div>
            <label className="text-xs uppercase text-slate-500">{locale === "ar" ? "بحث" : "Search"}</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full mt-1 rounded-md bg-transparent border border-cyber-border px-3 py-2 text-sm focus:outline-none focus:border-cyber-cyan"
              placeholder={dict.hero.searchPlaceholder}
            />
          </div>

          <div>
            <label className="text-xs uppercase text-slate-500">{dict.common.level}</label>
            <select value={level} onChange={(e) => setLevel(e.target.value as Level | "all")} className="w-full mt-1 rounded-md bg-transparent border border-cyber-border px-3 py-2 text-sm">
              <option value="all">{locale === "ar" ? "الكل" : "All"}</option>
              {levels.map((l) => (
                <option key={l} value={l}>{label(levelLabels, l, locale)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs uppercase text-slate-500">{dict.common.category}</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as Category | "all")} className="w-full mt-1 rounded-md bg-transparent border border-cyber-border px-3 py-2 text-sm">
              <option value="all">{locale === "ar" ? "الكل" : "All"}</option>
              {categories.map((c) => (
                <option key={c} value={c}>{label(categoryLabels, c, locale)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs uppercase text-slate-500">{locale === "ar" ? "مجاني/مدفوع" : "Free / Paid"}</label>
            <select value={cost} onChange={(e) => setCost(e.target.value as CostCategory | "all")} className="w-full mt-1 rounded-md bg-transparent border border-cyber-border px-3 py-2 text-sm">
              <option value="all">{locale === "ar" ? "الكل" : "All"}</option>
              <option value="free-course-paid-exam">{dict.common.free} + {locale === "ar" ? "اختبار مدفوع" : "Paid Exam"}</option>
              <option value="paid">{dict.common.paid}</option>
            </select>
          </div>

          <div>
            <label className="text-xs uppercase text-slate-500">{locale === "ar" ? "النوع" : "Type"}</label>
            <select value={practical} onChange={(e) => setPractical(e.target.value as any)} className="w-full mt-1 rounded-md bg-transparent border border-cyber-border px-3 py-2 text-sm">
              <option value="all">{locale === "ar" ? "الكل" : "All"}</option>
              <option value="practical">{dict.common.practical}</option>
              <option value="theoretical">{dict.common.theoretical}</option>
              <option value="both">{dict.common.both}</option>
            </select>
          </div>
        </aside>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <CertCard key={c.slug} cert={c} />
          ))}
          {filtered.length === 0 && <p className="text-slate-500 col-span-full">{locale === "ar" ? "لا توجد نتائج" : "No results found."}</p>}
        </div>
      </div>
    </div>
  );
}

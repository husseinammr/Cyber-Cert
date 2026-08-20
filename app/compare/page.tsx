"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { certBySlug, certifications } from "@/data/certifications";
import { useApp } from "@/lib/app-context";
import { storage } from "@/lib/storage";
import { categoryLabels, levelLabels, costLabels, label } from "@/lib/labels";

export default function ComparePage() {
  const { locale, dict } = useApp();
  const [slugs, setSlugs] = useState<string[]>([]);
  const [picker, setPicker] = useState("");

  useEffect(() => {
    setSlugs(storage.getCompare());
  }, []);

  const certs = slugs.map((s) => certBySlug(s)).filter(Boolean) as NonNullable<ReturnType<typeof certBySlug>>[];

  const rows: { label: string; get: (c: any) => string }[] = [
    { label: dict.common.level, get: (c) => label(levelLabels, c.level, locale) },
    { label: dict.common.category, get: (c) => c.category.map((x: string) => label(categoryLabels, x, locale)).join(", ") },
    { label: locale === "ar" ? "النوع" : "Practicality", get: (c) => c.practical },
    { label: locale === "ar" ? "نوع الاختبار" : "Exam Type", get: (c) => c.examType.replace(/-/g, " ") },
    { label: locale === "ar" ? "المتطلبات" : "Prerequisites", get: (c) => c.prerequisites.join("; ") },
    { label: locale === "ar" ? "المهارات" : "Skills", get: (c) => c.skills.slice(0, 4).join(", ") },
    { label: locale === "ar" ? "فئة التكلفة" : "Cost Category", get: (c) => label(costLabels, c.costCategory, locale) },
  ];

  const remove = (slug: string) => setSlugs(storage.toggleCompare(slug));
  const addPicked = () => {
    if (picker && !slugs.includes(picker) && slugs.length < 4) {
      setSlugs(storage.toggleCompare(picker));
    }
    setPicker("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">{dict.nav.compare}</h1>
      <p className="text-slate-400 mb-8">{locale === "ar" ? "قارن حتى 4 شهادات جنبًا إلى جنب." : "Compare up to 4 certifications side by side."}</p>

      <div className="flex flex-wrap gap-2 mb-8 items-center">
        <select value={picker} onChange={(e) => setPicker(e.target.value)} className="rounded-md bg-transparent border border-cyber-border px-3 py-2 text-sm">
          <option value="">{locale === "ar" ? "اختر شهادة لإضافتها" : "Select a certification to add"}</option>
          {certifications.filter((c) => !slugs.includes(c.slug)).map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <button onClick={addPicked} className="px-3 py-2 rounded-md bg-cyber-cyan text-cyber-bg text-sm font-semibold">
          {locale === "ar" ? "إضافة" : "Add"}
        </button>
        {slugs.length > 0 && (
          <button onClick={() => setSlugs(storage.clearCompare())} className="px-3 py-2 rounded-md border border-cyber-border text-sm text-slate-400">
            {locale === "ar" ? "مسح الكل" : "Clear all"}
          </button>
        )}
      </div>

      {certs.length === 0 ? (
        <p className="text-slate-500">{locale === "ar" ? "لم تتم إضافة أي شهادة للمقارنة بعد." : "No certifications added to compare yet."}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 text-slate-500 font-normal w-40"></th>
                {certs.map((c) => (
                  <th key={c.slug} className="text-left p-3 min-w-[220px]">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/certifications/${c.slug}`} className="font-semibold text-slate-100 hover:text-cyber-cyan">{c.name}</Link>
                      <button onClick={() => remove(c.slug)} className="text-slate-500 hover:text-red-400" aria-label="remove">✕</button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{c.provider}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-cyber-border">
                  <td className="p-3 text-slate-500">{row.label}</td>
                  {certs.map((c) => (
                    <td key={c.slug} className="p-3 text-slate-300 align-top">{row.get(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

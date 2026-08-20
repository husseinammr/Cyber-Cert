"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { certifications } from "@/data/certifications";
import { useApp } from "@/lib/app-context";

export default function WhatsNextPage() {
  const { locale, dict } = useApp();
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const matches = useMemo(
    () => certifications.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8),
    [query]
  );

  const toggle = (slug: string) => {
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));
  };

  const recommendations = useMemo(() => {
    if (selected.length === 0) return [];
    const selectedCerts = certifications.filter((c) => selected.includes(c.slug));
    const nextSlugs = new Set<string>();
    selectedCerts.forEach((c) => c.nextCerts.forEach((n) => nextSlugs.add(n)));
    selected.forEach((s) => nextSlugs.delete(s));
    return certifications.filter((c) => nextSlugs.has(c.slug));
  }, [selected]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">{dict.nav.whatsNext}</h1>
      <p className="text-slate-400 mb-8">
        {locale === "ar" ? "اختر المهارات أو الشهادات التي تملكها بالفعل، وسنقترح عليك الخطوة المنطقية التالية." : "Select the certifications you already hold, and we'll suggest the logical next step."}
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={locale === "ar" ? "ابحث عن شهادة تملكها..." : "Search for a certification you hold..."}
        className="w-full rounded-lg bg-transparent border border-cyber-border px-4 py-3 mb-4 focus:outline-none focus:border-cyber-cyan"
      />

      {query && (
        <div className="flex flex-wrap gap-2 mb-6">
          {matches.map((c) => (
            <button
              key={c.slug}
              onClick={() => toggle(c.slug)}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                selected.includes(c.slug) ? "border-cyber-cyan text-cyber-cyan" : "border-cyber-border text-slate-300"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {selected.length > 0 && (
        <div className="mb-8">
          <p className="text-sm text-slate-500 mb-2">{locale === "ar" ? "المحدد:" : "Selected:"}</p>
          <div className="flex flex-wrap gap-2">
            {selected.map((slug) => {
              const c = certifications.find((x) => x.slug === slug);
              return (
                <span key={slug} className="px-3 py-1.5 rounded-full text-sm bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 flex items-center gap-2">
                  {c?.name}
                  <button onClick={() => toggle(slug)}>✕</button>
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-3">{locale === "ar" ? "الخطوات التالية الموصى بها" : "Recommended Next Steps"}</h2>
        {recommendations.length === 0 ? (
          <p className="text-slate-500">{locale === "ar" ? "اختر شهادة واحدة على الأقل لرؤية التوصيات." : "Select at least one certification to see recommendations."}</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {recommendations.map((c) => (
              <Link key={c.slug} href={`/certifications/${c.slug}`} className="glass rounded-xl p-4 border border-cyber-border hover:border-cyber-cyan/40">
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-xs text-slate-500 mb-1">{c.provider}</p>
                <p className="text-sm text-slate-400 line-clamp-2">{c.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

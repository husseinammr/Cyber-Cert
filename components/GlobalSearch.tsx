"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { certifications } from "@/data/certifications";
import { careerPaths } from "@/data/career-paths";
import { freeResources } from "@/data/free-resources";
import { useApp } from "@/lib/app-context";

export default function GlobalSearch() {
  const { dict } = useApp();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (query.trim().length < 2) return null;
    const q = query.toLowerCase();
    const certs = certifications
      .filter((c) => c.name.toLowerCase().includes(q) || c.skills.some((s) => s.toLowerCase().includes(q)) || c.provider.toLowerCase().includes(q))
      .slice(0, 5);
    const paths = careerPaths.filter((p) => p.name.toLowerCase().includes(q) || p.skills.some((s) => s.toLowerCase().includes(q))).slice(0, 4);
    const free = freeResources.filter((r) => r.name.toLowerCase().includes(q) || r.provider.toLowerCase().includes(q)).slice(0, 4);
    return { certs, paths, free };
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={dict.hero.searchPlaceholder}
        className="w-full rounded-xl glass border border-cyber-border px-5 py-3.5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyber-cyan"
      />
      {results && (
        <div className="absolute mt-2 w-full glass border border-cyber-border rounded-xl p-3 max-h-96 overflow-y-auto z-20 text-start">
          {results.certs.length === 0 && results.paths.length === 0 && results.free.length === 0 && (
            <p className="text-sm text-slate-500 p-2">No results found.</p>
          )}
          {results.certs.length > 0 && (
            <div className="mb-2">
              <p className="text-xs uppercase text-slate-500 px-2 mb-1">Certifications</p>
              {results.certs.map((c) => (
                <Link key={c.slug} href={`/certifications/${c.slug}`} className="block px-2 py-1.5 rounded-md hover:bg-white/5 text-sm text-slate-200">
                  {c.name} <span className="text-slate-500">— {c.provider}</span>
                </Link>
              ))}
            </div>
          )}
          {results.paths.length > 0 && (
            <div className="mb-2">
              <p className="text-xs uppercase text-slate-500 px-2 mb-1">Career Paths</p>
              {results.paths.map((p) => (
                <Link key={p.slug} href={`/career-paths/${p.slug}`} className="block px-2 py-1.5 rounded-md hover:bg-white/5 text-sm text-slate-200">
                  {p.name}
                </Link>
              ))}
            </div>
          )}
          {results.free.length > 0 && (
            <div>
              <p className="text-xs uppercase text-slate-500 px-2 mb-1">Free Resources</p>
              {results.free.map((r) => (
                <a key={r.slug} href={r.url} target="_blank" rel="noopener noreferrer" className="block px-2 py-1.5 rounded-md hover:bg-white/5 text-sm text-slate-200">
                  {r.name} <span className="text-slate-500">— {r.provider}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

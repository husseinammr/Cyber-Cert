"use client";

import Link from "next/link";
import { careerPaths } from "@/data/career-paths";
import { useApp } from "@/lib/app-context";

export default function CareerPathsPage() {
  const { dict } = useApp();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">{dict.nav.careerPaths}</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {careerPaths.map((p) => (
          <Link key={p.slug} href={`/career-paths/${p.slug}`} className="glass rounded-xl p-5 border border-cyber-border hover:border-cyber-cyan/40 transition-colors flex flex-col gap-2">
            <h2 className="font-semibold text-slate-100">{p.name}</h2>
            <p className="text-sm text-slate-400 line-clamp-3">{p.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

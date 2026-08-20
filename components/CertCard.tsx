"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Certification } from "@/lib/types";
import { useApp } from "@/lib/app-context";
import { label, levelLabels, costLabels } from "@/lib/labels";
import { storage } from "@/lib/storage";
import { Badge } from "@/components/Badge";

export default function CertCard({ cert }: { cert: Certification }) {
  const { locale, dict } = useApp();
  const [bookmarked, setBookmarked] = useState(false);
  const [inCompare, setInCompare] = useState(false);

  useEffect(() => {
    setBookmarked(storage.getBookmarks().includes(cert.slug));
    setInCompare(storage.getCompare().includes(cert.slug));
  }, [cert.slug]);

  const levelTone = cert.level === "beginner" ? "green" : cert.level === "intermediate" ? "amber" : "purple";

  return (
    <div className="glass rounded-xl p-5 flex flex-col gap-3 hover:border-cyber-cyan/40 border border-cyber-border transition-colors">
      <div className="flex items-start justify-between gap-2">
        <Link href={`/certifications/${cert.slug}`} className="font-semibold text-slate-100 hover:text-cyber-cyan leading-snug">
          {cert.name}
        </Link>
        <button
          onClick={() => setBookmarked(storage.toggleBookmark(cert.slug).includes(cert.slug))}
          className={`shrink-0 text-lg ${bookmarked ? "text-cyber-cyan" : "text-slate-500 hover:text-slate-300"}`}
          aria-label="bookmark"
          title={dict.common.bookmark}
        >
          {bookmarked ? "★" : "☆"}
        </button>
      </div>

      <p className="text-sm text-slate-400">{cert.provider}</p>

      <div className="flex flex-wrap gap-1.5">
        <Badge tone={levelTone}>{label(levelLabels, cert.level, locale)}</Badge>
        <Badge tone="cyan">{label(costLabels, cert.costCategory, locale)}</Badge>
        {cert.category.slice(0, 2).map((c) => (
          <Badge key={c}>{c.replace("-", " ")}</Badge>
        ))}
      </div>

      <p className="text-sm text-slate-400 line-clamp-3">{cert.description}</p>

      <div className="mt-auto flex items-center justify-between pt-2">
        <Link href={`/certifications/${cert.slug}`} className="text-sm font-medium text-cyber-cyan hover:underline">
          {dict.common.viewDetails} →
        </Link>
        <button
          onClick={() => setInCompare(storage.toggleCompare(cert.slug).includes(cert.slug))}
          className={`text-xs px-2.5 py-1 rounded-md border ${inCompare ? "border-cyber-cyan text-cyber-cyan" : "border-cyber-border text-slate-400 hover:text-slate-200"}`}
        >
          {dict.common.compare}
        </button>
      </div>
    </div>
  );
}

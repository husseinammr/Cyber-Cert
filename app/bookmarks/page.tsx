"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { certBySlug } from "@/data/certifications";
import { useApp } from "@/lib/app-context";
import { storage } from "@/lib/storage";
import CertCard from "@/components/CertCard";

export default function BookmarksPage() {
  const { locale, dict } = useApp();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setBookmarks(storage.getBookmarks());
    setRecent(storage.getRecent());
  }, []);

  const bookmarkedCerts = bookmarks.map((s) => certBySlug(s)).filter(Boolean) as NonNullable<ReturnType<typeof certBySlug>>[];
  const recentCerts = recent.map((s) => certBySlug(s)).filter(Boolean) as NonNullable<ReturnType<typeof certBySlug>>[];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">{dict.nav.bookmarks}</h1>
      <p className="text-slate-400 mb-8">
        {locale === "ar" ? "كل هذا محفوظ في متصفحك فقط — لا يوجد حساب أو خادم." : "All of this is saved in your browser only — no account, no server."}
      </p>

      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">{locale === "ar" ? "الشهادات المحفوظة" : "Bookmarked Certifications"}</h2>
        {bookmarkedCerts.length === 0 ? (
          <p className="text-slate-500">{locale === "ar" ? "لا توجد شهادات محفوظة بعد." : "No bookmarks yet."}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bookmarkedCerts.map((c) => (
              <CertCard key={c.slug} cert={c} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">{locale === "ar" ? "تمت مشاهدتها مؤخرًا" : "Recently Viewed"}</h2>
        {recentCerts.length === 0 ? (
          <p className="text-slate-500">{locale === "ar" ? "لم تشاهد أي شهادة بعد." : "You haven't viewed any certifications yet."}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {recentCerts.map((c) => (
              <Link key={c.slug} href={`/certifications/${c.slug}`} className="px-3 py-1.5 rounded-md border border-cyber-border text-sm text-slate-300 hover:border-cyber-cyan hover:text-cyber-cyan">
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

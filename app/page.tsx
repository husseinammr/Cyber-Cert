"use client";

import Link from "next/link";
import { useApp } from "@/lib/app-context";
import GlobalSearch from "@/components/GlobalSearch";
import CertCard from "@/components/CertCard";
import { certifications } from "@/data/certifications";
import { careerPaths } from "@/data/career-paths";
import { freeResources } from "@/data/free-resources";

export default function HomePage() {
  const { dict, locale } = useApp();
  const featuredFree = freeResources.slice(0, 4);
  const featuredCerts = certifications.filter((c) => c.level === "beginner").slice(0, 3);
  const featuredPaths = careerPaths.slice(0, 6);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-cyber-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 flex flex-col items-center text-center gap-6">
          <span className="text-xs tracking-widest uppercase text-cyber-cyan/80 border border-cyber-cyan/30 rounded-full px-3 py-1">
            {locale === "ar" ? "بدون تسجيل دخول · بدون حسابات" : "No login · No accounts · 100% Free to browse"}
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl">
            <span className="text-gradient">{dict.hero.title}</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">{dict.hero.subtitle}</p>
          <GlobalSearch />
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <Link href="/find-my-path" className="px-5 py-3 rounded-lg bg-cyber-cyan text-cyber-bg font-semibold hover:opacity-90 transition-opacity">
              {dict.hero.ctaPath}
            </Link>
            <Link href="/start-here" className="px-5 py-3 rounded-lg border border-cyber-border text-slate-200 hover:border-cyber-cyan transition-colors">
              {dict.hero.ctaStart}
            </Link>
          </div>

          <div className="flex items-center gap-2 mt-6 text-xs text-slate-500">
            <span>{locale === "ar" ? "بواسطة" : "Built by"}</span>
            <span className="dev-name-sweep font-medium">Hussein Ammar</span>
            <span className="text-slate-600">@e_7x2</span>
            <a
              href="https://t.me/e_7x2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="text-slate-500 hover:text-cyber-cyan transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.94 4.6 18.7 20.1c-.24 1.08-.87 1.34-1.76.84l-4.86-3.58-2.35 2.26c-.26.26-.48.48-.98.48l.35-4.96 9.03-8.16c.39-.35-.09-.55-.6-.2L6.6 13.2 1.7 11.66c-1.06-.33-1.08-1.06.22-1.57L20.6 3.44c.89-.33 1.66.2 1.34 1.16Z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/e_7x2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-slate-500 hover:text-cyber-cyan transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold">{locale === "ar" ? "ابدأ بشهادات المبتدئين" : "Great Beginner Certifications"}</h2>
          <Link href="/certifications" className="text-sm text-cyber-cyan hover:underline">
            {locale === "ar" ? "عرض الكل" : "View all"} →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredCerts.map((c) => (
            <CertCard key={c.slug} cert={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-cyber-border">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold">{locale === "ar" ? "موارد مجانية مميزة" : "Featured Free Resources"}</h2>
          <Link href="/free" className="text-sm text-cyber-cyan hover:underline">
            {locale === "ar" ? "عرض الكل" : "View all"} →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredFree.map((r) => (
            <a
              key={r.slug}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-5 border border-cyber-border hover:border-cyber-cyan/40 transition-colors flex flex-col gap-2"
            >
              <span className="font-semibold text-slate-100">{r.name}</span>
              <span className="text-xs text-slate-500">{r.provider}</span>
              <p className="text-sm text-slate-400 line-clamp-3">{r.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-cyber-border">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold">{dict.nav.careerPaths}</h2>
          <Link href="/career-paths" className="text-sm text-cyber-cyan hover:underline">
            {locale === "ar" ? "عرض الكل" : "View all"} →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredPaths.map((p) => (
            <Link key={p.slug} href={`/career-paths/${p.slug}`} className="glass rounded-xl p-5 border border-cyber-border hover:border-cyber-cyan/40 transition-colors">
              <h3 className="font-semibold text-slate-100 mb-2">{p.name}</h3>
              <p className="text-sm text-slate-400 line-clamp-3">{p.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

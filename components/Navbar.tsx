"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/lib/app-context";

export default function Navbar() {
  const { locale, setLocale, theme, setTheme, dict } = useApp();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/certifications", label: dict.nav.certifications },
    { href: "/free", label: dict.nav.free },
    { href: "/career-paths", label: dict.nav.careerPaths },
    { href: "/roadmaps", label: dict.nav.roadmaps },
    { href: "/graph", label: dict.nav.graph },
    { href: "/find-my-path", label: dict.nav.findPath },
    { href: "/whats-next", label: dict.nav.whatsNext },
    { href: "/compare", label: dict.nav.compare },
    { href: "/start-here", label: dict.nav.startHere },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-cyber-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-bold tracking-tight text-gradient">CyberCert Hub</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 rounded-md text-slate-300 hover:text-cyber-cyan hover:bg-white/5 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/bookmarks"
              className="hidden sm:inline-flex px-3 py-1.5 rounded-md border border-cyber-border text-sm text-slate-300 hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
            >
              {dict.nav.bookmarks}
            </Link>
            <button
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="px-3 py-1.5 rounded-md border border-cyber-border text-sm text-slate-300 hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
              aria-label="Toggle language"
            >
              {locale === "en" ? "AR" : "EN"}
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="px-3 py-1.5 rounded-md border border-cyber-border text-sm text-slate-300 hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
            <button
              className="lg:hidden px-3 py-1.5 rounded-md border border-cyber-border text-slate-300"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden flex flex-col gap-1 pb-4 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-slate-300 hover:text-cyber-cyan hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/bookmarks" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-slate-300 hover:text-cyber-cyan hover:bg-white/5">
              {dict.nav.bookmarks}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

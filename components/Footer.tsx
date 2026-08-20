"use client";
import { useApp } from "@/lib/app-context";

export default function Footer() {
  const { locale } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cyber-border mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-slate-400">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <p>
            {locale === "ar"
              ? "CyberCert Hub — دليل مجاني وثابت. لا يوجد تسجيل دخول، لا حسابات، جميع بياناتك تبقى في متصفحك فقط."
              : "CyberCert Hub — a free, permanent guide. No login, no accounts, no backend. All your data stays in your browser only."}
          </p>
          <p>
            {locale === "ar"
              ? "الأسعار وتفاصيل الشهادات قد تتغير — تحقق دائمًا من الموقع الرسمي للجهة المانحة."
              : "Pricing and certification details change over time — always verify with the official provider."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-cyber-border/60 text-xs text-slate-500">
          <p>© {year} CyberCert Hub</p>
          <p className="flex items-center gap-1.5">
            <span>{locale === "ar" ? "تطوير" : "Developed by"}</span>
            <span className="text-slate-300 font-medium">Hussein Ammar</span>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/e_7x2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="text-slate-500 hover:text-cyber-cyan transition-colors"
            >
              <TelegramIcon />
            </a>
            <a
              href="https://instagram.com/e_7x2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-slate-500 hover:text-cyber-cyan transition-colors"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.94 4.6 18.7 20.1c-.24 1.08-.87 1.34-1.76.84l-4.86-3.58-2.35 2.26c-.26.26-.48.48-.98.48l.35-4.96 9.03-8.16c.39-.35-.09-.55-.6-.2L6.6 13.2 1.7 11.66c-1.06-.33-1.08-1.06.22-1.57L20.6 3.44c.89-.33 1.66.2 1.34 1.16Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

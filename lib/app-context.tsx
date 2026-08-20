"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Locale, t } from "@/lib/i18n";
import { storage } from "@/lib/storage";

interface AppContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  theme: "dark" | "light";
  setTheme: (th: "dark" | "light") => void;
  dict: ReturnType<typeof t>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [theme, setThemeState] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setLocaleState(storage.getLocale());
    setThemeState(storage.getTheme());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.classList.toggle("font-arabic", locale === "ar");
  }, [locale]);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    storage.setLocale(l);
  };
  const setTheme = (th: "dark" | "light") => {
    setThemeState(th);
    storage.setTheme(th);
  };

  return (
    <AppContext.Provider value={{ locale, setLocale, theme, setTheme, dict: t(locale) }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

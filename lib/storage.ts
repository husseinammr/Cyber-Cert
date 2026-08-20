"use client";

// All user data lives in localStorage only. No backend, no accounts.
const KEYS = {
  bookmarks: "cch_bookmarks",
  recent: "cch_recent",
  progress: "cch_roadmap_progress",
  compare: "cch_compare",
  locale: "cch_locale",
  theme: "cch_theme",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable — fail silently, app still works without persistence
  }
}

export const storage = {
  getBookmarks: (): string[] => read(KEYS.bookmarks, []),
  toggleBookmark: (slug: string): string[] => {
    const current = read<string[]>(KEYS.bookmarks, []);
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
    write(KEYS.bookmarks, next);
    return next;
  },

  getRecent: (): string[] => read(KEYS.recent, []),
  addRecent: (slug: string): string[] => {
    const current = read<string[]>(KEYS.recent, []).filter((s) => s !== slug);
    const next = [slug, ...current].slice(0, 12);
    write(KEYS.recent, next);
    return next;
  },

  getProgress: (): Record<string, string[]> => read(KEYS.progress, {}),
  toggleStep: (roadmapSlug: string, stepTitle: string): Record<string, string[]> => {
    const current = read<Record<string, string[]>>(KEYS.progress, {});
    const list = current[roadmapSlug] || [];
    const next = list.includes(stepTitle) ? list.filter((s) => s !== stepTitle) : [...list, stepTitle];
    const updated = { ...current, [roadmapSlug]: next };
    write(KEYS.progress, updated);
    return updated;
  },

  getCompare: (): string[] => read(KEYS.compare, []),
  toggleCompare: (slug: string): string[] => {
    const current = read<string[]>(KEYS.compare, []);
    let next: string[];
    if (current.includes(slug)) {
      next = current.filter((s) => s !== slug);
    } else if (current.length >= 4) {
      next = current;
    } else {
      next = [...current, slug];
    }
    write(KEYS.compare, next);
    return next;
  },
  clearCompare: (): string[] => {
    write(KEYS.compare, []);
    return [];
  },

  getLocale: (): "en" | "ar" => read(KEYS.locale, "en"),
  setLocale: (locale: "en" | "ar") => write(KEYS.locale, locale),

  getTheme: (): "dark" | "light" => read(KEYS.theme, "dark"),
  setTheme: (theme: "dark" | "light") => write(KEYS.theme, theme),
};

"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./messages/en";
import tr from "./messages/tr";

export type Locale = "en" | "tr";
type Messages = Record<string, unknown>;

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nCtx = createContext<Ctx | null>(null);

const dict: Record<Locale, Messages> = { en, tr };

function get(obj: any, path: string): any {
  return path.split(".").reduce((acc, k) => (acc && k in acc ? acc[k] : undefined), obj);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("tr");

  useEffect(() => {
    const m = document.cookie.match(/(?:^|; )lang=([^;]+)/);
    const fromCookie = m ? (decodeURIComponent(m[1]) as Locale) : undefined;
    if (fromCookie === "en" || fromCookie === "tr") setLocaleState(fromCookie);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    document.cookie = `lang=${encodeURIComponent(l)}; Path=/; Max-Age=31536000; SameSite=Lax`;
  };

  const t = (key: string) => {
    const val = get(dict[locale], key);
    if (typeof val === "string") return val;
    return key;
  };

  const value = useMemo(() => ({ locale, setLocale, t }), [locale]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

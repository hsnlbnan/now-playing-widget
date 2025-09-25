"use client";

import { useI18n } from "@/i18n/I18nProvider";

export default function LandingIntro() {
  const { t } = useI18n();
  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("landing.title")}</h1>
      <p className="mt-2 text-sm/6 text-white/70">{t("landing.subtitle")}</p>
    </>
  );
}


"use client";

import { useI18n } from "@/i18n/I18nProvider";

export default function LegalContent({ kind }: { kind: "privacy" | "terms" }) {
  const { t } = useI18n();
  const date = new Date();
  const updated = `${t(`legal.${kind}.updated`)}: ${date.toISOString().slice(0, 10)}`;
  const s = (key: string) => t(`legal.${kind}.sections.${key}`);

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">{t(`legal.${kind}.title`)}</h1>
        <p className="text-xs text-white/60">{updated}</p>
      </header>

      <Section title={s("introTitle")}>{s("introBody")}</Section>
      {kind === "privacy" ? (
        <>
          <Section title={s("dataTitle")}>{s("dataBody")}</Section>
          <Section title={s("usageTitle")}>{s("usageBody")}</Section>
          <Section title={s("cookiesTitle")}>{s("cookiesBody")}</Section>
          <Section title={s("thirdTitle")}>{s("thirdBody")}</Section>
          <Section title={s("retentionTitle")}>{s("retentionBody")}</Section>
          <Section title={s("rightsTitle")}>{s("rightsBody")}</Section>
          <Section title={s("contactTitle")}>{s("contactBody")}</Section>
        </>
      ) : (
        <>
          <Section title={s("acceptTitle")}>{s("acceptBody")}</Section>
          <Section title={s("useTitle")}>{s("useBody")}</Section>
          <Section title={s("contentTitle")}>{s("contentBody")}</Section>
          <Section title={s("prohibitedTitle")}>{s("prohibitedBody")}</Section>
          <Section title={s("disclaimerTitle")}>{s("disclaimerBody")}</Section>
          <Section title={s("liabilityTitle")}>{s("liabilityBody")}</Section>
          <Section title={s("changesTitle")}>{s("changesBody")}</Section>
          <Section title={s("lawTitle")}>{s("lawBody")}</Section>
          <Section title={s("contactTitle")}>{s("contactBody")}</Section>
        </>
      )}
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-base font-semibold text-white/90">{title}</h2>
      <p className="text-sm text-white/75 leading-6">{children}</p>
    </section>
  );
}


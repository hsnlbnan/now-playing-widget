"use client";

import Header from "@/components/Header";
import ContactFooter from "@/components/ContactFooter";
import { I18nProvider } from "@/i18n/I18nProvider";
import LangSwitch from "@/components/LangSwitch";
import LegalContent from "@/components/legal/LegalContent";

export default function TermsPage() {
  return (
    <I18nProvider>
      <LangSwitch />
      <div className="mx-auto max-w-5xl">
        <Header />
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md">
          <LegalContent kind="terms" />
        </div>
        <ContactFooter />
      </div>
    </I18nProvider>
  );
}


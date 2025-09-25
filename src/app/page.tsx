"use client";

import Header from "@/components/Header";
import SettingsPanel from "@/components/SettingsPanel";
import EmbedPreview from "@/components/EmbedPreview";
import EmbedUrlCard from "@/components/EmbedUrlCard";
import ContactFooter from "@/components/ContactFooter";
import LoginBar from "@/components/LoginBar";
import { AppStateProvider, useAppState } from "@/state/AppState";
import { I18nProvider } from "@/i18n/I18nProvider";
import LandingIntro from "@/components/LandingIntro";
import SettingsPlaceholder from "@/components/SettingsPlaceholder";

function MainContent() {
  return (
    <I18nProvider>
    <AppStateProvider>
      <MainLayout />
    </AppStateProvider>
    </I18nProvider>
  );
}

function MainLayout() {
  const { username } = useAppState();
  
  return (
    <div className="min-h-screen flex flex-col">        
      <div className="flex-1 pb-20 sm:pb-16"> {/* Footer için boşluk */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Header />

          <section className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 lg:p-8 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,.08)]">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(800px_300px_at_20%_-10%,rgba(29,185,84,.25),transparent_60%),radial-gradient(600px_300px_at_90%_10%,rgba(96,165,250,.18),transparent_60%)]" />
            
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:gap-12">
              <div className="flex-1 space-y-6">
                <LandingIntro />
                <LoginBar />
                {username.trim() ? <SettingsPanel /> : <SettingsPlaceholder />}
              </div>

              <div className="flex-1 space-y-4">
                <EmbedPreview />
                <EmbedUrlCard />
              </div>
            </div>
          </section>
        </div>
      </div>

      <ContactFooter />
    </div>
  );
}

export default function Home() {
  return <MainContent />;
}

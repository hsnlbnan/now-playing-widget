import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotify Ne Dinliyor?",
  description: "MSN tarzı now-playing badge ve profil",
  metadataBase: typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh`}>
        <div className="pointer-events-none fixed inset-0 -z-10 [background:radial-gradient(1200px_600px_at_50%_-10%,#1DB95420,transparent_70%),radial-gradient(900px_600px_at_80%_20%,#60A5FA26,transparent_65%),radial-gradient(800px_500px_at_20%_30%,#A78BFA1f,transparent_60%)]" />
        <div className="pointer-events-none fixed inset-0 -z-10 backdrop-blur-[2px]" />
        <main className="px-4 sm:px-6 md:px-8 py-8">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}

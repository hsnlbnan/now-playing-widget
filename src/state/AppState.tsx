"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "dark" | "light";
export type Layout = "horizontal" | "vertical";
export type Variant = "default" | "compact";

type AppState = {
  username: string;
  setUsername: (v: string) => void;
  showCover: boolean;
  setShowCover: (v: boolean) => void;
  showLink: boolean;
  setShowLink: (v: boolean) => void;
  showTime: boolean;
  setShowTime: (v: boolean) => void;
  showProgress: boolean;
  setShowProgress: (v: boolean) => void;
  theme: Theme;
  setTheme: (v: Theme) => void;
  layout: Layout;
  setLayout: (v: Layout) => void;
  variant: Variant;
  setVariant: (v: Variant) => void;
  connected: boolean;
  setConnected: (v: boolean) => void;
  hasCookieUser: boolean;
  setHasCookieUser: (v: boolean) => void;
  login: () => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("");
  const [showCover, setShowCover] = useState(true);
  const [showLink, setShowLink] = useState(true);
  const [showTime, setShowTime] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [theme, setTheme] = useState<Theme>("dark");
  const [layout, setLayout] = useState<Layout>("horizontal");
  const [variant, setVariant] = useState<Variant>("default");
  const [connected, setConnected] = useState(false);
  const [hasCookieUser, setHasCookieUser] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const qUser = sp.get("user");
    if (qUser) setUsername(qUser);
    const conn = sp.get("connected");
    setConnected(conn === "1");
    if (!qUser) {
      const m = document.cookie.match(/(?:^|; )sp_user=([^;]+)/);
      if (m) {
        setUsername(decodeURIComponent(m[1]));
        setHasCookieUser(true);
      }
    }
  }, []);

  const login = () => {
    const url = username ? `/api/auth/login?user=${encodeURIComponent(username)}` : "/api/auth/login";
    window.location.href = url;
  };

  const value: AppState = {
    username,
    setUsername,
    showCover,
    setShowCover,
    showLink,
    setShowLink,
    showTime,
    setShowTime,
    showProgress,
    setShowProgress,
    theme,
    setTheme,
    layout,
    setLayout,
    variant,
    setVariant,
    connected,
    setConnected,
    hasCookieUser,
    setHasCookieUser,
    login,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

export function useEmbedUrl() {
  const {
    username,
    showCover,
    showLink,
    showTime,
    showProgress,
    theme,
    layout,
    variant,
  } = useAppState();
  const site = (typeof window !== "undefined" && window.location.origin) || process.env.NEXT_PUBLIC_SITE_URL || "";
  return useMemo(() => {
    if (!username) return "";
    const base = `${site}/api/now-playing?user=${encodeURIComponent(username)}`;
    const params = new URLSearchParams();
    if (!showCover) params.set("cover", "0");
    if (!showLink) params.set("link", "0");
    if (!showTime) params.set("time", "0");
    if (!showProgress) params.set("progress", "0");
    if (theme !== "dark") params.set("theme", theme);
    if (layout !== "horizontal") params.set("layout", layout);
    if (variant !== "default") params.set("variant", variant);
    const qs = params.toString();
    return qs ? `${base}&${qs}` : base;
  }, [site, username, showCover, showLink, showTime, showProgress, theme, layout, variant]);
}


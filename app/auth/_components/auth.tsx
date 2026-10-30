"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Code2,
  ArrowLeft,
  Sparkles,
  Terminal,
} from "lucide-react";
import { parseAuthMode, type AuthMode } from "../auth-mode";
import Login from "./login";
import Register from "./register";
import ForgotPassword from "./forgot-password";
import ThemeToggle from "../../_components/ThemeToggle";

type AuthProps = {
  initialMode?: AuthMode;
};

export default function Auth({ initialMode = "login" }: AuthProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // The active mode is the source of truth for rendering, while the `mode`
  // query parameter keeps the view shareable and survives a page refresh.
  //
  // State -> URL: keep the query parameter in sync (and normalize invalid or
  // missing values) without triggering a server round-trip.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === mode) return;

    params.set("mode", mode);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [mode]);

  // URL -> state: browser back/forward and URLs edited while the page is open.
  useEffect(() => {
    const syncModeFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setMode(parseAuthMode(params.get("mode")));
    };

    window.addEventListener("popstate", syncModeFromUrl);
    return () => window.removeEventListener("popstate", syncModeFromUrl);
  }, []);

  const selectMode = (nextMode: AuthMode) => {
    if (nextMode === mode) return;

    setMode(nextMode);

    const params = new URLSearchParams(window.location.search);
    params.set("mode", nextMode);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-background font-sans text-foreground">
      {/* Background Glows & Ambient Mesh */}
     
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/30 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Code2 className="h-5 w-5 " />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-foreground  transition-colors">
                Devora
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-150 hover:bg-muted hover:text-foreground sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Developer Showcase & Value Prop (hidden on small screens, gorgeous on large) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 w-fit dark:text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-300" />
              <span>Devora Developer Hub</span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
             One account. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-600 to-emerald-600 dark:from-indigo-400 dark:via-cyan-300 dark:to-emerald-400">
               Every connection.
              </span>
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Join over 120,000 software engineers sharing snippets, debugging together in real-time, and building verified portfolios.
            </p>

            {/* Terminal mock preview */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <div className="flex items-center gap-1.5 ml-2 text-[11px] font-mono text-slate-500">
                  <Terminal className="w-3 h-3 text-slate-400" />
                  <span>devora auth status</span>
                </div>
              </div>
              <div className="font-mono text-xs space-y-1 text-slate-300">
                <p className="text-emerald-400">✓ Security Protocol: OAuth2 + WebAuthn</p>
                <p className="text-slate-400">⚡ Global hubs active: 48 stacks</p>
                <p className="text-cyan-300">➜ Ready to sync developer profile...</p>
              </div>
            </div>

            {/* Micro Social Proof */}
            <div className="pt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 border-2 border-background flex items-center justify-center font-bold text-[10px]">JS</div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-600 border-2 border-background flex items-center justify-center font-bold text-[10px]">RS</div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 border-2 border-background flex items-center justify-center font-bold text-[10px]">PY</div>
              </div>
              <span>Joined by top builders from open source communities.</span>
            </div>
          </div>

          {/* Right Column: Interactive Multi-View Card */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md bg-card/90 backdrop-blur-xl border border-border hover:border-primary/30 rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 dark:shadow-2xl">
              {/* Segmented Pill Switcher */}
              {/*<div className="grid grid-cols-3 p-1 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs font-semibold mb-6">
                {AUTH_TABS.map(({ mode: tabMode, label }) => (
                  <button
                    key={tabMode}
                    type="button"
                    aria-pressed={mode === tabMode}
                    onClick={() => selectMode(tabMode)}
                    className={`py-2 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
                      mode === tabMode
                        ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>*/}

              {mode === "login" && (
                <Login
                  onSwitchToRegister={() => selectMode("register")}
                  onSwitchToForgotPassword={() =>
                    selectMode("forgot-password")
                  }
                />
              )}

              {mode === "register" && (
                <Register onSwitchToLogin={() => selectMode("login")} />
              )}

              {mode === "forgot-password" && (
                <ForgotPassword
                  onSwitchToLogin={() => selectMode("login")}
                  onSwitchToRegister={() => selectMode("register")}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-4 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Devora Network Inc. All developer rights reserved.</p>
      </footer>
    </div>
  );
}

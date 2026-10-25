"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function CtaSection() {
  const [handle, setHandle] = useState("");
  const [claimed, setClaimed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handle.trim().length > 0) {
      setClaimed(true);
    }
  };

  return (
    <section id="join" className="relative overflow-hidden bg-background py-24">
      {/* Decorative gradient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200/60 via-background to-background dark:from-indigo-900/30" />
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="rounded-3xl border border-indigo-500/30 bg-card/90 p-8 text-center shadow-xl backdrop-blur-xl sm:p-14 dark:bg-card/70 dark:shadow-2xl">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-700 mb-6 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-300" />
            <span>Join 120,000+ Software Engineers Today</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight max-w-3xl mx-auto">
            Stop coding in isolation. <br />
            Your developer community is here.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Create your profile, claim your custom developer handle, share your favorite code snippets, and build real connections with peers worldwide.
          </p>

          {/* Interactive Handle Reservation Form */}
          <div className="mt-10 max-w-lg mx-auto">
            {!claimed ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-3.5 text-sm font-mono text-muted-foreground">
                    devora.io/@
                  </span>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) =>
                      setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))
                    }
                    placeholder="yourhandle"
                    required
                    className="w-full rounded-xl border border-input bg-background py-3.5 pl-28 pr-4 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-cyan-600 transition-all active:scale-95"
                >
                  <span>Claim Handle</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <div className="rounded-xl border border-success/40 bg-success/10 p-4 text-success flex items-center justify-center gap-2">
                <Check className="h-5 w-5 text-success" />
                <span className="font-semibold text-sm">
                  Awesome! devora.io/@{handle} is reserved for you. Check your email to verify.
                </span>
              </div>
            )}

           
          </div>

          {/* Bottom Trust Indicators */}
          <div className="mt-10 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>No spam, zero recruiter pitch dumps</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Full control of your data & snippets</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>100% Free for developers</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

type ForgotPasswordSuccessProps = {
  email: string;
  onSwitchToLogin: () => void;
};

export default function ForgotPasswordSuccess({
  email,
  onSwitchToLogin,
}: ForgotPasswordSuccessProps) {
  return (
    <div className="auth-step-enter space-y-5">
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-5 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white">
          Password updated
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-slate-300">
          Your password for{" "}
          <span className="font-mono font-semibold text-emerald-300">
            {email}
          </span>{" "}
          has been changed. You can now sign in with your new password.
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-slate-800/80 bg-slate-950/40 p-3 text-xs text-slate-400">
        <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-400" />
        <span>
          If you didn&apos;t make this change, contact support and secure your
          account immediately.
        </span>
      </div>

      <button
        type="button"
        onClick={onSwitchToLogin}
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:from-indigo-600 hover:to-cyan-600 hover:shadow-indigo-600/50 active:scale-95"
      >
        <span>Back to Sign In</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

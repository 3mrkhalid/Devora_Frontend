"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import {
  RECOVERY_CODE_LENGTH,
  toRecoveryErrorMessage,
  verifyPasswordRecoveryCode,
} from "../_lib/password-recovery";

type ForgotPasswordVerifyProps = {
  email: string;
  onVerified: (code: string) => void;
  onBack: () => void;
  onSwitchToLogin: () => void;
};

export default function ForgotPasswordVerify({
  email,
  onVerified,
  onBack,
  onSwitchToLogin,
}: ForgotPasswordVerifyProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) return;

    if (code.length !== RECOVERY_CODE_LENGTH) {
      setError(`Enter the ${RECOVERY_CODE_LENGTH}-digit code from your email.`);
      inputRef.current?.focus();
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      await verifyPasswordRecoveryCode(email, code);
      onVerified(code);
    } catch (verificationError) {
      setError(
        toRecoveryErrorMessage(
          verificationError,
          "We couldn't verify that code. Please try again."
        )
      );
      setSubmitting(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="auth-step-enter space-y-5">
      <div>
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
          <ShieldCheck className="h-5 w-5 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Check your inbox
        </h2>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm">
          If an account exists for{" "}
          <span className="font-mono text-slate-200">{email}</span>, we sent a{" "}
          {RECOVERY_CODE_LENGTH}-digit recovery code.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="recovery-code"
            className="mb-1.5 block text-xs font-medium text-slate-300"
          >
            Recovery code
          </label>
          <input
            ref={inputRef}
            id="recovery-code"
            name="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={RECOVERY_CODE_LENGTH}
            spellCheck={false}
            required
            disabled={submitting}
            value={code}
            onChange={(event) => {
              const nextCode = event.target.value
                .replace(/\D/g, "")
                .slice(0, RECOVERY_CODE_LENGTH);

              setCode(nextCode);
              if (error) setError(null);
            }}
            placeholder={"0".repeat(RECOVERY_CODE_LENGTH)}
            aria-invalid={error ? true : undefined}
            aria-describedby={
              error ? "recovery-code-error" : "recovery-code-note"
            }
            className={`w-full rounded-xl border bg-slate-950/80 py-3 text-center font-mono text-lg tracking-[0.55em] text-white placeholder:text-slate-700 transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
              error
                ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20"
                : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
          />

          {error ? (
            <p
              id="recovery-code-error"
              role="alert"
              className="mt-1.5 text-xs text-rose-300"
            >
              {error}
            </p>
          ) : (
            <p
              id="recovery-code-note"
              className="mt-1.5 text-[11px] text-slate-500"
            >
              Paste the {RECOVERY_CODE_LENGTH}-digit code from the email.
              Recovery codes can expire, so request a new one if needed.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:from-indigo-600 hover:to-cyan-600 hover:shadow-indigo-600/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Verify code</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-[11px] leading-relaxed text-slate-500">
        Didn&apos;t receive a code? Check your spam folder, or go back and
        request a new one.
      </p>

      <div className="flex items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Change email</span>
        </button>

        <button
          type="button"
          onClick={onSwitchToLogin}
          className="cursor-pointer text-xs font-medium text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
}

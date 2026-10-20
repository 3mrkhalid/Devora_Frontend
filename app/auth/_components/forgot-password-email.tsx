"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, KeyRound, Mail } from "lucide-react";
import {
  requestPasswordRecovery,
  toRecoveryErrorMessage,
} from "../_lib/password-recovery";
import { normalizeEmail, validateEmail } from "../_lib/validation";

type ForgotPasswordEmailProps = {
  initialEmail: string;
  onSubmitted: (email: string) => void;
  onSwitchToLogin: () => void;
  onSwitchToRegister: () => void;
};

export default function ForgotPasswordEmail({
  initialEmail,
  onSubmitted,
  onSwitchToLogin,
  onSwitchToRegister,
}: ForgotPasswordEmailProps) {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) return;

    const validationError = validateEmail(email);

    if (validationError) {
      setError(validationError);
      inputRef.current?.focus();
      return;
    }

    const normalizedEmail = normalizeEmail(email);

    setError(null);
    setSubmitting(true);

    try {
      await requestPasswordRecovery(normalizedEmail);
      onSubmitted(normalizedEmail);
    } catch (requestError) {
      setError(
        toRecoveryErrorMessage(
          requestError,
          "We couldn't send a recovery code. Please try again."
        )
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-step-enter space-y-5">
      <div>
        <div className="flex gap-5 items-center mb-5 ">
          <div className="   flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10">
            <KeyRound className="h-5 w-5 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Forgot password?
            </h2>
        </div>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm">
          Enter the email linked to your Devora account and we&apos;ll send a
          recovery code if an account exists.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="recovery-email"
            className="mb-1.5 block text-xs font-medium text-slate-300"
          >
            Email address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
            <input
              ref={inputRef}
              id="recovery-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              disabled={submitting}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError(null);
              }}
              placeholder="dev@devora.io"
              aria-invalid={error ? true : undefined}
              aria-describedby={
                error ? "recovery-email-error" : "recovery-email-note"
              }
              className={`w-full rounded-xl border bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                error
                  ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
              }`}
            />
          </div>

          {error ? (
            <p
              id="recovery-email-error"
              role="alert"
              className="mt-1.5 text-xs text-rose-300"
            >
              {error}
            </p>
          ) : (
            <p
              id="recovery-email-note"
              className="mt-1.5 text-[11px] text-slate-500"
            >
              For your privacy, we never confirm whether an email is
              registered.
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
              <span>Sending code...</span>
            </>
          ) : (
            <>
              <span>Send recovery code</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="flex items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Sign In</span>
        </button>

        <button
          type="button"
          onClick={onSwitchToRegister}
          className="cursor-pointer text-xs font-medium text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
        >
          Create new account
        </button>
      </div>
    </div>
  );
}

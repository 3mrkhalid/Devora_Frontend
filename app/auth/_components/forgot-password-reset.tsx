"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
} from "lucide-react";
import {
  resetPassword,
  toRecoveryErrorMessage,
} from "../_lib/password-recovery";
import {
  PASSWORD_REQUIREMENTS,
  validateNewPassword,
  validatePasswordConfirmation,
} from "../_lib/validation";

type ForgotPasswordResetProps = {
  email: string;
  code: string;
  onReset: () => void;
  onStartOver: () => void;
  onSwitchToLogin: () => void;
};

export default function ForgotPasswordReset({
  email,
  code,
  onReset,
  onStartOver,
  onSwitchToLogin,
}: ForgotPasswordResetProps) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmationError, setConfirmationError] = useState<string | null>(
    null
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmationRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) return;

    const nextPasswordError = validateNewPassword(password);
    const nextConfirmationError = validatePasswordConfirmation(
      password,
      confirmation
    );

    setPasswordError(nextPasswordError);
    setConfirmationError(nextConfirmationError);
    setFormError(null);

    if (nextPasswordError) {
      passwordRef.current?.focus();
      return;
    }

    if (nextConfirmationError) {
      confirmationRef.current?.focus();
      return;
    }

    setSubmitting(true);

    try {
      await resetPassword(email, code, password);
      onReset();
    } catch (resetError) {
      setFormError(
        toRecoveryErrorMessage(
          resetError,
          "We couldn't reset your password. Please try again."
        )
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-step-enter space-y-5">
      <div>
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
          <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Set a new password
        </h2>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Choose a new password for{" "}
          <span className="font-mono text-foreground">{email}</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="new-password"
            className="mb-1.5 block text-xs font-medium text-secondary-foreground"
          >
            New password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-subtle-foreground" />
            <input
              ref={passwordRef}
              id="new-password"
              name="new-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              disabled={submitting}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (passwordError) setPasswordError(null);
                if (formError) setFormError(null);
              }}
              placeholder="Enter a new password"
              aria-invalid={passwordError ? true : undefined}
              aria-describedby={
                passwordError ? "new-password-error" : "new-password-note"
              }
              className={`w-full rounded-xl border bg-background py-2.5 pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                passwordError
                  ? "border-destructive/60 focus:border-destructive focus:ring-destructive/20"
                  : "border-input focus:border-ring focus:ring-ring/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-3.5 top-3.5 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {passwordError ? (
            <p
              id="new-password-error"
              role="alert"
              className="mt-1.5 text-xs text-destructive"
            >
              {passwordError}
            </p>
          ) : (
            <p
              id="new-password-note"
              className="mt-1.5 text-[11px] text-muted-foreground"
            >
              Use {PASSWORD_REQUIREMENTS}.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="mb-1.5 block text-xs font-medium text-secondary-foreground"
          >
            Confirm new password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-subtle-foreground" />
            <input
              ref={confirmationRef}
              id="confirm-password"
              name="confirm-password"
              type={showConfirmation ? "text" : "password"}
              autoComplete="new-password"
              required
              disabled={submitting}
              value={confirmation}
              onChange={(event) => {
                setConfirmation(event.target.value);
                if (confirmationError) setConfirmationError(null);
                if (formError) setFormError(null);
              }}
              placeholder="Re-enter your new password"
              aria-invalid={confirmationError ? true : undefined}
              aria-describedby={
                confirmationError ? "confirm-password-error" : undefined
              }
              className={`w-full rounded-xl border bg-background py-2.5 pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                confirmationError
                  ? "border-destructive/60 focus:border-destructive focus:ring-destructive/20"
                  : "border-input focus:border-ring focus:ring-ring/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmation((visible) => !visible)}
              aria-label={
                showConfirmation
                  ? "Hide password confirmation"
                  : "Show password confirmation"
              }
              aria-pressed={showConfirmation}
              className="absolute right-3.5 top-3.5 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
            >
              {showConfirmation ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {confirmationError && (
            <p
              id="confirm-password-error"
              role="alert"
              className="mt-1.5 text-xs text-destructive"
            >
              {confirmationError}
            </p>
          )}
        </div>

        {formError && (
          <div
            role="alert"
            className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive"
          >
            {formError}
          </div>
        )}

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
              <span>Updating password...</span>
            </>
          ) : (
            <>
              <span>Update password</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
        <button
          type="button"
          onClick={onStartOver}
          disabled={submitting}
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Get a new code</span>
        </button>

        <button
          type="button"
          onClick={onSwitchToLogin}
          className="cursor-pointer text-xs font-medium text-primary transition-colors hover:text-primary-hover hover:underline"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
}

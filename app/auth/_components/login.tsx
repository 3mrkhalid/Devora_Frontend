"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { loginHandler } from "@/api/auth/login";
import { toAuthErrorMessage } from "@/api/auth/errors";
import { setAccessToken } from "@/api/conf_global/axios";
import {
  normalizeEmail,
  validateEmail,
  validatePassword,
} from "../_lib/validation";

type LoginProps = {
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
};

export default function Login({
  onSwitchToRegister,
  onSwitchToForgotPassword,
}: LoginProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    const normalizedEmail = normalizeEmail(email);
    const emailError = validateEmail(normalizedEmail);
    const passwordError = validatePassword(password);

    setSuccessMessage(null);
    setErrorMessage(null);

    if (emailError) {
      setErrorMessage(emailError);
      return;
    }

    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    setLoading(true);

    try {
      const token = await loginHandler({
        email: normalizedEmail,
        password,
      });

      setAccessToken(token);
      setSuccessMessage("Signed in successfully! Redirecting...");
      router.replace("/");
    } catch (loginError) {
      setErrorMessage(
        toAuthErrorMessage(
          loginError,
          "We couldn't sign you in. Please try again."
        )
      );
      setLoading(false);
    }
  };

  return (
    <div className="auth-step-login space-y-5 animate-fadeIn">
      {successMessage && (
        <div className="rounded-xl border border-success/40 bg-success/10 p-3.5 text-success flex items-center gap-2 text-xs font-medium animate-fadeIn">
          <Check className="h-4 w-4 text-success flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/40 bg-destructive/10 p-3.5 text-destructive flex items-center gap-2 text-xs font-medium animate-fadeIn"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          Sign in to your Devora developer account
        </p>
      </div>

      {/* Social OAuth Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background hover:bg-muted py-2.5 px-3 text-xs font-medium text-foreground transition-all cursor-pointer"
        >
          <FaGithub className="h-4 w-4 text-foreground" />
          <span>GitHub</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background hover:bg-muted py-2.5 px-3 text-xs font-medium text-foreground transition-all cursor-pointer"
        >
          <FcGoogle className="h-4 w-4" />
          <span>Google</span>
        </button>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-border w-full" />
        <span className="bg-card px-3 text-[11px] uppercase tracking-wider text-muted-foreground absolute font-mono">
          or with email
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-secondary-foreground mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-subtle-foreground" />
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              name="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="dev@devora.io"
              className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-secondary-foreground">
              Password
            </label>
            <button
              type="button"
              onClick={onSwitchToForgotPassword}
              className="text-xs text-primary hover:text-primary-hover hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-subtle-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={loading}
              className="rounded border-input bg-background accent-primary focus:ring-ring"
            />
            <span>Remember this device</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 py-3 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-600 hover:to-cyan-600 hover:shadow-indigo-600/50 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>{loading ? "Authenticating..." : "Sign In"}</span>
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-semibold text-primary hover:text-primary-hover hover:underline cursor-pointer"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

type LoginProps = {
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
};

export default function Login({
  onSwitchToRegister,
  onSwitchToForgotPassword,
}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Logged in successfully! Redirecting to feed...");
    }, 1200);
  };

  return (
    <div className="auth-step-login space-y-5 animate-fadeIn">
      {successMessage && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3.5 text-emerald-300 flex items-center gap-2 text-xs font-medium animate-fadeIn">
          <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Welcome back
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Sign in to your Devora developer account
        </p>
      </div>

      {/* Social OAuth Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/70 hover:bg-slate-800/70 py-2.5 px-3 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer"
        >
          <FaGithub className="h-4 w-4 text-white" />
          <span>GitHub</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/70 hover:bg-slate-800/70 py-2.5 px-3 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer"
        >
          <FcGoogle className="h-4 w-4" />
          <span>Google</span>
        </button>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-slate-800 w-full" />
        <span className="bg-slate-900 px-3 text-[11px] uppercase tracking-wider text-slate-500 absolute font-mono">
          or with email
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Email or Username
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dev@devora.io or @username"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Password
            </label>
            <button
              type="button"
              onClick={onSwitchToForgotPassword}
              className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Remember this device</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 py-3 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-600 hover:to-cyan-600 hover:shadow-indigo-600/50 transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <span>{loading ? "Authenticating..." : "Sign In"}</span>
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-xs text-slate-400">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}

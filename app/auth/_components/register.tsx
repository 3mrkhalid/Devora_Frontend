"use client";

import { useState, type FormEvent } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Check,
  Layers,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

type RegisterProps = {
  onSwitchToLogin: () => void;
};

export default function Register({ onSwitchToLogin }: RegisterProps) {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [primaryStack, setPrimaryStack] = useState("TypeScript");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(
        "Account created! Check your email to verify your handle."
      );
    }, 1200);
  };

  return (
    <div className="auth-step-register space-y-5 animate-fadeIn">
      {successMessage && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3.5 text-emerald-300 flex items-center gap-2 text-xs font-medium animate-fadeIn">
          <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Create Devora Account
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Join the social network built for software engineers
        </p>
      </div>

      {/* Social fast-track */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/70 hover:bg-slate-800/70 py-2.5 px-3 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer"
        >
          <FaGithub className="h-4 w-4 text-white" />
          <span>Join with GitHub</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/70 hover:bg-slate-800/70 py-2.5 px-3 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer"
        >
          <FcGoogle className="h-4 w-4" />
          <span>Join with Google</span>
        </button>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-slate-800 w-full" />
        <span className="bg-slate-900 px-3 text-[11px] uppercase tracking-wider text-slate-500 absolute font-mono">
          or manual register
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-9 pr-3 text-xs text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Handle / Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-500">
                @
              </span>
              <input
                type="text"
                required
                value={handle}
                onChange={(e) =>
                  setHandle(
                    e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "")
                  )
                }
                placeholder="adalovelace"
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-8 pr-3 text-xs font-mono text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ada@devora.io"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-9 pr-3 text-xs text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-9 pr-9 text-xs text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Primary Tech Stack Selection */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Primary Stack Hub
          </label>
          <div className="relative">
            <Layers className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <select
              value={primaryStack}
              onChange={(e) => setPrimaryStack(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-9 pr-4 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer"
            >
              <option value="TypeScript">TypeScript & Next.js</option>
              <option value="Python">Python & AI/LLMs</option>
              <option value="Rust">Rust & Systems</option>
              <option value="Go">Go & Cloud Native</option>
              <option value="FullStack">Full-Stack Engineering</option>
            </select>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-400">
            <input
              type="checkbox"
              required
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
            />
            <span>
              I agree to the Developer Code of Conduct, Terms of Service, and Privacy Policy.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 py-3 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-600 hover:to-cyan-600 hover:shadow-indigo-600/50 transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <span>{loading ? "Creating Profile..." : "Create Free Account"}</span>
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>

      <div className="text-center pt-1">
        <p className="text-xs text-slate-400">
          Already registered?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}

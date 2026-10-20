"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Menu,
  X,
  Search,
  Sparkles,
  Users,
  Compass,
  FileCode,
  Layers,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Feed", href: "#feed", icon: Compass },
    { name: "Features", href: "#features", icon: Layers },
    { name: "Hubs", href: "#hubs", icon: Users },
    { name: "Snippets", href: "#snippets", icon: FileCode },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0B0B0F] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl  p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="flex h-full w-full items-center justify-center ">
              <Code2 className="h-5 w-5 text-indigo-200 group-hover:text-cyan-300 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                Devora
              </span>

            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-150"
              >
                <Icon className="h-4 w-4 text-slate-400" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Search Mock & Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              readOnly
              placeholder="Search developers, tags, repos..."
              className="w-56 xl:w-64 rounded-full border border-slate-800 bg-[#0B0B0F] py-1.5 pl-9 pr-8 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            />
            <kbd className="absolute right-2.5 top-2 rounded bg-slate-800 px-1.5 text-[10px] font-mono text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* User Auth CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#join"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-2 py-1.5"
          >
            Sign in
          </a>
          <a
            href="#join"
            className="relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-600/30 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-indigo-600/50 transition-all duration-200 active:scale-95"
          >
            
            <span>Join Devora</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-6 space-y-3">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              readOnly
              placeholder="Search Devora..."
              className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 pl-9 pr-4 text-sm text-slate-200 placeholder:text-slate-500"
            />
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white"
                >
                  <Icon className="h-5 w-5 text-indigo-400" />
                  {link.name}
                </a>
              );
            })}
          </div>
          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href="#join"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg border border-slate-700 text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              Sign In
            </a>
            <a
              href="#join"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-indigo-600 text-sm font-semibold text-white shadow-md shadow-indigo-600/30"
            >
              Get Started Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

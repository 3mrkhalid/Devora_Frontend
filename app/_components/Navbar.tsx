"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Menu,
  X,
  Search,
  Users,
  Compass,
  FileCode,
  Layers,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Feed", href: "#feed", icon: Compass },
    { name: "Features", href: "#features", icon: Layers },
    { name: "Hubs", href: "#hubs", icon: Users },
    { name: "Snippets", href: "#snippets", icon: FileCode },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl  p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200 ">
            <div className="flex h-full w-full items-center justify-center ">
              <Code2 className="h-5 w-5 text-white transition-colors " />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-foreground transition-colors">
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
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-150 hover:bg-muted hover:text-foreground"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Search Mock & Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-subtle-foreground" />
            <input
              type="text"
              readOnly
              placeholder="Search developers, tags, repos..."
              className="w-56 xl:w-64 cursor-pointer rounded-full border border-input bg-background py-1.5 pl-9 pr-8 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <kbd className="absolute right-2.5 top-2 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Theme Toggle, Auth CTAs & Mobile menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <Link
            href="/auth?mode=register"
            className="relative hidden sm:inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-600/30 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-indigo-600/50 transition-all duration-200 active:scale-95"
          >
            <span>Join Devora</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
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
        <div className="space-y-3 border-b border-border bg-background px-4 pt-2 pb-6 md:hidden">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-subtle-foreground" />
            <input
              type="text"
              readOnly
              placeholder="Search Devora..."
              className="w-full rounded-lg border border-input bg-muted py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground"
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
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  {link.name}
                </a>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 border-t border-border pt-4">

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

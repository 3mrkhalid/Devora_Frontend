"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  CheckCircle2,
  Terminal,
} from "lucide-react";

const TYPEWRITER_WORDS = [
  "Developers",
  "Students",
  "Engineers",
  "Creators",
  "Programmers",
] as const;

const TYPING_INTERVAL_MS = 100;
const DELETING_INTERVAL_MS = 50;
const WORD_COMPLETE_PAUSE_MS = 1000;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export default function HeroSection() {
  // Render the first word immediately so the hero never flashes an empty line
  // before the client-side typewriter takes over.
  const [animatedWord, setAnimatedWord] = useState<string>(
    TYPEWRITER_WORDS[0]
  );
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let cancelled = false;

    async function runTypewriter() {
      // Defer the first update so the effect never triggers a synchronous
      // cascading render (and Strict Mode can cancel the first pass cleanly).
      await sleep(0);
      if (cancelled) return;

      if (prefersReducedMotion.matches) return;

      let wordIndex = 0;
      await sleep(WORD_COMPLETE_PAUSE_MS);

      while (!cancelled) {
        const currentWord = TYPEWRITER_WORDS[wordIndex];

        for (let i = currentWord.length; i >= 0; i -= 1) {
          if (cancelled) return;
          setAnimatedWord(currentWord.slice(0, i));
          await sleep(DELETING_INTERVAL_MS);
        }

        wordIndex = (wordIndex + 1) % TYPEWRITER_WORDS.length;
        const nextWord = TYPEWRITER_WORDS[wordIndex];

        for (let i = 1; i <= nextWord.length; i += 1) {
          if (cancelled) return;
          setAnimatedWord(nextWord.slice(0, i));
          await sleep(TYPING_INTERVAL_MS);
        }

        if (cancelled) return;
        await sleep(WORD_COMPLETE_PAUSE_MS);
        if (cancelled) return;
      }
    }

    void runTypewriter();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let frame = 0;

    const resetPointer = () => {
      cancelAnimationFrame(frame);
      section.style.setProperty("--pointer-x", "0");
      section.style.setProperty("--pointer-y", "0");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (
        event.pointerType !== "mouse" ||
        !finePointer.matches ||
        reducedMotion.matches
      ) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        section.style.setProperty("--pointer-x", x.toFixed(3));
        section.style.setProperty("--pointer-y", y.toFixed(3));
      });
    };

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", resetPointer);
    section.addEventListener("pointercancel", resetPointer);
    reducedMotion.addEventListener("change", resetPointer);
    finePointer.addEventListener("change", resetPointer);

    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", resetPointer);
      section.removeEventListener("pointercancel", resetPointer);
      reducedMotion.removeEventListener("change", resetPointer);
      finePointer.removeEventListener("change", resetPointer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="hero-shell relative isolate flex w-full items-center justify-center overflow-hidden border-b border-border bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      {/* Atmosphere: radial light, technical grid, orbital lines. */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >


        {/* Wide, thin ellipse gives the gallery a sense of orbit. */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[min(1180px,150vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-border/40" />
        <div className="absolute left-1/2 top-1/2 h-[720px] w-[min(1580px,190vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-border/25" />

        <div className="hero-orbit absolute left-1/2 top-1/2 h-[440px] w-[440px] rounded-full border border-border/50 sm:h-[580px] sm:w-[580px] lg:h-[620px] lg:w-[620px]">
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/90 shadow-[0_0_16px_rgba(129,140,248,0.9)]" />
        </div>
        <div className="hero-orbit hero-orbit-reverse absolute left-1/2 top-1/2 h-[700px] w-[700px] rounded-full border border-border/35 sm:h-[860px] sm:w-[860px] lg:h-[920px] lg:w-[920px]">
          <span className="absolute left-[10%] top-[24%] h-1 w-1 rounded-full bg-cyan-400/80 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[1040px] w-[1040px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/20 sm:h-[1240px] sm:w-[1240px]">
          <span className="absolute bottom-[12%] right-[18%] h-1 w-1 rounded-full bg-emerald-400/70 shadow-[0_0_14px_rgba(52,211,153,0.7)]" />
        </div>
      </div>

      <div
        className="hero-vignette pointer-events-none absolute inset-0 z-20"
        aria-hidden="true"
      />

      <div className="relative z-30 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div
          className="hero-halo pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[min(94vw,880px)] -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        />

        <div className="relative z-10 flex w-full flex-col items-center">
          <div
            className="mb-7 flex items-center justify-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-primary/60 sm:w-14" />
            <span className="hero-spark relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-primary/30 blur-[4px]" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-primary/60 sm:w-14" />
          </div>

          <h1
            id="hero-heading"
            aria-label="The Social Network Built for Developers"
            className="mx-auto max-w-3xl text-[clamp(1.9rem,9vw,4.9rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-foreground"
          >
            <span aria-hidden="true">
              <span className="block text-balance">The Social Network</span>
              <span className="block text-balance">Built for</span>
              <span className="hero-typewriter-word relative mt-1 block min-h-[1.08em] text-primary">
                <span className="inline-block">{animatedWord}</span>
                <span className="typewriter-cursor ml-1 inline-block h-[0.82em] w-[0.06em] min-w-[3px] translate-y-[0.04em] rounded-full bg-primary align-baseline shadow-[0_0_18px_rgba(129,140,248,0.65)]" />
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-pretty text-[0.95rem] font-normal leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg">
            Devora is the vibrant home where engineers connect, share runnable
            code snippets, launch side projects, get feedback, and find their
            next co-founder or mentor.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
            <a
              href="#join"
              className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-indigo-500 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(79,70,229,0.85)] ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-18px_rgba(79,70,229,0.95)] active:translate-y-0 sm:w-auto sm:py-4 sm:text-base"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
              <span className="relative">Join Developer Community</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            <a
              href="#feed"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3.5 text-sm font-medium text-foreground shadow-sm shadow-slate-900/5 backdrop-blur-md transition-colors duration-300 hover:bg-muted sm:w-auto sm:py-4 sm:text-base"
            >
              <Terminal className="h-4 w-4 text-cyan-600 transition-colors group-hover:text-cyan-500 dark:text-cyan-400" />
              <span>Explore Live Feed</span>
            </a>
          </div>

          <div className="mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[11px] text-muted-foreground sm:mt-10 sm:text-xs">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Free forever for open source</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Native Markdown &amp; Syntax Highlighting</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Zero recruiter spam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

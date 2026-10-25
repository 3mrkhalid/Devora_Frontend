"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  CheckCircle2,
  Terminal,
  Zap,
  Flame,
  GitFork,
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
  const [activeTab, setActiveTab] = useState<"ts" | "py" | "rs">("ts");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(184);
  const [animatedWord, setAnimatedWord] = useState("");

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

      if (prefersReducedMotion.matches) {
        setAnimatedWord(TYPEWRITER_WORDS[0]);
        return;
      }

      let wordIndex = 0;

      while (!cancelled) {
        const word = TYPEWRITER_WORDS[wordIndex];

        for (let i = 1; i <= word.length; i += 1) {
          if (cancelled) return;
          setAnimatedWord(word.slice(0, i));
          await sleep(TYPING_INTERVAL_MS);
        }

        if (cancelled) return;
        await sleep(WORD_COMPLETE_PAUSE_MS);
        if (cancelled) return;

        for (let i = word.length; i >= 0; i -= 1) {
          if (cancelled) return;
          setAnimatedWord(word.slice(0, i));
          await sleep(DELETING_INTERVAL_MS);
        }

        wordIndex = (wordIndex + 1) % TYPEWRITER_WORDS.length;
      }
    }

    void runTypewriter();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const codeSnippets = {
    ts: `// Devora Realtime Pair & Snippet Share
import { DevoraCommunity, type Peer } from "@devora/core";

export async function connectSquad(roomId: string) {
  const room = await DevoraCommunity.join({
    channel: "typescript-architects",
    mode: "live-collab",
    audioSync: true,
  });

  room.on("member:codeShare", (snippet) => {
    console.log(\`⚡ Received live snippet from \${snippet.author}\`);
  });
}`,
    py: `# Devora AI/Agent Stream Pipeline
from devora.community import HubStream, AgentRoom

async def stream_neural_insights():
    hub = await HubStream.connect(topic="deep-learning")
    print("🔥 Connected to 2,400 AI developers")
    
    async for post in hub.live_feed(filter="verified_code"):
        await post.synthesize_feedback()`,
    rs: `// High-performance concurrency thread on Devora
use devora_network::{DeveloperSocket, HubEvent};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut channel = DeveloperSocket::connect("systems-rust").await?;
    println!("🦀 Rustaceans online: 8,421");
    channel.broadcast_snippet("zero-cost-parser").await?;
    Ok(())
}`,
  };

  return (
    <section className="relative overflow-hidden bg-background pt-12 pb-16 md:pt-20 md:pb-40">
      {/* Background ambient light gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px]  pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72  pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Hero Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">

            {/* Live badge */}
            {/*<div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1.5 text-xs font-medium text-indigo-300 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Devora 1.0 is live</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300 flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 inline" /> 14,290 devs online
              </span>
            </div>*/}

            {/* Main Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]"
              aria-label="The Social Network Built for Developers"
            >
              <span aria-hidden="true">
                The Social Network <br className="hidden sm:inline" />
                Built for {" "}
                <span className="min-w-[10ch] text-left text-primary sm:min-w-[11ch]">
                  {animatedWord}
                  <span className="inline-block typewriter-cursor ml-0.5 h-[1em] w-[3px] rounded-full bg-primary align-middle" />
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
              Devora is the vibrant home where engineers connect, share runnable code snippets, launch side projects, get feedback, and find their next co-founder or mentor.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
              <a
                href="#join"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Join Developer Community</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#feed"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm sm:text-base font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Terminal className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Explore Live Feed</span>
              </a>


            </div>

            {/* Micro trust indicators */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Free forever for open source</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Native Markdown & Syntax Highlighting</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero recruiter spam</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Interactive Devora Post Preview Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl border border-border bg-card/90 p-5 shadow-xl backdrop-blur-xl dark:shadow-2xl">

              {/* Card top banner: Author info */}
              <div className="flex items-start justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-11 w-11 rounded-full  flex items-center justify-center text-primary dark:text-white font-bold text-sm shadow-md">
                      AK
                    </div>
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-card" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-card-foreground text-sm">Alex Rivera</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      <span className="text-muted-foreground text-xs">@alexdev</span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span>Staff Systems Engineer</span>
                      <span>•</span>
                      <span className="text-primary font-medium">Rank #14</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                  <Flame className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span>Trending</span>
                </div>
              </div>

              {/* Post Content */}
              <div className="mt-3.5 space-y-3">
                <p className="text-card-foreground text-sm leading-relaxed">
                  Just rolled out our new distributed synchronization protocol on <span className="text-cyan-600 dark:text-cyan-400 font-mono">#Devora</span>. Check this out and feel free to fork it directly into your stack! 🚀
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-xs font-mono text-indigo-700 border border-indigo-500/20 dark:text-indigo-300">
                    #typescript
                  </span>
                  <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-xs font-mono text-cyan-700 border border-cyan-500/20 dark:text-cyan-300">
                    #distributed
                  </span>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-mono text-emerald-700 border border-emerald-500/20 dark:text-emerald-300">
                    #opensource
                  </span>
                </div>

                {/* Code Block with interactive language switcher */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/90 overflow-hidden font-mono text-xs">
                  {/* Code block header */}
                  <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/60 px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-[11px] text-slate-400 font-sans">
                        sync-hub.{activeTab}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-md border border-slate-800">
                      {(["ts", "py", "rs"] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold transition-colors ${activeTab === tab
                            ? "bg-indigo-600 text-white"
                            : "text-slate-400 hover:text-slate-200"
                            }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Code snippet text */}
                  <pre className="p-3.5 text-slate-300 overflow-x-auto text-[11px] leading-relaxed max-h-48 scrollbar-thin">
                    <code>{codeSnippets[activeTab]}</code>
                  </pre>
                </div>

                {/* Card Interaction Footer */}
                <div className="flex items-center justify-between pt-2 text-muted-foreground text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-1.5 transition-colors ${liked ? "text-rose-600 font-semibold dark:text-rose-400" : "hover:text-rose-600 dark:hover:text-rose-400"
                        }`}
                    >
                      <Heart className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
                      <span>{likeCount}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span>38</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      <GitFork className="h-4 w-4" />
                      <span>19</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="hover:text-foreground transition-colors" title="Bookmark">
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button className="hover:text-foreground transition-colors" title="Share">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Sub-card floating badge */}
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
              <span>Interactive preview — click tabs or like the snippet!</span>
            </div>
          </div>

        </div>

        {/* Global Developer Metrics Strip */}
        <div className="mt-16 sm:mt-24 rounded-2xl border border-border bg-card p-6 backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground">120K+</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Active Developers</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">450K+</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Runnable Snippets</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">1,400+</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Tech Hubs & Squads</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">95M+</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Monthly Code Views</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Terminal,
  ExternalLink,
  Flame,
  CheckCircle,
  Filter,
  Code2,
  Rocket,
  HelpCircle,
} from "lucide-react";

interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    role: string;
    avatar: string;
    verified: boolean;
  };
  category: "snippet" | "launch" | "question";
  time: string;
  content: string;
  codeSnippet?: {
    lang: string;
    code: string;
  };
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
}

export default function CommunityFeedPreview() {
  const [filter, setFilter] = useState<"all" | "snippet" | "launch" | "question">("all");
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const samplePosts: Post[] = [
    {
      id: "post-1",
      author: {
        name: "Elena Rostova",
        handle: "elenacodes",
        role: "Senior Frontend Engineer",
        avatar: "ER",
        verified: true,
      },
      category: "snippet",
      time: "12m ago",
      content:
        "Here is a neat clean custom hook for debouncing asynchronous API queries with React 19 and automatic abort signals. Works like magic in high-throughput searchbars!",
      codeSnippet: {
        lang: "typescript",
        code: `export function useDebouncedSearch(query: string, delay = 300) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      const res = await fetch(\`/api/search?q=\${query}\`, { signal: controller.signal });
      setResults(await res.json());
    }, delay);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, delay]);

  return results;
}`,
      },
      tags: ["#react", "#typescript", "#webdev", "#performance"],
      likes: 247,
      comments: 32,
      shares: 19,
    },
    {
      id: "post-2",
      author: {
        name: "Marcus Vance",
        handle: "marcus_v",
        role: "Full-Stack Creator & OSS Builder",
        avatar: "MV",
        verified: true,
      },
      category: "launch",
      time: "45m ago",
      content:
        "🚀 Just open-sourced 'PrismDB' — a lightweight in-memory cache engine written in Go with automatic TTL and Raft clustering. Looking for feedback and contributors on our first milestone!",
      tags: ["#golang", "#database", "#opensource", "#showdev"],
      likes: 512,
      comments: 64,
      shares: 88,
    },
    {
      id: "post-3",
      author: {
        name: "Kavya Patel",
        handle: "kavyaml",
        role: "AI Systems Researcher",
        avatar: "KP",
        verified: true,
      },
      category: "question",
      time: "2h ago",
      content:
        "Architectural question for folks running local LLMs in production: How are you managing GPU memory fragmentation when batch sizes dynamically fluctuate? Are you relying on vLLM paged attention or custom CUDA kernels?",
      tags: ["#ai", "#llm", "#cuda", "#architecture"],
      likes: 189,
      comments: 47,
      shares: 15,
    },
  ];

  const filteredPosts =
    filter === "all" ? samplePosts : samplePosts.filter((p) => p.category === filter);

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="feed" className="py-24 bg-[#0B0B0F] relative border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-pattern opacity-60 pointer-events-none" />
        {/* Section title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              <Flame className="w-4 h-4" />
              <span>Live Pulse</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              What developers are sharing right now
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Real code, actual project launches, and meaningful technical conversations.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 bg-slate-90/70 border border-slate-800 p-1 rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setFilter("all")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === "all"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>All Posts</span>
            </button>
            <button
              onClick={() => setFilter("snippet")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === "snippet"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Snippets</span>
            </button>
            <button
              onClick={() => setFilter("launch")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === "launch"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Launches</span>
            </button>
            <button
              onClick={() => setFilter("question")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === "question"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Tech Q&A</span>
            </button>
          </div>
        </div>

        {/* Post Feed List */}
        <div className="space-y-6">
          {filteredPosts.map((post) => {
            const isLiked = !!likedPosts[post.id];
            const currentLikes = isLiked ? post.likes + 1 : post.likes;

            return (
              <article
                key={post.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6 hover:border-slate-700/80 transition-all duration-200 max-w-4xl mx-auto"
              >
                {/* Author row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xs shadow">
                      {post.author.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white text-sm">
                          {post.author.name}
                        </span>
                        {post.author.verified && (
                          <CheckCircle className="h-3.5 w-3.5 text-indigo-400" />
                        )}
                        <span className="text-slate-400 text-xs">@{post.author.handle}</span>
                        <span className="text-slate-600 text-xs hidden sm:inline">•</span>
                        <span className="text-slate-400 text-xs hidden sm:inline">{post.time}</span>
                      </div>
                      <p className="text-xs text-slate-400">{post.author.role}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono capitalize px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                    {post.category}
                  </span>
                </div>

                {/* Content body */}
                <p className="mt-4 text-slate-200 text-sm leading-relaxed">
                  {post.content}
                </p>

                {/* Code block if present */}
                {post.codeSnippet && (
                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-3.5 py-1.5 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                        <span>snippet.{post.codeSnippet.lang === "typescript" ? "ts" : "code"}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        {post.codeSnippet.lang}
                      </span>
                    </div>
                    <pre className="p-4 text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
                      <code>{post.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Engagement bar */}
                <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        isLiked ? "text-rose-400 font-semibold" : "hover:text-rose-400"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isLiked ? "fill-rose-500 text-rose-500 scale-110" : ""
                        }`}
                      />
                      <span>{currentLikes}</span>
                    </button>

                    <button className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments} comments</span>
                    </button>

                    <button className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </button>
                  </div>

                  <a
                    href="#join"
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                  >
                    <span>View full thread</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* View full live feed prompt */}
        <div className="mt-8 text-center">
          <a
            href="#join"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span>Explore 14,000+ More Live Posts on Devora</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

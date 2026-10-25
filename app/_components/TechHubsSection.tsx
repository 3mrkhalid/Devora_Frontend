import {
  Users,
  TrendingUp,
  Cpu,
  Layers,
  Terminal,
  Bot,
  Cloud,
  Smartphone,
  ArrowRight,
} from "lucide-react";

export default function TechHubsSection() {
  const hubs = [
    {
      title: "Rust & Systems",
      icon: Terminal,
      members: "28.4K",
      postsToday: 142,
      trendingTopic: "Zero-cost abstractions in WebAssembly",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
      tag: "#rust",
    },
    {
      title: "AI & Neural Agents",
      icon: Bot,
      members: "42.1K",
      postsToday: 310,
      trendingTopic: "Local reasoning models with quantized GGUF",
      color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400",
      tag: "#ai",
    },
    {
      title: "Frontend Architects",
      icon: Layers,
      members: "51.8K",
      postsToday: 280,
      trendingTopic: "React 19 Server Actions & Compiler internals",
      color: "from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400",
      tag: "#react",
    },
    {
      title: "Go & Microservices",
      icon: Cpu,
      members: "31.5K",
      postsToday: 165,
      trendingTopic: "Handling 100k WebSockets with Goroutines",
      color: "from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-600 dark:text-teal-400",
      tag: "#golang",
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      members: "24.9K",
      postsToday: 118,
      trendingTopic: "Kubernetes autoscaling on spot instances",
      color: "from-sky-500/20 to-indigo-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400",
      tag: "#devops",
    },
    {
      title: "Mobile Engineers",
      icon: Smartphone,
      members: "19.3K",
      postsToday: 89,
      trendingTopic: "SwiftUI vs React Native architecture in 2026",
      color: "from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400",
      tag: "#mobile",
    },
  ];

  return (
    <section id="hubs" className="relative border-t border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-pattern opacity-60 pointer-events-none" />
        
        {/* Section title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
              <Users className="w-4 h-4" />
              <span>Specialized Communities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Find your tech stack squad
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Join focused tech hubs tailored to the specific languages, frameworks, and architecture patterns you love.
            </p>
          </div>

          <a
            href="#join"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            <span>Browse all 1,400+ Hubs</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hubs.map((hub, idx) => {
            const Icon = hub.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-primary/30 hover:bg-muted dark:shadow-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`h-11 w-11 rounded-xl bg-gradient-to-br ${hub.color} flex items-center justify-center border`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border">
                      {hub.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {hub.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-subtle-foreground" />
                      {hub.members} devs
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {hub.postsToday} posts today
                    </span>
                  </div>

                  <div className="mt-4 rounded-lg bg-elevated border border-border p-2.5 text-xs text-card-foreground">
                    <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                      Hot discussion:
                    </span>
                    <p className="mt-0.5 line-clamp-1 italic text-card-foreground">
                      &ldquo;{hub.trendingTopic}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Active moderator team</span>
                  <a
                    href="#join"
                    className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors flex items-center gap-1"
                  >
                    <span>Join Squad</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

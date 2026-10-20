import {
  Code,
  Rocket,
  Users2,
  Cpu,
  GitPullRequest,
  HelpCircle,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Code,
      badge: "Code-First",
      badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      title: "Interactive Code Posts & Snippets",
      description:
        "Share code with syntax highlighting for 100+ languages. Fork snippets with one click, run tests directly in the browser, and comment on specific lines of code.",
      highlights: ["Multi-language syntax support", "Browser sandbox runner", "Line-by-line review comments"],
    },
    {
      icon: Rocket,
      badge: "Showcase",
      badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      title: "Side-Project Launchpad",
      description:
        "Built something cool? Launch your side project to a community of passionate builders who will give honest technical feedback, test your APIs, and star your repo.",
      highlights: ["Demo embeds & live previews", "Technical feedback threads", "Early adopter signups"],
    },
    {
      icon: Users2,
      badge: "Communities",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      title: "Curated Tech Stack Hubs",
      description:
        "Tired of generic social media noise? Immerse yourself in specialized hubs for TypeScript, Rust, Next.js, Python, DevOps, and LLMs where every post is relevant.",
      highlights: ["Dedicated moderation by seniors", "Filtered by skill level", "Stack-specific challenges"],
    },
    {
      icon: Cpu,
      badge: "Realtime",
      badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      title: "Live Pair-Coding Rooms",
      description:
        "Jump into synchronized coding spaces with voice audio to debug tricky issues, practice system design, or co-build open-source libraries in real time.",
      highlights: ["Zero-latency shared editor", "Integrated voice & screen audio", "Instant room invite links"],
    },
    {
      icon: GitPullRequest,
      badge: "Identity",
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      title: "Verified Developer Profiles",
      description:
        "Link your GitHub, GitLab, and personal projects. Your Devora profile displays verified pull requests, real commit streaks, and skill badges earned through community contributions.",
      highlights: ["GitHub stats integration", "Earned achievement badges", "Interactive dev portfolio"],
    },
    {
      icon: HelpCircle,
      badge: "Mentorship",
      badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      title: "Async Q&A & Mentorship",
      description:
        "Need advice on microservices or transitioning to staff engineer? Ask thoughtful questions, receive nuanced answers, and connect with experienced mentors.",
      highlights: ["Threaded discussions", "Accepted answers with bounty points", "1-on-1 mentorship matching"],
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#0B0B0F] border-t border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-pattern opacity-60 pointer-events-none" />
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineered For Developers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything you need to network, share, and build.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Social media shouldn&apos;t be endless doomscrolling. Devora gives you signal, tools, and genuine technical connections.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-slate-800 bg-[#0B0B0F] p-7 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge and Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 group-hover:border-indigo-500/40 group-hover:bg-indigo-600/10 transition-colors">
                      <Icon className="h-6 w-6 text-indigo-400 group-hover:text-cyan-300 transition-colors" />
                    </div>
                    <span
                      className={`text-xs font-mono font-medium px-2.5 py-0.5 rounded-full border ${feature.badgeColor}`}
                    >
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2">
                  {feature.highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

import { Star, Quote, Award, Terminal, Heart } from "lucide-react";

export default function StatsAndTestimonials() {
  const testimonials = [
    {
      name: "Tariq Mansour",
      role: "Staff Engineer @ FinTech Scaleup",
      avatar: "TM",
      handle: "@tmansour",
      content:
        "Devora is what Twitter for developers should have been from day one. When I share architectural trade-offs here, I get actual technical feedback from practitioners, not marketing spam.",
      metric: "Found 2 core contributors for his OSS library",
    },
    {
      name: "Sophia Chen",
      role: "Full-Stack Dev & Indie Maker",
      avatar: "SC",
      handle: "@sophiacodes",
      content:
        "I launched my open-source developer tool on Devora's Show Launchpad. Within 48 hours, I had 1,200 GitHub stars, 45 pull requests, and valuable bug reports from senior devs.",
      metric: "Ranked #1 product of the week",
    },
    {
      name: "Liam O'Connor",
      role: "Junior Systems Engineer",
      avatar: "LO",
      handle: "@liam_rust",
      content:
        "The async mentorship on Devora changed my career trajectory. Senior Rustaceans took time to review my memory management patterns and helped me pass my FAANG technical interview.",
      metric: "Landed junior systems role in 3 months",
    },
  ];

  return (
    <section className="py-24 bg-[#0B0B0F] border-t border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-pattern opacity-60 pointer-events-none" />
        
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Heart className="w-3.5 h-3.5 fill-emerald-400/20" />
            <span>Community Voices</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Loved by builders and engineers
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Hear how developers use Devora to share knowledge, discover opportunities, and ship better code.
          </p>
        </div>

        {/* Testimonials cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/35 p-7 flex flex-col justify-between hover:border-slate-700 transition-colors relative"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <Quote className="h-8 w-8 text-slate-700 mb-3" />

                <p className="text-slate-300 text-sm leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800/80">
                {/* Metric achievement */}
                <div className="mb-4 inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-800/40">
                  <Award className="w-3.5 h-3.5" />
                  <span>{t.metric}</span>
                </div>

                {/* Author profile */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-white text-xs">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{t.name}</h4>
                    <p className="text-xs text-slate-400">{t.role}</p>
                    <span className="text-[11px] text-slate-500 font-mono">{t.handle}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

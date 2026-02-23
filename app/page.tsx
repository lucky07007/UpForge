import { Button } from "@/components/ui/button";
import { Clock, MessageCircle, Search, Plus, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* ========== HERO WITH APP MOCKUP ========== */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* LEFT TEXT */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-black/20"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  EST. 2025 — BUILDING STARTUP ECOSYSTEM
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9]">
                Transform your <br />
                <span className="text-gray-500 italic font-medium">startup journey</span> <br />
                with UpForge
              </h1>
              <p className="text-xl text-gray-400 max-w-md">
                UpForge empowers founders, investors, and teams to discover, sponsor, and track the most promising startups.
              </p>
              <p className="text-lg text-gray-600">
                Join thousands of innovators shaping the future of tech.
              </p>
              <div className="flex gap-4 pt-4">
                <Button className="rounded-full px-8 h-12 bg-black text-white hover:bg-gray-800 text-xs font-bold uppercase tracking-wider">
                  Get Started
                </Button>
                <Button variant="outline" className="rounded-full px-8 h-12 border-black/20 text-xs font-bold uppercase tracking-wider">
                  Download App
                </Button>
              </div>
            </div>

            {/* RIGHT MOCKUP - APP INTERFACE */}
            <div className="bg-gray-50 rounded-2xl border border-black/10 shadow-2xl overflow-hidden">
              <div className="bg-white border-b border-black/5 px-4 py-2 flex items-center gap-2 text-xs text-gray-500">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-2 font-mono">UpForge — Dashboard</span>
              </div>
              <div className="grid grid-cols-[220px_1fr_240px] h-[500px] text-xs">
                {/* Left Sidebar */}
                <div className="bg-gray-50/80 border-r border-black/5 p-4 space-y-6">
                  <div className="font-bold text-lg">UpForge</div>
                  <div className="space-y-1">
                    {['Startups', 'Investments', 'Sponsors', 'Analytics', 'Portfolio', 'Insights', 'News', 'Resources'].map(item => (
                      <div key={item} className="px-2 py-1.5 rounded hover:bg-black/5 cursor-default">
                        {item}
                      </div>
                    ))}
                    <div className="px-2 py-1.5 text-gray-400">More &gt;</div>
                  </div>
                  <div className="pt-4 border-t border-black/5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-black/10"></div>
                      <span className="font-mono">Admin</span>
                    </div>
                  </div>
                </div>

                {/* Main Feed */}
                <div className="bg-white p-4 space-y-4 overflow-y-auto">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>9:00 AM - IST</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="font-medium">New Startup Added</div>
                    <div className="text-sm">Check out this innovative AI startup transforming remote work.</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                      <div className="flex-1 bg-gray-100 p-2 rounded">A: Amazing potential, will sponsor soon.</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                      <div className="flex-1 bg-gray-100 p-2 rounded">M: +1 for AI integration.</div>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="bg-gray-50/80 border-l border-black/5 p-4 space-y-4 text-[11px]">
                  <div className="space-y-2">
                    <div className="font-bold">Mission & Vision</div>
                    <div className="text-gray-500">Empower global startups</div>
                    <div className="text-gray-500">Provide trusted sponsorship</div>
                  </div>
                  <div className="bg-white p-3 rounded border border-black/5">
                    Welcome to UpForge! Explore startups, connect with founders, and sponsor innovation.
                  </div>
                  <div>
                    <div className="font-bold">Team</div>
                    <div className="text-gray-500 text-[10px]">Discover our startup ecosystem contributors.</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span>4</span> <Plus className="h-3 w-3" /> <span>members</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div>Onboarding Guide</div>
                      <div>Meet the team</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECOND MOCKUP / QUOTE ========== */}
      <section className="py-20 px-6 bg-gray-50 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white rounded-xl border border-black/10 p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span className="font-bold">Acme Inc.</span>
                <span className="text-gray-400">© UpForge</span>
                <MessageCircle className="h-4 w-4 ml-auto" />
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-4">
                <div className="space-y-2">
                  <div className="font-medium">Discussions</div>
                  <div className="text-gray-500">My private docs</div>
                  <div className="border-t my-2"></div>
                  <div className="font-medium">Channels</div>
                  <div>General</div>
                  <div>Company Wiki</div>
                  <div>Mission, vision, values</div>
                  <div>Remote work setup</div>
                  <div>Policies & perks</div>
                  <div>Strategy</div>
                  <div>Updates</div>
                </div>
                <div>
                  <div className="text-lg font-bold">All your startup updates in one place.</div>
                  <p className="text-sm text-gray-600 mt-2">Track, sponsor, and connect with promising startups easily.</p>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="rounded-full text-xs">Get started</Button>
                    <Button size="sm" variant="outline" className="rounded-full text-xs">Download the app</Button>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-gray-400">
                    <MessageCircle className="h-4 w-4" /> Discussions
                    <Search className="h-4 w-4 ml-2" /> Find anything
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <blockquote className="text-2xl italic">
                “UpForge connects startups, sponsors, and innovators, making discovery and support seamless. The ecosystem grows stronger with every decision taken transparently and efficiently.”
                <footer className="mt-4 text-sm not-italic font-bold">— SEBASTIEN GENDREAU <span className="font-normal text-gray-500">POOF AGORAPULSE</span></footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ========== COMMUNICATE WHERE WORK HAPPENS ========== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-4">Connect, Sponsor, Track.</h2>
          <p className="text-xl text-gray-400 mb-16">All your startup ecosystem activity in one place.</p>

          <div className="bg-white border border-black/10 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-[240px_1fr_260px] h-[450px] text-sm">
              {/* Left */}
              <div className="bg-gray-50 p-4 border-r border-black/5">
                <div className="font-bold mb-4">Acme</div>
                <div className="text-gray-500">Marketing / Q1 Initiatives</div>
                <div className="mt-6 flex items-center gap-2 text-gray-400">
                  <Search className="h-4 w-4" /> Find anything
                </div>
                <div className="mt-4">
                  <div className="font-medium">Channels</div>
                  <div className="font-medium mt-2">Discussions</div>
                </div>
              </div>

              {/* Center */}
              <div className="p-4 overflow-y-auto">
                <div className="font-bold text-lg">Goals & planning</div>
                <p className="text-sm text-gray-600 mt-2">Highlight the most promising startups and plan sponsorships effectively.</p>
                <div className="mt-4 space-y-3">
                  <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                    <div className="font-medium">AI Startup Spotlight!</div>
                    <div className="text-xs">Review and sponsor the top innovative teams in Q1.</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <div className="font-medium">Outreach Campaigns</div>
                  </div>
                  <div className="p-3 border-l-2 border-black">
                    <div className="font-medium">Analytics Dashboard</div>
                    <div>Track engagements, metrics, and startup growth</div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="bg-gray-50 p-4 border-l border-black/5">
                <div className="font-bold">Tasks</div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2"><Plus className="h-3 w-3" /> Interview founders for sponsorship</div>
                  <div className="border-t my-2"></div>
                  <div>Projects</div>
                  <div>Investment Planning</div>
                  <div>Growth Updates</div>
                  <div>Metrics</div>
                  <div>Templates</div>
                </div>
                <div className="mt-6 text-xs text-gray-500">Assign tasks, track progress, and collaborate with the right people.</div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg">Flexible plans for startups & investors.</p>
            <div className="flex justify-center gap-8 mt-6">
              <div className="text-left">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-gray-400"> /month</span>
                <p className="text-xs uppercase tracking-wider mt-1">Starter</p>
              </div>
              <div className="text-left">
                <span className="text-3xl font-bold">$6</span>
                <span className="text-gray-400"> /month per user</span>
                <p className="text-xs uppercase tracking-wider mt-1">Pro Plan</p>
              </div>
            </div>
            <Button className="mt-8 rounded-full px-10 bg-black text-white hover:bg-gray-800">Compare all plans &gt;</Button>
          </div>
        </div>
      </section>

      {/* ========== FEATURES GRID ========== */}
      <section className="py-20 px-6 bg-gray-50 border-y border-black/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest mb-4">Core Features:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {["Verified Startups", "Sponsored Startups", "Investor Insights", "AI Recommendations", "Collaboration Tools", "Analytics Dashboard", "Portfolio Management", "Flexible Plans"].map((feat) => (
              <div key={feat} className="bg-white p-4 rounded-lg border border-black/5 shadow-sm">
                <Check className="h-4 w-4 text-green-600 mx-auto mb-2" />
                {feat}
              </div>
            ))}
          </div>
          <Button variant="link" className="mt-8 text-black">See all features →</Button>
        </div>
      </section>

      {/* ========== TESTIMONIALS WALL ========== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-16 text-center">
            What our users say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "FLORENT MERIAN", role: "DYNAMICSCREEN", text: "UpForge helps me track the most promising startups. I feel more connected to the ecosystem than ever." },
              { name: "HAMPUS PERSSON", role: "VAAM", text: "The dashboard is intuitive, clean, and makes startup sponsorship extremely easy." },
              { name: "ERIC FETTNER", role: "THE JOB SAUCE", text: "The platform gives me exactly what I need to make quick, informed decisions without clutter." },
            ].map((t, i) => (
              <div key={i} className="p-6 border border-black/5 rounded-xl hover:shadow-lg transition">
                <p className="text-sm italic mb-4">“{t.text}”</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="link" className="text-black">Read more reviews →</Button>
          </div>
        </div>
      </section>

      {/* ========== TEMPLATES ========== */}
      <section className="py-20 px-6 bg-gray-50 border-y border-black/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-display font-bold tracking-tighter mb-2">Get started with a template</h2>
          <p className="text-gray-400 mb-10">Jumpstart your startup workflow.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Investor Brief", type: "Briefing" },
              { name: "Startup Plan", type: "Planning" },
              { name: "Sponsor Checklist", type: "Checklist" },
              { name: "Weekly Review", type: "Reports" },
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-2">📄</div>
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-gray-400">{t.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

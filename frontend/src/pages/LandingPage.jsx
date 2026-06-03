import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Target,
  Brain,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Star,
  Users,
  BarChart2,
} from "lucide-react";
import Button from "../components/shared/Button";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Questions",
    desc: "Adaptive questions tailored to your role, seniority, and industry based on real interview patterns.",
    accent: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: BarChart2,
    title: "Instant Scoring",
    desc: "Get scored on clarity, confidence, technical accuracy, and STAR structure after every answer.",
    accent: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Target,
    title: "Resume-Aware Context",
    desc: "Upload your resume and let the AI craft personalized behavioral and situational questions.",
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    desc: "Track your improvement over weeks with detailed performance analytics and trend insights.",
    accent: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "SWE @ Google",
    text: "After 3 weeks with InterviewAI, I went from bombing phone screens to landing my dream role. The feedback is shockingly accurate.",
    stars: 5,
  },
  {
    name: "Marcus Webb",
    role: "PM @ Stripe",
    text: "The behavioral question coaching is next level. It helped me structure my STAR stories with precision I didn't know I had.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "Data Scientist @ Meta",
    text: "I practiced 40+ sessions before my interviews. The AI caught habits I didn't even know I had. Highly recommend.",
    stars: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-body overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-slate-800/60 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center">
            <Target size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white tracking-tight">
            Interview<span className="gradient-text">AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          {["Features", "Pricing", "Testimonials"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>

          <Link to="/signup">
            <Button size="sm">
              Start Free
            </Button>
          </Link>
        </div>








      </nav>

      {/* Hero */}
      <section className="relative px-6 pt-24 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 rounded-full px-4 py-1.5 mb-8">
            <Zap size={13} className="text-indigo-400" />
            <span className="text-xs text-indigo-300 font-medium">
              New: Resume-aware interview mode is live
            </span>
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight text-white mb-6">
            Ace Every
            <br />
            <span className="gradient-text">Interview</span>
            <br />
            With AI Coaching
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Practice with an AI coach that knows your resume, simulates real interviewers, and gives you precise feedback — so you walk in confident every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/interview">
              <Button size="lg" className="w-full sm:w-auto">
                Start Mock Interview <ChevronRight size={16} />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View Dashboard
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-12 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <Users size={15} className="text-slate-600" />
              <span>12,400+ users</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={15} className="text-amber-400" />
              <span>4.9 / 5 rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-500" />
              <span>Free to start</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs text-cyan-400 uppercase tracking-widest font-display font-semibold mb-3">
            Features
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
            Everything you need to land the role
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-6 border border-slate-700/40 hover:border-slate-600/60 transition-all duration-300 group"
            >
              <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                <f.icon size={22} className={f.accent} />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-6 py-20 bg-slate-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs text-indigo-400 uppercase tracking-widest font-display font-semibold mb-3">
              Testimonials
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
              Real people, real offers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="glass rounded-2xl p-6 border border-slate-700/40 hover:border-indigo-500/30 transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-white text-xs font-display font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-white mb-4">
            Ready to level up?
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Start your first free mock interview today. No credit card required.
          </p>
          <Link to="/interview">
            <Button size="lg">
              Launch Interview Coach <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Target size={14} className="text-slate-700" />
          <span className="font-display">InterviewAI</span>
        </div>
        <p>© {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}

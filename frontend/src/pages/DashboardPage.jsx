import {
  MessageSquare,
  Brain,
  Target,
  Award,
  ArrowRight,
  CalendarDays,
  Clock,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatsCard from "../components/dashboard/StatsCard";
import ActivityChart from "../components/dashboard/ActivityChart";
import Button from "../components/shared/Button";

const recentSessions = [
  { id: 1, topic: "System Design: URL Shortener", score: 88, date: "Today", duration: "32 min", tag: "Technical" },
  { id: 2, topic: "Behavioral: Leadership Story", score: 91, date: "Yesterday", duration: "18 min", tag: "Behavioral" },
  { id: 3, topic: "Product Sense: Redesign YouTube", score: 74, date: "2 days ago", duration: "25 min", tag: "Product" },
  { id: 4, topic: "Coding: Dynamic Programming", score: 82, date: "3 days ago", duration: "45 min", tag: "Coding" },
];

const recommendedTopics = [
  { label: "Conflict Resolution", difficulty: "Medium", icon: "⚡" },
  { label: "API Design Principles", difficulty: "Hard", icon: "🧩" },
  { label: "Stakeholder Management", difficulty: "Easy", icon: "🤝" },
];

const difficultyColor = {
  Easy: "text-emerald-400 bg-emerald-500/10",
  Medium: "text-amber-400 bg-amber-500/10",
  Hard: "text-red-400 bg-red-500/10",
};

const tagColor = {
  Technical: "text-cyan-400 bg-cyan-500/10",
  Behavioral: "text-indigo-400 bg-indigo-500/10",
  Product: "text-violet-400 bg-violet-500/10",
  Coding: "text-emerald-400 bg-emerald-500/10",
};

export default function DashboardPage() {
  return (
    <div className="space-y-7 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 font-body flex items-center gap-2">
            <CalendarDays size={14} />
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-white mt-0.5">
            Good morning, Alex 👋
          </h1>
        </div>
        <Link to="/interview">
          <Button icon={MessageSquare}>New Interview</Button>
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Avg. Score"
          value="84%"
          change="+6% this week"
          changeType="up"
          icon={Target}
          accent="cyan"
          sublabel="vs 78% last week"
        />
        <StatsCard
          label="Sessions"
          value="27"
          change="+4 this week"
          changeType="up"
          icon={MessageSquare}
          accent="indigo"
          sublabel="Total practice sessions"
        />
        <StatsCard
          label="Questions"
          value="214"
          change="+31 this week"
          changeType="up"
          icon={Brain}
          accent="emerald"
          sublabel="Questions answered"
        />
        <StatsCard
          label="Best Score"
          value="97%"
          icon={Award}
          accent="amber"
          sublabel="System Design interview"
        />
      </div>

      {/* Chart + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div className="glass rounded-2xl p-5 border border-slate-700/40">
          <h3 className="font-display font-semibold text-white mb-1">Recommended</h3>
          <p className="text-xs text-slate-500 mb-4 font-body">Based on your weak areas</p>
          <div className="space-y-3">
            {recommendedTopics.map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer group"
              >
                <span className="text-lg">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 truncate">{t.label}</p>
                  <span className={`text-xs font-body px-2 py-0.5 rounded-full ${difficultyColor[t.difficulty]}`}>
                    {t.difficulty}
                  </span>
                </div>
                <ArrowRight size={15} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </div>
            ))}
          </div>
          <Link to="/interview">
            <Button variant="secondary" className="w-full mt-4" size="sm">
              Browse All Topics
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent sessions */}
      <div className="glass rounded-2xl border border-slate-700/40 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60">
          <div>
            <h3 className="font-display font-semibold text-white">Recent Sessions</h3>
            <p className="text-xs text-slate-500 font-body mt-0.5">Your latest practice runs</p>
          </div>
          <Button variant="ghost" size="sm" icon={BookOpen}>View All</Button>
        </div>
        <div className="divide-y divide-slate-800/60">
          {recentSessions.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-slate-800/30 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                <MessageSquare size={17} className="text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">{s.topic}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-xs font-body px-2 py-0.5 rounded-full ${tagColor[s.tag]}`}>
                    {s.tag}
                  </span>
                  <span className="text-xs text-slate-600 flex items-center gap-1">
                    <Clock size={11} /> {s.duration}
                  </span>
                  <span className="text-xs text-slate-600">{s.date}</span>
                </div>
              </div>
              <div className={`text-sm font-display font-bold ${
                s.score >= 85 ? "text-emerald-400" : s.score >= 70 ? "text-amber-400" : "text-red-400"
              }`}>
                {s.score}%
              </div>
              <ArrowRight size={15} className="text-slate-700 group-hover:text-slate-400 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

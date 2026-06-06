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
import { useContext } from "react";
import { InterviewContext } from "../context/InterviewContext";

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

  const {
    scores,
    questionsAnswered,
  } = useContext(InterviewContext);

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((a, b) => a + b, 0) /
          scores.length
        )
      : 0;

  const bestScore =
    scores.length > 0
      ? Math.max(...scores)
      : 0;

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
            Welcome Back 👋
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
          value={`${averageScore}%`}
          change="+6% this week"
          changeType="up"
          icon={Target}
          accent="cyan"
          sublabel="vs 78% last week"
        />
        <StatsCard
          label="Sessions"
          value={questionsAnswered}
          change="+4 this week"
          changeType="up"
          icon={MessageSquare}
          accent="indigo"
          sublabel="Total practice sessions"
        />
        <StatsCard
          label="Questions"
          value={questionsAnswered}
          change="+31 this week"
          changeType="up"
          icon={Brain}
          accent="emerald"
          sublabel="Questions answered"
        />
        <StatsCard
          label="Best Score"
          value={`${bestScore}%`}
          icon={Award}
          accent="amber"
          sublabel="System Design interview"
        />
      </div>

 

     
    </div>
  );
}

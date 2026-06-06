import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Play,
  RotateCcw,
  Settings2,
  Timer,
  Briefcase,
  GraduationCap,
  Code2,
  Users,
} from "lucide-react";

import ChatWindow from "../components/interview/ChatWindow";
import Button from "../components/shared/Button";
import { InterviewContext } from "../context/InterviewContext";

const roles = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "Engineering Manager",
];

const difficulties = [
  "Entry Level",
  "Mid Level",
  "Senior",
  "Staff / Principal",
];

const types = [
  { label: "Technical", icon: Code2, color: "text-cyan-400" },
  { label: "Behavioral", icon: Users, color: "text-indigo-400" },
  { label: "Product", icon: Briefcase, color: "text-violet-400" },
  { label: "Mixed", icon: GraduationCap, color: "text-amber-400" },

];

export default function InterviewPage() {
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const navigate = useNavigate();


  const {
    role,
    setRole,
    difficulty,
    setDifficulty,
    interviewType,
    setInterviewType,
  } = useContext(InterviewContext);

  const handleStart = () => {
    setStarted(true);
  };

  useEffect(() => {
    let interval;

    if (started) {
      interval = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [started]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(
      s % 60
    ).padStart(2, "0")}`;

  return (
    <div className="h-full flex flex-col md:flex-row gap-5 animate-fade-in">
      {/* Config panel */}
      <aside className="md:w-72 shrink-0 space-y-4">
        {/* Session Setup */}
        <div className="glass rounded-2xl p-4 border border-slate-700/40">
          <h3 className="font-display font-semibold text-white text-sm mb-3">
            Session Setup
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-500 font-body block mb-1.5">
                Target Role
              </label>

              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700/60 rounded-lg px-3 py-2 text-sm text-slate-200 font-body focus:outline-none focus:border-indigo-500/60 appearance-none pr-8"
                >
                  {roles.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>

                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-500 font-body block mb-1.5">
                Difficulty
              </label>

              <div className="relative">
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700/60 rounded-lg px-3 py-2 text-sm text-slate-200 font-body focus:outline-none focus:border-indigo-500/60 appearance-none pr-8"
                >
                  {difficulties.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>

                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Interview Type */}
        <div className="glass rounded-2xl p-4 border border-slate-700/40">
          <label className="text-xs text-slate-500 font-body block mb-3">
            Interview Type
          </label>

          <div className="grid grid-cols-2 gap-2">
            {types.map((t) => (
              <button
                key={t.label}
                onClick={() => setInterviewType(t.label)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-body font-medium transition-all duration-150 ${interviewType === t.label
                    ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300"
                    : "bg-slate-800/60 border-slate-700/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
              >
                <t.icon
                  size={14}
                  className={
                    interviewType === t.label
                      ? "text-indigo-400"
                      : t.color
                  }
                />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timer */}
        <div className="glass rounded-2xl p-4 border border-slate-700/40 space-y-3">
          {started && (
            <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-4 py-2.5">
              <Timer
                size={15}
                className="text-cyan-400 animate-pulse"
              />

              <span className="font-mono text-cyan-300 text-sm font-medium">
                {formatTime(elapsed)}
              </span>

              <span className="text-xs text-slate-500 ml-auto">
                elapsed
              </span>
            </div>
          )}

          {!started ? (
            <Button
              className="w-full justify-center"
              icon={Play}
              onClick={handleStart}
            >
              Start Session
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="w-full justify-center"
              icon={RotateCcw}
              onClick={() => {
                setStarted(false);
                setElapsed(0);
                navigate("/summary");
              }}
            >
              End Interview
            </Button>







          )}

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
            icon={Settings2}
          >
            Advanced Settings
          </Button>
        </div>

        {/* Tips */}
        <div className="glass rounded-2xl p-4 border border-cyan-500/15">
          <p className="text-xs font-display font-semibold text-cyan-400 mb-2 uppercase tracking-wide">
            Pro Tip
          </p>

          <p className="text-xs text-slate-400 leading-relaxed font-body">
            Use the <strong className="text-slate-300">STAR method</strong> —
            Situation, Task, Action, Result — to structure behavioral answers
            for maximum impact.
          </p>
        </div>
      </aside>

      {/* Chat Panel */}
      <div className="flex-1 glass rounded-2xl border border-slate-700/40 overflow-hidden flex flex-col min-h-[500px]">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800/60 shrink-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

          <div>
            <p className="font-display font-semibold text-white text-sm">
              AI Interview Coach
            </p>

            <p className="text-xs text-slate-500 font-body">
              {role} · {difficulty} · {interviewType}
            </p>
          </div>

          <div className="ml-auto flex gap-2">
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2.5 py-1 rounded-full font-body">
              Live
            </span>
          </div>
        </div>

        {started ? (
          <ChatWindow />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-xs">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-indigo-500/15 border border-indigo-500/25 flex items-center justify-center mx-auto mb-4">
                <Play size={24} className="text-indigo-400 ml-1" />
              </div>

              <p className="font-display font-semibold text-white mb-2">
                Ready when you are
              </p>

              <p className="text-sm text-slate-500 font-body leading-relaxed">
                Configure your session on the left and hit
                <strong className="text-slate-400">
                  {" "}Start Session
                </strong>
                {" "}to begin your mock interview.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
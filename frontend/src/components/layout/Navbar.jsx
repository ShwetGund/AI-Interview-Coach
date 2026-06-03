import { Bell, Search, ChevronDown, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onMenuToggle }) {
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: "Mock interview score improved by 12%", time: "2m ago", dot: "bg-cyan-400" },
    { id: 2, text: "New question set: System Design", time: "1h ago", dot: "bg-indigo-400" },
    { id: 3, text: "Resume analysis complete", time: "3h ago", dot: "bg-emerald-400" },
  ];

  return (
    <header className="h-16 glass border-b border-slate-800/60 flex items-center px-4 md:px-6 gap-4 sticky top-0 z-40">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="md:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Search */}
      <div className="flex-1 max-w-sm hidden md:flex">
        <div className="relative w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            placeholder="Search questions, topics…"
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-slate-800 transition-all"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Credits pill */}
        <div className="hidden sm:flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/25 rounded-full px-3 py-1.5">
          <Zap size={13} className="text-indigo-400" />
          <span className="text-xs font-medium text-indigo-300 font-body">48 credits</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-72 glass rounded-xl shadow-2xl border border-slate-700/60 overflow-hidden animate-fade-in">
              <div className="px-4 py-3 border-b border-slate-700/50">
                <p className="text-sm font-display font-semibold text-white">Notifications</p>
              </div>
              {notifications.map((n) => (
                <div key={n.id} className="px-4 py-3 hover:bg-slate-800/60 cursor-pointer transition-colors border-b border-slate-800/40 last:border-0">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                    <div>
                      <p className="text-xs text-slate-300 leading-relaxed">{n.text}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-white text-xs font-display font-bold">
            AJ
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-slate-300 leading-tight">Alex Johnson</p>
            <p className="text-xs text-slate-500">Pro Plan</p>
          </div>
          <ChevronDown size={14} className="text-slate-500 hidden sm:block group-hover:text-slate-300 transition-colors" />
        </div>
      </div>
    </header>
  );
}

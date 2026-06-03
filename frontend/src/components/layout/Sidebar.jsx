import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Trophy,
  Settings,
  HelpCircle,
  X,
  Sparkles,
  ChevronRight,
  Target,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Interview", icon: MessageSquare, to: "/interview" },
  { label: "Resume", icon: FileText, to: "/resume" },
  { label: "Achievements", icon: Trophy, to: "/achievements" },
];

const bottomItems = [
  { label: "Settings", icon: Settings, to: "/settings" },
  { label: "Help & Docs", icon: HelpCircle, to: "/help" },
];

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-all duration-200 group
        ${isActive
          ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 glow-indigo"
          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/70"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={18} className={isActive ? "text-indigo-400" : "group-hover:text-slate-300"} />
          <span className="flex-1">{label}</span>
          {isActive && <ChevronRight size={14} className="text-indigo-500" />}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-50 md:relative md:z-auto
          flex flex-col bg-slate-900 border-r border-slate-800/60
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-800/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center">
              <Target size={15} className="text-white" />
            </div>
            <span className="font-display font-bold text-white text-base tracking-tight">
              Interview<span className="gradient-text">AI</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1 text-slate-500 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-display px-3 mb-3">
            Main
          </p>
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}

          <div className="pt-5">
            <p className="text-xs text-slate-600 uppercase tracking-widest font-display px-3 mb-3">
              Support
            </p>
            {bottomItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </div>
        </nav>

        {/* Upgrade card */}
        <div className="p-3 shrink-0">
          <div className="bg-gradient-to-br from-indigo-600/20 to-cyan-600/10 border border-indigo-500/25 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={15} className="text-indigo-400" />
              <p className="text-xs font-display font-semibold text-indigo-300">
                Go Unlimited
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Unlock 500+ questions, custom feedback & salary negotiation coach.
            </p>
            <button className="w-full py-2 text-xs font-medium font-body rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:opacity-90 transition-opacity">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

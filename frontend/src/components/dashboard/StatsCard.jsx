import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({
  label,
  value,
  change,
  changeType = "up",
  icon: Icon,
  accent = "cyan",
  sublabel,
}) {
  const accentMap = {
    cyan: {
      icon: "bg-cyan-500/10 text-cyan-400",
      ring: "border-cyan-500/15",
      glow: "hover:border-cyan-500/30 hover:shadow-cyan-500/5",
    },
    indigo: {
      icon: "bg-indigo-500/10 text-indigo-400",
      ring: "border-indigo-500/15",
      glow: "hover:border-indigo-500/30 hover:shadow-indigo-500/5",
    },
    emerald: {
      icon: "bg-emerald-500/10 text-emerald-400",
      ring: "border-emerald-500/15",
      glow: "hover:border-emerald-500/30 hover:shadow-emerald-500/5",
    },
    amber: {
      icon: "bg-amber-500/10 text-amber-400",
      ring: "border-amber-500/15",
      glow: "hover:border-amber-500/30 hover:shadow-amber-500/5",
    },
  };

  const a = accentMap[accent];

  return (
    <div
      className={`
        glass rounded-2xl p-5 border ${a.ring}
        hover:shadow-xl ${a.glow} transition-all duration-300
        animate-slide-up
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${a.icon}`}>
          {Icon && <Icon size={20} />}
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 text-xs font-medium font-body px-2 py-1 rounded-full ${
              changeType === "up"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {changeType === "up" ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            {change}
          </div>
        )}
      </div>
      <p className="font-display font-bold text-2xl text-white mb-0.5">{value}</p>
      <p className="text-sm text-slate-400 font-body">{label}</p>
      {sublabel && (
        <p className="text-xs text-slate-600 mt-1 font-body">{sublabel}</p>
      )}
    </div>
  );
}

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const data = [
  { day: "Mon", score: 62, interviews: 2 },
  { day: "Tue", score: 71, interviews: 3 },
  { day: "Wed", score: 68, interviews: 1 },
  { day: "Thu", score: 79, interviews: 4 },
  { day: "Fri", score: 85, interviews: 3 },
  { day: "Sat", score: 82, interviews: 2 },
  { day: "Sun", score: 91, interviews: 5 },
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl px-4 py-3 shadow-xl border border-slate-700/60">
        <p className="text-xs text-slate-400 font-body mb-2">{label}</p>
        {payload.map((p) => (
          <div key={p.dataKey} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <p className="text-xs font-medium text-slate-200 font-body capitalize">
              {p.dataKey}: <span className="text-white font-semibold">{p.value}{p.dataKey === 'score' ? '%' : ''}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function ActivityChart() {
   
 

  return (
    <div className="glass rounded-2xl p-6 border border-indigo-500/15 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-white text-lg">
            Weekly Performance
          </h3>
          <p className="text-xs text-slate-500 font-body mt-0.5">
            Score trend & session volume
          </p>
        </div>
        <div className="flex gap-4 text-xs font-body">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-cyan-400 rounded-full" />
            <span className="text-slate-400">Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-indigo-400 rounded-full" />
            <span className="text-slate-400">Sessions</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818cf8" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="day"
            tick={{ fill: "#64748b", fontSize: 12, fontFamily: "DM Sans" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 11, fontFamily: "DM Sans" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#334155", strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#22d3ee"
            strokeWidth={2}
            fill="url(#colorScore)"
            dot={{ fill: "#22d3ee", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#22d3ee", strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="interviews"
            stroke="#818cf8"
            strokeWidth={2}
            fill="url(#colorInterviews)"
            dot={{ fill: "#818cf8", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#818cf8", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

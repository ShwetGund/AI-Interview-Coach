export default function Loader({ size = "md", label = "Loading..." }) {
  const ring = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${ring[size]} rounded-full border-slate-700 border-t-cyan-400 animate-spin`}
      />
      {label && (
        <p className="text-slate-500 text-sm font-body animate-pulse">{label}</p>
      )}
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-slate-800 border-t-cyan-400 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
        </div>
        <p className="font-display text-slate-400 tracking-widest text-xs uppercase">
          InterviewAI
        </p>
      </div>
    </div>
  );
}

const variants = {
  primary:
    "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:from-cyan-400 hover:to-indigo-400 shadow-lg glow-indigo",
  secondary:
    "bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-indigo-500/50",
  ghost:
    "bg-transparent text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60",
  danger:
    "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  icon: Icon,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 font-body font-medium rounded-lg
        transition-all duration-200 cursor-pointer select-none
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

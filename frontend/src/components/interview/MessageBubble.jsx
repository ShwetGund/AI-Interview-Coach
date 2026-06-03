import { Bot, User, ThumbsUp, ThumbsDown, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function MessageBubble({ message }) {
  const { role, content, timestamp, score, feedback } = message;
  const isAI = role === "assistant";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex gap-3 animate-slide-up ${
        isAI ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center mt-0.5 ${
          isAI
            ? "bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-indigo-500/25"
            : "bg-gradient-to-br from-slate-700 to-slate-600 border border-slate-600"
        }`}
      >
        {isAI ? (
          <Bot size={16} className="text-cyan-400" />
        ) : (
          <User size={16} className="text-slate-300" />
        )}
      </div>

      {/* Bubble */}
      <div className={`max-w-[78%] space-y-2 ${isAI ? "" : "items-end flex flex-col"}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm font-body leading-relaxed ${
            isAI
              ? "bg-slate-800/80 border border-slate-700/50 text-slate-200 rounded-tl-none"
              : "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-none"
          }`}
        >
          {content}
        </div>

        {/* Score badge for AI messages */}
        {isAI && score !== undefined && (
          <div className="flex items-center gap-2 ml-1">
            <div
              className={`text-xs font-body font-medium px-2.5 py-1 rounded-full border ${
                score >= 80
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                  : score >= 60
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                  : "bg-red-500/10 text-red-400 border-red-500/25"
              }`}
            >
              Score: {score}/100
            </div>
          </div>
        )}

        {/* Feedback panel */}
        {isAI && feedback && (
          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl px-4 py-3 text-xs font-body text-slate-400 leading-relaxed ml-1">
            <p className="text-indigo-400 font-medium mb-1 font-display text-xs uppercase tracking-wide">
              Feedback
            </p>
            {feedback}
          </div>
        )}

        {/* Actions */}
        <div className={`flex items-center gap-1.5 px-1 ${isAI ? "" : "justify-end"}`}>
          <span className="text-xs text-slate-600 font-body">{timestamp}</span>
          {isAI && (
            <>
              <button
                onClick={handleCopy}
                className="p-1 text-slate-600 hover:text-slate-400 transition-colors rounded"
                title="Copy"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              </button>
              <button className="p-1 text-slate-600 hover:text-emerald-400 transition-colors rounded">
                <ThumbsUp size={12} />
              </button>
              <button className="p-1 text-slate-600 hover:text-red-400 transition-colors rounded">
                <ThumbsDown size={12} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

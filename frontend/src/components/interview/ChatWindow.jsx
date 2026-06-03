import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import Loader from "../shared/Loader";

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I'm your AI Interview Coach. I'll guide you through a realistic mock interview. Let's start with something classic — tell me about yourself and your background.",
    timestamp: "09:00 AM",
  },
];

const AI_RESPONSES = [
  {
    content:
      "Great introduction! You clearly articulated your background. Let's go deeper — describe a challenging technical problem you faced in your last role. Walk me through your thought process.",
    score: 82,
    feedback:
      "Strong opening — you highlighted key achievements clearly. Try to quantify impact more (e.g., 'reduced load time by 40%') to make it more compelling to interviewers.",
  },
  {
    content:
      "Excellent answer! I liked how you structured it using STAR. For our next question: How do you handle disagreements with your team or manager?",
    score: 88,
    feedback:
      "Perfect STAR structure. Your example was specific and showed ownership. The resolution you described shows maturity and collaboration skills.",
  },
  {
    content:
      "Good response on conflict resolution. One final question for this session: Where do you see yourself in five years?",
    score: 75,
    feedback:
      "Your answer was solid, but try to tie your personal goals more explicitly to the company's mission. Research the company's growth areas and align your ambitions to them.",
  },
];

export default function ChatWindow() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = (text) => {
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const response = AI_RESPONSES[responseIndex % AI_RESPONSES.length];
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.content,
        score: response.score,
        feedback: response.feedback,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setResponseIndex((i) => i + 1);
      setIsLoading(false);
    }, 1800);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isLoading && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-indigo-500/25 flex items-center justify-center shrink-0">
              <span className="text-cyan-400 text-xs">AI</span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-none px-4 py-3">
              <Loader size="sm" label="" />
              <div className="flex gap-1 mt-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}

import {
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";

import { InterviewContext } from "../../context/InterviewContext";

import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import Loader from "../shared/Loader";

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I'm your AI Interview Coach. Tell me about yourself.",
    timestamp: "09:00 AM",
  },
];

export default function ChatWindow() {
  const [messages, setMessages] =
    useState(INITIAL_MESSAGES);

  const [isLoading, setIsLoading] =
    useState(false);

  const bottomRef = useRef(null);

  const {
    role,
    difficulty,
    interviewType,

    setScores,
    setFeedbacks,
    setQuestionsAnswered,
  } = useContext(InterviewContext);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
      timestamp:
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/interview/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            answer: text,
            role,
            difficulty,
            interview_type:
              interviewType,
          }),
        }
      );

      const data =
        await response.json();

      const result =
        data.response;

      const scoreMatch =
        result.match(
          /Score:\s*(\d+)/i
        );

      const feedbackMatch =
        result.match(
          /Feedback:\s*([\s\S]*?)Next Question:/i
        );

      const questionMatch =
        result.match(
          /Next Question:\s*([\s\S]*)/i
        );

      const score = Number(
        scoreMatch?.[1] || 0
      );

      const feedback =
        feedbackMatch?.[1]?.trim() ||
        "No feedback available.";

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",

        content:
          questionMatch?.[1]?.trim() ||
          "No question generated.",

        score,

        feedback,

        timestamp:
          new Date().toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
      };

      const speech =
        new SpeechSynthesisUtterance(
          aiMessage.content
        );

      const voices =
        window.speechSynthesis.getVoices();

      speech.voice =
        voices.find((v) =>
          v.name.includes("Google")
        ) || voices[0];

      speech.rate = 1;
      speech.pitch = 1;
      speech.volume = 1;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(
        speech
      );

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      setScores((prev) => [
        ...prev,
        score,
      ]);

      setFeedbacks((prev) => [
        ...prev,
        feedback,
      ]);

      setQuestionsAnswered(
        (prev) => prev + 1
      );

    } catch (error) {
      console.error(error);

      alert(
        "Failed to connect to Interview API"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">

        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
          />
        ))}

        {isLoading && (
          <div className="flex gap-3 animate-fade-in">

            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-indigo-500/25 flex items-center justify-center shrink-0">
              <span className="text-cyan-400 text-xs">
                AI
              </span>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-none px-4 py-3">

              <Loader
                size="sm"
                label=""
              />

              <div className="flex gap-1 mt-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce"
                    style={{
                      animationDelay:
                        `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>

            </div>

          </div>
        )}

        <div ref={bottomRef} />

      </div>

      <ChatInput
        onSend={handleSend}
        isLoading={isLoading}
      />
    </div>
  );
}
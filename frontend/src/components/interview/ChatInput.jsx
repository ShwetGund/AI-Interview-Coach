import { useState, useRef } from "react";
import {
  Send,
  Mic,
  Paperclip,
  Loader2,
} from "lucide-react";

export default function ChatInput({
  onSend,
  isLoading,
  disabled,
}) {
  const [value, setValue] = useState("");
  const [isListening, setIsListening] =
    useState(false);

  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const text = value.trim();

    if (
      !text ||
      isLoading ||
      disabled
    ) {
      return;
    }

    onSend(text);

    setValue("");

    if (textareaRef.current) {
      textareaRef.current.style.height =
        "auto";
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);

    e.target.style.height = "auto";

    e.target.style.height =
      Math.min(
        e.target.scrollHeight,
        160
      ) + "px";
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition is not supported in this browser."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = true;

    recognition.continuous = false;

    recognition.start();

    setIsListening(true);

    recognition.onresult = (event) => {
      let transcript = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {
        transcript +=
          event.results[i][0].transcript;
      }

      setValue(transcript);
    };

    recognition.onerror = (event) => {
      console.error(
        "Speech Recognition Error:",
        event.error
      );

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div className="p-4 border-t border-slate-800/60 bg-slate-900/80 backdrop-blur-sm">
      <div className="flex items-end gap-3 glass rounded-2xl border border-slate-700/60 px-4 py-3 focus-within:border-indigo-500/50 transition-all duration-200">

        {/* Attach */}
        <button
          className="shrink-0 p-1.5 text-slate-500 hover:text-cyan-400 transition-colors rounded-lg hover:bg-slate-800"
          title="Attach file"
        >
          <Paperclip size={18} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Type your answer or ask a question..."
          disabled={disabled}
          className="flex-1 bg-transparent resize-none text-sm font-body text-slate-200 placeholder-slate-600 focus:outline-none leading-relaxed disabled:opacity-50 max-h-40"
          style={{ height: "auto" }}
        />

        {/* Mic */}
        <button
          onClick={startListening}
          className={`shrink-0 p-2 rounded-lg transition-all duration-200 ${
            isListening
              ? "bg-red-500 text-white animate-pulse"
              : "text-slate-500 hover:text-indigo-400 hover:bg-slate-800"
          }`}
          title="Voice input"
        >
          <Mic size={18} />
        </button>

        {/* Send */}
        <button
          onClick={handleSubmit}
          disabled={
            !value.trim() ||
            isLoading ||
            disabled
          }
          className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
            value.trim() &&
            !isLoading
              ? "bg-gradient-to-br from-cyan-500 to-indigo-500 text-white hover:opacity-90 shadow-lg glow-indigo"
              : "bg-slate-800 text-slate-600 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <Loader2
              size={16}
              className="animate-spin"
            />
          ) : (
            <Send size={16} />
          )}
        </button>

      </div>

      <p className="text-center text-xs text-slate-700 font-body mt-2">
        Press{" "}
        <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-slate-500">
          Enter
        </kbd>{" "}
        to send,{" "}
        <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-slate-500">
          Shift+Enter
        </kbd>{" "}
        for new line
      </p>
    </div>
  );
}
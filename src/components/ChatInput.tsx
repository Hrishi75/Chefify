"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
  disabled: boolean;
  centered?: boolean;
};

export default function ChatInput({ onSend, disabled, centered }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const inputContent = (
    <div className={`flex items-end gap-2 rounded-[1.2rem] ${
      centered
        ? "bg-white dark:bg-[#141418] p-2.5"
        : "border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-2"
    } transition-all duration-300`}>
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={centered ? "Ask Chefify anything about cooking..." : "Type a message..."}
        disabled={disabled}
        rows={1}
        autoFocus={centered}
        className={`flex-1 resize-none bg-transparent py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed leading-relaxed ${
          centered ? "px-3 text-[15px]" : "px-3"
        }`}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className={`shrink-0 rounded-xl bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed ${
          centered
            ? "w-10 h-10 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40"
            : "w-9 h-9 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/30"
        } disabled:shadow-none`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );

  if (centered) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="input-glow-wrapper">
          {inputContent}
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-600 text-center mt-3 tracking-wide">
          ENTER to send &middot; SHIFT+ENTER for new line
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-4 pt-2">
      <div className="max-w-3xl mx-auto">
        <div className="input-static-glow">
          {inputContent}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";
import RecipeOptions, { RecipePreferences } from "./RecipeOptions";

type ChatInputProps = {
  onSend: (message: string) => void;
  disabled: boolean;
  centered?: boolean;
  preferences?: RecipePreferences;
  onPreferencesChange?: (prefs: RecipePreferences) => void;
};

export default function ChatInput({ onSend, disabled, centered, preferences, onPreferencesChange }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);
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

  const hasPrefs = preferences && Object.values(preferences).some((v) => v);

  const inputContent = (
    <div className={`flex items-end gap-2 rounded-[1.2rem] ${
      centered
        ? "bg-white dark:bg-[#141418] p-2.5"
        : "border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-2"
    } transition-all duration-300`}>
      {/* Options toggle button (chat mode only) */}
      {!centered && preferences && onPreferencesChange && (
        <button
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          className={`shrink-0 rounded-xl flex items-center justify-center w-9 h-9 transition-all duration-200 ${
            showOptions || hasPrefs
              ? "bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400"
              : "bg-gray-100 dark:bg-white/8 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          }`}
          title="Recipe options"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
          {hasPrefs && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-500" />
          )}
        </button>
      )}
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={centered ? "Ask Chefify anything..." : "Type a message..."}
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
      <div className="w-full max-w-2xl mx-auto px-2 sm:px-4">
        <div className="input-glow-wrapper">
          {inputContent}
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-600 text-center mt-2 sm:mt-3 tracking-wide hidden sm:block">
          ENTER to send &middot; SHIFT+ENTER for new line
        </p>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 pb-3 sm:pb-4 pt-2">
      <div className="max-w-3xl mx-auto">
        {/* Collapsible options panel */}
        {showOptions && preferences && onPreferencesChange && (
          <div className="mb-2 px-1 options-slide-in">
            <RecipeOptions preferences={preferences} onChange={onPreferencesChange} compact />
          </div>
        )}
        {/* Active preferences indicator */}
        {!showOptions && hasPrefs && preferences && (
          <div className="mb-1.5 px-1 flex items-center gap-1.5 text-[10px] text-orange-500/70 dark:text-orange-400/50">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>
              {[
                preferences.servings && `${preferences.servings} servings`,
                preferences.difficulty,
                preferences.cuisine,
                preferences.diet,
              ].filter(Boolean).join(" · ")}
            </span>
          </div>
        )}
        <div className="input-static-glow">
          {inputContent}
        </div>
      </div>
    </div>
  );
}

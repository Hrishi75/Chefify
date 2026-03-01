"use client";

import { useState } from "react";
import ChatContainer from "@/components/ChatContainer";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import BackgroundEffects from "@/components/BackgroundEffects";

export default function Home() {
  const [language, setLanguage] = useState("English");

  return (
    <div className="flex flex-col h-dvh relative">
      {/* Animated background */}
      <BackgroundEffects />

      {/* Top bar */}
      <nav className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 z-10 relative shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-sm sm:text-base shadow-lg shadow-orange-500/25">
            🍳
          </div>
          <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
            Chefify
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSelector language={language} onChange={setLanguage} />
          <ThemeToggle />
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0 relative z-10">
        <ChatContainer language={language} />
      </div>
    </div>
  );
}

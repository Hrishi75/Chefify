"use client";

import ChatContainer from "@/components/ChatContainer";
import ThemeToggle from "@/components/ThemeToggle";
import BackgroundEffects from "@/components/BackgroundEffects";

export default function Home() {
  return (
    <div className="flex flex-col h-screen relative">
      {/* Animated background */}
      <BackgroundEffects />

      {/* Top bar */}
      <nav className="flex items-center justify-between px-5 py-3 z-10 relative">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-base shadow-lg shadow-orange-500/25">
            🍳
          </div>
          <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
            Chefify
          </span>
        </div>
        <ThemeToggle />
      </nav>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0 relative z-10">
        <ChatContainer />
      </div>
    </div>
  );
}

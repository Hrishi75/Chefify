import ChatInput from "./ChatInput";
import RecipeOptions, { RecipePreferences } from "./RecipeOptions";

type WelcomeScreenProps = {
  onSend: (message: string) => void;
  disabled: boolean;
  preferences: RecipePreferences;
  onPreferencesChange: (prefs: RecipePreferences) => void;
};

const suggestions = [
  { icon: "🍗", text: "Butter chicken recipe" },
  { icon: "🍝", text: "Quick pasta carbonara" },
  { icon: "🥘", text: "Cook with eggs and rice" },
  { icon: "🍰", text: "Easy chocolate mousse" },
];

export default function WelcomeScreen({ onSend, disabled, preferences, onPreferencesChange }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 relative overflow-y-auto py-4">
      {/* Floating icon */}
      <div className="animate-float mb-4 sm:mb-6">
        <div className="relative">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl sm:text-3xl shadow-2xl shadow-orange-500/30">
            🍳
          </div>
          {/* Icon glow */}
          <div className="absolute inset-0 rounded-2xl bg-orange-500/20 blur-xl scale-150" />
        </div>
      </div>

      {/* Hero text */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-2 sm:mb-3">
        <span className="gradient-text">What shall we cook</span>
        <br />
        <span className="text-gray-900 dark:text-white">today?</span>
      </h1>

      <p className="text-gray-500 dark:text-gray-500 text-center max-w-md mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed px-2">
        Your AI-powered kitchen companion. Get recipes, techniques, and inspiration from every cuisine.
      </p>

      {/* Recipe options */}
      <div className="mb-4 sm:mb-5 w-full max-w-2xl px-2">
        <RecipeOptions preferences={preferences} onChange={onPreferencesChange} />
      </div>

      {/* Centered glowing input */}
      <ChatInput onSend={onSend} disabled={disabled} centered />

      {/* Suggestion chips below input */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 max-w-2xl px-2">
        {suggestions.map((s) => (
          <button
            key={s.text}
            onClick={() => onSend(s.text)}
            className="group flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-gray-200/80 dark:border-white/8 bg-white/60 dark:bg-white/3 backdrop-blur-sm hover:border-orange-300 dark:hover:border-orange-500/30 hover:bg-orange-50/80 dark:hover:bg-orange-500/5 hover:shadow-md hover:shadow-orange-500/5 transition-all duration-200 text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          >
            <span className="group-hover:scale-110 transition-transform duration-200">{s.icon}</span>
            {s.text}
          </button>
        ))}
      </div>
    </div>
  );
}

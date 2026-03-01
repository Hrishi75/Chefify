"use client";

import { useState, useRef, useCallback } from "react";
import PortalDropdown from "@/components/PortalDropdown";

export type RecipePreferences = {
  servings: string;
  difficulty: string;
  cuisine: string;
  diet: string;
};

const DEFAULT_PREFS: RecipePreferences = {
  servings: "",
  difficulty: "",
  cuisine: "",
  diet: "",
};

const OPTIONS = {
  servings: ["1", "2", "4", "6", "8+"],
  difficulty: ["Easy", "Medium", "Hard"],
  cuisine: ["Any", "Indian", "Italian", "Chinese", "Mexican", "Thai", "Japanese", "American", "French", "Middle Eastern"],
  diet: ["None", "Vegetarian", "Vegan", "Keto", "Gluten-free", "Dairy-free"],
};

type RecipeOptionsProps = {
  preferences: RecipePreferences;
  onChange: (prefs: RecipePreferences) => void;
  compact?: boolean;
};

function OptionPill({
  label,
  icon,
  value,
  options,
  onSelect,
}: {
  label: string;
  icon: string;
  value: string;
  options: string[];
  onSelect: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(!open)}
        className={`option-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-200 border ${
          value
            ? "border-orange-300 dark:border-orange-500/40 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300"
            : "border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:border-orange-200 dark:hover:border-orange-500/20"
        }`}
      >
        <span className="text-sm">{icon}</span>
        <span className="font-medium">{value || label}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <PortalDropdown open={open} onClose={handleClose} anchorRef={btnRef}>
        {value && (
          <button
            onClick={() => {
              onSelect("");
              setOpen(false);
            }}
            className="w-full text-left px-3 py-1.5 text-xs text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            Clear
          </button>
        )}
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              onSelect(opt);
              setOpen(false);
            }}
            className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
              value === opt
                ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-medium"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
            }`}
          >
            {label === "Servings" ? `${opt} serving${opt === "1" ? "" : "s"}` : opt}
          </button>
        ))}
      </PortalDropdown>
    </div>
  );
}

export default function RecipeOptions({ preferences, onChange, compact }: RecipeOptionsProps) {
  const update = (key: keyof RecipePreferences, val: string) => {
    onChange({ ...preferences, ...{ [key]: val } });
  };

  const hasAnyPref = Object.values(preferences).some((v) => v);

  return (
    <div className={`flex items-center gap-2 flex-wrap ${compact ? "" : "justify-center"}`}>
      <OptionPill
        label="Servings"
        icon="👥"
        value={preferences.servings ? `${preferences.servings} servings` : ""}
        options={OPTIONS.servings}
        onSelect={(v) => update("servings", v)}
      />
      <OptionPill
        label="Difficulty"
        icon="📊"
        value={preferences.difficulty}
        options={OPTIONS.difficulty}
        onSelect={(v) => update("difficulty", v)}
      />
      <OptionPill
        label="Cuisine"
        icon="🌍"
        value={preferences.cuisine === "Any" ? "" : preferences.cuisine}
        options={OPTIONS.cuisine}
        onSelect={(v) => update("cuisine", v === "Any" ? "" : v)}
      />
      <OptionPill
        label="Diet"
        icon="🥗"
        value={preferences.diet === "None" ? "" : preferences.diet}
        options={OPTIONS.diet}
        onSelect={(v) => update("diet", v === "None" ? "" : v)}
      />
      {hasAnyPref && (
        <button
          onClick={() => onChange({ ...DEFAULT_PREFS })}
          className="text-[10px] text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors px-1"
        >
          Reset all
        </button>
      )}
    </div>
  );
}

export { DEFAULT_PREFS };

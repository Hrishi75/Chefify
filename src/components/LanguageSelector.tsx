"use client";

import { useState, useRef, useCallback } from "react";
import PortalDropdown from "@/components/PortalDropdown";

const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "HI", label: "Hindi" },
  { code: "MR", label: "Marathi" },
];

type LanguageSelectorProps = {
  language: string;
  onChange: (language: string) => void;
};

export default function LanguageSelector({ language, onChange }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const handleClose = useCallback(() => setOpen(false), []);

  const current = LANGUAGES.find((l) => l.label === language) || LANGUAGES[0];

  return (
    <div>
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="h-8 px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-medium bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-all duration-200 text-gray-600 dark:text-gray-400"
        aria-label="Select language"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {current.code}
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

      <PortalDropdown open={open} onClose={handleClose} anchorRef={btnRef} align="right">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              onChange(lang.label);
              setOpen(false);
            }}
            className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
              language === lang.label
                ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-medium"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
            }`}
          >
            {lang.label}
            <span className="text-[10px] text-gray-400 dark:text-gray-500">{lang.code}</span>
          </button>
        ))}
      </PortalDropdown>
    </div>
  );
}

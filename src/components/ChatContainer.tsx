"use client";

import { useState, useRef } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import WelcomeScreen from "./WelcomeScreen";
import { RecipePreferences, DEFAULT_PREFS } from "./RecipeOptions";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function buildPrefContext(prefs: RecipePreferences, language: string): string {
  const parts: string[] = [];
  if (prefs.servings) parts.push(`for ${prefs.servings} servings`);
  if (prefs.difficulty) parts.push(`difficulty: ${prefs.difficulty}`);
  if (prefs.cuisine) parts.push(`cuisine: ${prefs.cuisine}`);
  if (prefs.diet) parts.push(`diet: ${prefs.diet}`);
  if (language && language !== "English") {
    parts.push(`language: Respond in ${language} but written in English script only (transliteration, do NOT use native script like Devanagari)`);
  }
  return parts.length > 0 ? ` [Preferences: ${parts.join(", ")}]` : "";
}

export default function ChatContainer({ language }: { language: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<RecipePreferences>({ ...DEFAULT_PREFS });
  const isSubmitting = useRef(false);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading || isSubmitting.current) return;
    isSubmitting.current = true;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: content.trim(),
    };

    // Append preference context to the API message (but show clean message to user)
    const prefContext = buildPrefContext(preferences, language);
    const apiContent = content.trim() + prefContext;

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const apiMessages = updatedMessages.map((m, i) => ({
        role: m.role,
        content: i === updatedMessages.length - 1 ? apiContent : m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: data.message },
      ]);
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Sorry, something went wrong. Please try again!";
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: errorMsg,
        },
      ]);
    } finally {
      setIsLoading(false);
      isSubmitting.current = false;
    }
  };

  if (messages.length === 0) {
    return (
      <WelcomeScreen
        onSend={sendMessage}
        disabled={isLoading}
        preferences={preferences}
        onPreferencesChange={setPreferences}
      />
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput
        onSend={sendMessage}
        disabled={isLoading}
        preferences={preferences}
        onPreferencesChange={setPreferences}
      />
    </div>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { getModel } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Gemini API key is not configured. Please add it to .env.local" },
      { status: 500 }
    );
  }

  try {
    const { messages } = await req.json();

    const model = getModel();

    // Only send the last 20 messages as history to save tokens
    const recentMessages = messages.slice(-20);

    const chat = model.startChat({
      history: recentMessages.slice(0, -1).map((msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response.text();

    return NextResponse.json({ message: response });
  } catch (error: unknown) {
    console.error("Gemini API error:", error);

    const message = error instanceof Error ? error.message : "";
    if (message.includes("429") || message.includes("quota")) {
      return NextResponse.json(
        { error: "Rate limit reached. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to get response from the chef. Please try again." },
      { status: 500 }
    );
  }
}

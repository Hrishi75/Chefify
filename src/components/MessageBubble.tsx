import ReactMarkdown from "react-markdown";

type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end px-4 py-1.5">
        <div className="max-w-[75%] rounded-2xl rounded-br-md bg-orange-500 text-white px-4 py-2.5 shadow-md shadow-orange-500/10">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-1.5">
      <div className="max-w-[85%]">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-5 h-5 rounded-md bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-[10px]">
            🍳
          </div>
          <span className="text-[11px] font-medium text-gray-400 dark:text-gray-600">Chefify</span>
        </div>
        <div className="message-content text-gray-700 dark:text-gray-300">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

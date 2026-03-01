export default function TypingIndicator() {
  return (
    <div className="px-4 py-1.5">
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-5 h-5 rounded-md bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-[10px]">
          🍳
        </div>
        <span className="text-[11px] font-medium text-gray-400 dark:text-gray-600">Chefify</span>
      </div>
      <div className="flex items-center gap-1.5 py-2">
        <span className="w-1.5 h-1.5 bg-orange-400/60 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 bg-orange-400/60 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 bg-orange-400/60 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

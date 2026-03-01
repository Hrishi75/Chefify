type WelcomeScreenProps = {
  onSuggestionClick: (suggestion: string) => void;
};

const suggestions = [
  "How do I make butter chicken?",
  "Give me a quick pasta recipe",
  "What can I cook with eggs and rice?",
  "Suggest a dessert for beginners",
];

export default function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-6xl mb-4">👨‍🍳</div>
      <h2 className="text-2xl font-bold text-amber-800 mb-2">Welcome to Chefify!</h2>
      <p className="text-amber-600 mb-8 text-center max-w-md">
        Your AI cooking companion. Ask me for recipes, cooking tips, or ingredient substitutions from any cuisine!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-left px-4 py-3 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 hover:border-amber-400 transition-colors text-sm text-gray-700 shadow-sm"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

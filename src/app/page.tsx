import ChatContainer from "@/components/ChatContainer";

export default function Home() {
  return (
    <main className="flex flex-col h-screen max-w-3xl mx-auto">
      <header className="flex items-center gap-3 px-6 py-4 border-b border-amber-200 bg-white/80 backdrop-blur-sm">
        <span className="text-3xl">👨‍🍳</span>
        <div>
          <h1 className="text-xl font-bold text-amber-800">Chefify</h1>
          <p className="text-sm text-amber-600">Your AI cooking companion</p>
        </div>
      </header>
      <ChatContainer />
    </main>
  );
}

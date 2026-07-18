"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: "Hi! Ask me anything about our policies and I'll help you out.",
};

export default function PolicyChat() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    // Send only the real conversation (drop the canned greeting) to the model.
    const convo = messages.filter((m) => m !== GREETING);
    const next: Msg[] = [...convo, { role: "user", content: text }];

    setMessages([GREETING, ...next]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      const reply =
        data.reply || "Sorry, I couldn't answer that right now. Please try again.";
      setMessages([GREETING, ...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        GREETING,
        ...next,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex h-[600px] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-900">Support Assistant</h2>
        <p className="text-xs text-slate-500">Answers based on our policies</p>
      </header>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={
                "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm " +
                (m.role === "user"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-800")
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-400">
              typing…
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Type your question…"
            className="max-h-32 flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hello! I'm the Midline Assistant. Ask me about our fleet, routes, baggage, payment, or our policies — I'm happy to help.",
};

const QUICK_QUESTIONS = [
  "What aircraft do you operate?",
  "What is your cancellation policy?",
  "How many bags can I bring?",
  "Which payment methods do you accept?",
];

/** The Midline robot mascot, recreated as an inline SVG (brand colors). */
function RobotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {/* ears */}
      <rect x="1" y="26" width="9" height="15" rx="4.5" fill="#b7cfe4" />
      <rect x="50" y="26" width="9" height="15" rx="4.5" fill="#b7cfe4" />
      {/* head */}
      <rect x="7" y="12" width="46" height="34" rx="10" fill="#dbe9f7" />
      {/* face screen */}
      <rect x="13" y="19" width="34" height="20" rx="5.5" fill="#1e3a66" />
      <circle cx="23" cy="27.5" r="3.2" fill="#2fd4d9" />
      <circle cx="37" cy="27.5" r="3.2" fill="#2fd4d9" />
      <path d="M26.5 32.5c1.6 3 5.4 3 7 0 .4-.9-.3-1.5-1-1.2a6.4 6.4 0 0 1-5 0c-.7-.3-1.4.3-1 1.2z" fill="#2fd4d9" />
      {/* body */}
      <path d="M15 50c0-2.8 7.6-5 17-5s17 2.2 17 5c0 5.5-7.6 10-17 10s-17-4.5-17-10z" fill="#c9ddf0" />
      <circle cx="32" cy="53.5" r="4.2" fill="#1e3a66" />
      {/* speech bubble */}
      <g>
        <rect x="36" y="2" width="26" height="20" rx="4" fill="#6bc77e" />
        <path d="M52 21l6 7-1-7z" fill="#6bc77e" />
        <rect x="40" y="7" width="18" height="2.6" rx="1.3" fill="#3f8f52" />
        <rect x="40" y="12" width="18" height="2.6" rx="1.3" fill="#3f8f52" />
        <rect x="40" y="17" width="12" height="2.6" rx="1.3" fill="#3f8f52" />
      </g>
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  // ESC closes the panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text?: string) {
    const value = (text ?? input).trim();
    if (!value || loading) return;

    const convo = messages.filter((m) => m !== GREETING);
    const next: Msg[] = [...convo, { role: "user", content: value }];

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
      const reply: string =
        data.reply ||
        "I can't answer right now — please reach us on WhatsApp (green button) or at info@midlineaviation.com and the team will help immediately.";
      setMessages([GREETING, ...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        GREETING,
        ...next,
        {
          role: "assistant",
          content:
            "Something went wrong on my side. Please try again, or contact the team on WhatsApp or info@midlineaviation.com.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  const showQuickQuestions = messages.length === 1 && !loading;

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close Midline Assistant chat" : "Chat with the Midline Assistant"}
        className="fixed bottom-5 right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(7,12,42,0.35)] ring-1 ring-[#111a5a]/10 transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-6 w-6 text-[#111a5a]" /> : <RobotIcon className="h-9 w-9" />}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Midline Assistant chat"
          className="fixed bottom-[5.75rem] right-4 z-[75] flex h-[min(72svh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(160deg,#0d1451_0%,#0a3f74_100%)] shadow-[0_24px_64px_rgba(4,10,36,0.55)] backdrop-blur-xl motion-safe:animate-[toastIn_0.3s_cubic-bezier(0.22,1,0.36,1)_both]"
        >
          {/* Header */}
          <header className="flex items-center gap-3 border-b border-white/12 px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <RobotIcon className="h-7 w-7" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Midline Assistant</p>
              <p className="text-[0.66rem] text-white/60">Fleet, routes &amp; policies — answered instantly</p>
            </div>
          </header>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[0.82rem] leading-relaxed " +
                    (m.role === "user"
                      ? "bg-[#00bcff] text-[#0b1c4d]"
                      : "bg-white/10 text-white/92")
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {showQuickQuestions && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-[#00bcff]/40 px-3 py-1.5 text-[0.7rem] font-medium text-[#7ec8ff] transition-colors hover:bg-[#00bcff]/15 hover:text-white"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white/10 px-4 py-2.5 text-sm text-white/55">typing…</div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/12 p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder="Ask about flights, baggage, policies…"
                aria-label="Your question"
                className="max-h-28 flex-1 resize-none rounded-xl border border-white/15 bg-white/8 px-3.5 py-2.5 text-sm text-white placeholder:text-white/45 outline-none focus:border-[#00bcff]/60"
              />
              <button
                type="button"
                onClick={() => send()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00bcff] text-[#0b1c4d] transition-colors hover:bg-[#33cbff] disabled:opacity-40"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </div>
            <p className="mt-2 text-center text-[0.58rem] uppercase tracking-[0.14em] text-white/35">
              For quotes, use the Book Your Flight form
            </p>
          </div>
        </div>
      )}
    </>
  );
}

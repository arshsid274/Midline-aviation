import { NextRequest, NextResponse } from "next/server";
import { POLICY } from "@/lib/policy";

// Groq is OpenAI-compatible, so this is just a fetch to their endpoint.
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// llama-3.1-8b-instant: fast, capable enough for policy Q&A, most generous free-tier limits.
const MODEL = "llama-3.1-8b-instant";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "Chat is not configured on the server." },
      { status: 503 }
    );
  }

  let messages: ChatMessage[];
  try {
    ({ messages } = await req.json());
    if (!Array.isArray(messages) || messages.length === 0) throw new Error();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Basic abuse guards: cap history length and message size.
  messages = messages
    .slice(-MAX_MESSAGES)
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  // The whole knowledge base fits in the prompt — no RAG needed at this size.
  const systemPrompt = `You are the Midline Assistant, the friendly concierge chatbot on the Midline Aviation website (a private jet charter company in Dubai). Answer the visitor's question using ONLY the company information below.

Rules:
- If the answer is in the company information, answer clearly and concisely in a warm, professional, luxury-service tone.
- If the answer is NOT in the company information, say you don't have that detail and suggest contacting the team at info@midlineaviation.com, +971 4 553 3430, or the WhatsApp button on this site. Never guess or invent details.
- Never quote a specific price for a flight — pricing is bespoke; invite them to request a quote via the Book Your Flight form or the contact team.
- Do not give legal, visa, or medical advice beyond what the company information states.
- Keep answers short (2-5 sentences, or a brief list when comparing aircraft).

--- COMPANY INFORMATION ---
${POLICY}
--- END COMPANY INFORMATION ---`;

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2, // low = factual, less likely to make things up
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      }),
    });

    if (!res.ok) {
      // 429 here means the free-tier rate limit; check the retry-after header.
      return NextResponse.json(
        { error: "The assistant is busy right now. Please try again in a moment." },
        { status: res.status }
      );
    }

    const data = await res.json();
    const reply: string = data.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { POLICY } from "@/lib/policy";

// Groq is OpenAI-compatible, so this is just a fetch to their endpoint.
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// llama-3.1-8b-instant: fast, capable enough for policy Q&A, most generous free-tier limits.
const MODEL = "llama-3.1-8b-instant";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "GROQ_API_KEY is not set on the server." },
      { status: 500 }
    );
  }

  let messages: ChatMessage[];
  try {
    ({ messages } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // The whole policy goes in the system prompt. No RAG needed while the policy
  // fits in context. The model is told to answer ONLY from it.
  const systemPrompt = `You are a customer support assistant. Answer the customer's question using ONLY the company policy below.

Rules:
- If the answer is in the policy, answer clearly and concisely.
- If the answer is NOT in the policy, say you don't have that information and suggest they contact the support team. Never guess or invent details.
- Be friendly and professional. Keep answers short.

--- COMPANY POLICY ---
${POLICY}
--- END COMPANY POLICY ---`;

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
      // 429 here means you hit a free-tier rate limit; check the retry-after header.
      const detail = await res.text();
      return NextResponse.json(
        { error: "Upstream error from Groq.", detail },
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

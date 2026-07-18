# Policy Chatbot — Next.js + Groq (free tier)

A customer-support chatbot that answers only from your company policy.
Inference runs on Groq's free tier; the app runs on your own server.
No vector database, no per-token cost.

## Files

- `app/api/chat/route.ts` — server route that calls Groq. Your API key stays here, never in the browser.
- `app/components/PolicyChat.tsx` — the chat UI (a client component).
- `lib/policy.ts` — paste your real policy here.
- `.env.local.example` — the one env var you need.

These are drop-in files for a Next.js **App Router** project. If you don't have one yet:
`npx create-next-app@latest` (choose App Router + TypeScript + Tailwind), then copy these in.

## Setup (5 minutes)

1. Get a free Groq key at https://console.groq.com — no credit card.
2. Copy `.env.local.example` to `.env.local` and paste your key.
3. Drop the files into your project (keep the same folder paths).
4. Open `lib/policy.ts` and replace the placeholder with your real policy.
5. Add the widget to any page:

   ```tsx
   import PolicyChat from "@/app/components/PolicyChat";

   export default function Page() {
     return <PolicyChat />;
   }
   ```

6. Run it: `npm run dev`, open http://localhost:3000, and ask it something from your policy.

That's the whole prototype.

## Going live on your VPS

Once it works locally, on the Namecheap VPS:

1. Copy the project up (git clone or scp).
2. `npm install && npm run build`
3. Set the env var on the server (e.g. in `.env.local` or your process manager).
4. Keep it running: `pm2 start "npm run start" --name policy-chatbot` (app listens on port 3000).
5. Point a subdomain at it with Nginx as a reverse proxy, e.g. `chat.yourdomain.com` → `localhost:3000`.
6. Add HTTPS with Let's Encrypt: `sudo certbot --nginx`.

If the VPS already serves your company site, just add this as another app on its own port behind the same Nginx.

## Notes / easy upgrades later

- **Rate limits:** Free tier is per-minute + per-day, org-wide. At low traffic you won't touch it. A 429 means slow down; check the `retry-after` header.
- **Streaming:** For a snappier feel you can stream tokens, but Groq is fast enough that the prototype doesn't need it.
- **When to add real RAG:** Only once your policy gets too big to fit in the prompt. Then switch to chunk + embed + retrieve, and feed just the top matches instead of the whole policy.
- **Guardrails:** The system prompt already tells the model to answer only from the policy and to defer to human support otherwise — tune that wording in `route.ts` as you test.

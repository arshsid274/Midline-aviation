"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, CheckCircle2, ChevronDown, X } from "lucide-react";

type ToastState = { kind: "success" | "error"; text: string } | null;

const inputClass =
  "w-full rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/50 backdrop-blur-xl focus:border-[#c5a059]/60 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40";
const selectClass =
  "w-full appearance-none rounded-xl border border-white/12 bg-white/6 px-4 py-3 pr-11 text-sm text-white backdrop-blur-xl focus:border-[#c5a059]/60 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40";
const labelClass = "ml-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80";

export default function ContactInquiryForm() {
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [mounted, setMounted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, []);

  const showToast = (next: NonNullable<ToastState>) => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setToast(next);
    dismissTimer.current = setTimeout(() => setToast(null), next.kind === "success" ? 6000 : 9000);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setSending(true);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));

      if (res.ok) {
        form.reset();
        showToast({
          kind: "success",
          text: "Your inquiry has been sent. Our team will come back to you shortly.",
        });
      } else {
        showToast({
          kind: "error",
          text: body.message || "Unable to send your inquiry right now. Please try again.",
        });
      }
    } catch {
      showToast({
        kind: "error",
        text: "Unable to send your inquiry right now. Please try again, or email info@midlineaviation.com.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
        {/* Honeypot — hidden from real users, catches naive bots. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className={labelClass} htmlFor="fullName">
              Full Name
            </label>
            <input id="fullName" name="fullName" type="text" required placeholder="John Doe" className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass} htmlFor="email">
              Email Address
            </label>
            <input id="email" name="email" type="email" required placeholder="john@example.com" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className={labelClass} htmlFor="phone">
              Phone Number
            </label>
            <input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass} htmlFor="aircraftType">
              Preferred Aircraft Type
            </label>
            <div className="relative">
              <select id="aircraftType" name="aircraftType" defaultValue="" className={selectClass}>
                <option value="" disabled className="bg-[#101420]">
                  Select Preferred Aircraft Type
                </option>
                <option value="light-jet" className="bg-[#101420]">
                  Light Jet
                </option>
                <option value="mid-size-jet" className="bg-[#101420]">
                  Mid-Size Jet
                </option>
                <option value="super-mid-size-jet" className="bg-[#101420]">
                  Super Mid-Size Jet
                </option>
                <option value="heavy-jet" className="bg-[#101420]">
                  Heavy Jet
                </option>
                <option value="ultra-long-range" className="bg-[#101420]">
                  Ultra-Long Range
                </option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c5a059]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className={labelClass} htmlFor="destination">
              Destination
            </label>
            <input
              id="destination"
              name="destination"
              type="text"
              placeholder="E.g. London, Teterboro..."
              className={inputClass}
            />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass} htmlFor="departureDate">
              Desired Departure Date
            </label>
            <input
              id="departureDate"
              name="departureDate"
              type="date"
              className={`${inputClass} [color-scheme:dark]`}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="passengers">
            Number of Passengers
          </label>
          <div className="relative">
            <select id="passengers" name="passengers" defaultValue="1-4" className={selectClass}>
              <option value="1-4" className="bg-[#101420]">
                1-4 Passengers
              </option>
              <option value="5-8" className="bg-[#101420]">
                5-8 Passengers
              </option>
              <option value="9-14" className="bg-[#101420]">
                9-14 Passengers
              </option>
              <option value="15+" className="bg-[#101420]">
                15+ Passengers
              </option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c5a059]" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="message">
            Additional Notes
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us your route, timing, and service preferences..."
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={sending}
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#1A2151] py-4 shadow-[0_12px_28px_rgba(26,33,81,0.45)] transition-colors hover:bg-[#2D3775] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="absolute left-0 top-0 h-full w-1 -translate-x-full bg-[#c5a059]/90 transition-transform duration-300 group-hover:translate-x-0" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {sending ? "Sending…" : "Submit Inquiry"}
            </span>
          </button>
          <p className="mt-5 text-center text-[10px] uppercase tracking-[0.16em] text-white/60">
            Confidential &amp; Secure Inquiry Process
          </p>
        </div>
      </form>

      {/* Status toast — portaled to <body> so ancestor transforms can't trap it. */}
      {mounted &&
        toast &&
        createPortal(
          <div
            role="status"
            className="fixed right-4 top-24 z-[90] flex w-[min(92vw,380px)] items-start gap-3 rounded-2xl border border-white/15 bg-[#0b1c4d]/95 p-4 text-white shadow-[0_18px_46px_rgba(7,12,42,0.45)] backdrop-blur-xl motion-safe:animate-[toastIn_0.4s_cubic-bezier(0.22,1,0.36,1)_both]"
          >
            {toast.kind === "success" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#35d9a2]" />
            ) : (
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-none text-[#ffb454]" />
            )}
            <p className="text-sm leading-relaxed text-white/90">{toast.text}</p>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setToast(null)}
              className="ml-auto flex h-6 w-6 flex-none items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>,
          document.body
        )}
    </>
  );
}

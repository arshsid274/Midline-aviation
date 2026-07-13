"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";
import { CONSENT_EVENT, CONSENT_KEY } from "@/app/components/ui/CookieConsent";

export default function ClarityInit() {
  useEffect(() => {
    let started = false;

    // Defer analytics until the main thread is idle so it never competes with
    // hero rendering/hydration (reduces Total Blocking Time during load).
    const start = () => {
      if (started) return;
      started = true;
      type IdleWindow = Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      };
      const w = window as IdleWindow;
      const init = () => Clarity.init("wcyn2uoctk");
      if (typeof w.requestIdleCallback === "function") {
        w.requestIdleCallback(init, { timeout: 4000 });
      } else {
        setTimeout(init, 2500);
      }
    };

    // GDPR/PDPL: analytics only runs with explicit consent from the banner.
    if (window.localStorage.getItem(CONSENT_KEY) === "accepted") {
      start();
      return;
    }
    window.addEventListener(CONSENT_EVENT, start);
    return () => window.removeEventListener(CONSENT_EVENT, start);
  }, []);

  return null;
}

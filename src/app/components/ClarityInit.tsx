"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityInit() {
  useEffect(() => {
    // Defer analytics until the main thread is idle so it never competes with
    // hero rendering/hydration (reduces Total Blocking Time during load).
    const start = () => Clarity.init("wcyn2uoctk");
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    const w = window as IdleWindow;
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(start, { timeout: 4000 });
    } else {
      const timer = setTimeout(start, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}

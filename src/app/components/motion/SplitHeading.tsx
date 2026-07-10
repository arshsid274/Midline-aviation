"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, registerScrollTrigger } from "./gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SplitHeadingProps {
  as?: ElementType;
  className?: string;
  /**
   * "lcp"   — hero headlines: never CSS-hidden, so first paint shows the full
   *           text (LCP recorded), then hydration splits and plays the rise.
   * "gated" — section headings: hidden pre-paint by the `.js [data-split]`
   *           rule in globals.css, released via autoAlpha inside onSplit.
   */
  mode?: "lcp" | "gated";
  on?: "load" | "scroll";
  delay?: number;
  children: ReactNode;
}

/**
 * Per-line masked headline reveal built on SplitText. Children stay
 * server-rendered text (SEO/no-JS complete); SplitText's `aria: "auto"`
 * default labels the heading and hides the shards from assistive tech.
 * `autoSplit` re-splits automatically when fonts finish loading.
 */
export default function SplitHeading({
  as = "h2",
  className,
  mode = "gated",
  on = "scroll",
  delay = 0,
  children,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion) {
        // CSS reduced-motion block already forces visibility; nothing to animate.
        return;
      }

      registerScrollTrigger();

      const isMobile = window.matchMedia("(max-width: 640px)").matches;

      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          // Release the CSS gate pre-paint; from here the line masks do the hiding.
          gsap.set(el, { autoAlpha: 1 });
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 0.9,
            ease: "midline",
            stagger: 0.08,
            delay: on === "load" ? delay : 0,
            ...(on === "scroll"
              ? {
                  scrollTrigger: {
                    trigger: el,
                    start: isMobile ? "top 92%" : "top 85%",
                    once: true,
                  },
                }
              : {}),
          });
        },
      });
    },
    { scope: ref, dependencies: [prefersReducedMotion] }
  );

  return createElement(
    as,
    {
      ref,
      className,
      ...(mode === "gated" ? { "data-split": "" } : {}),
    },
    children
  );
}

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerScrollTrigger } from "./gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up to `value` when scrolled into view. The FINAL formatted value is
 * server-rendered as real text, so SEO/no-JS/reduced-motion always see the
 * complete number; the tween only rewrites textContent for 1.4s once.
 * Wrap in `tabular-nums` styling context to avoid width jitter.
 */
export default function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const format = (v: number) =>
    `${prefix}${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(v)}${suffix}`;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion) return;

      registerScrollTrigger();

      const proxy = { v: 0 };
      gsap.to(proxy, {
        v: value,
        duration,
        ease: "midline",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        onUpdate() {
          el.textContent = format(proxy.v);
        },
        onComplete() {
          el.textContent = format(value);
        },
      });
    },
    { scope: ref, dependencies: [prefersReducedMotion, value] }
  );

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {format(value)}
    </span>
  );
}

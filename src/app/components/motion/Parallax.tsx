"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { createParallax } from "./reveal-core";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxProps {
  /** Max drift in px (element travels +amount → -amount across the viewport). */
  amount?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Subtle scrubbed parallax for imagery. The inner element is oversized by 15%
 * and recentred so the drift never exposes gaps. Desktop-pointer only +
 * reduced-motion safe (decided in createParallax). Never opacity-gated.
 */
export default function Parallax({ amount = 36, className, children }: ParallaxProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const scope = scopeRef.current;
      const inner = innerRef.current;
      if (!scope || !inner) return;
      createParallax(scope, inner, prefersReducedMotion, amount);
    },
    { scope: scopeRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <div ref={scopeRef} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={innerRef} className="relative h-[115%] -my-[7.5%]">
        {children}
      </div>
    </div>
  );
}

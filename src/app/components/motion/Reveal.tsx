"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { createReveal, type RevealOptions } from "./reveal-core";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealProps extends RevealOptions {
  /** Rendered element/tag for the wrapper. Defaults to `div`. */
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Thin client island that reveals its content on scroll (or on mount for heroes).
 * Server/static sections can render this and pass server-rendered JSX as children —
 * GSAP animates the DOM nodes, so the markup stays server-rendered; only this wrapper
 * ships JS. Uses @gsap/react's useGSAP for isomorphic layout-effect timing + auto revert.
 */
export default function Reveal({
  as = "div",
  className,
  children,
  variant = "fade-up",
  on = "scroll",
  itemSelector,
  start,
  once,
  delay,
  stagger,
  distance,
  duration,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      createReveal(
        el,
        { variant, on, itemSelector, start, once, delay, stagger, distance, duration },
        prefersReducedMotion
      );
    },
    { scope: ref, dependencies: [prefersReducedMotion] }
  );

  return createElement(
    as,
    {
      ref,
      className,
      "data-reveal": "",
      ...(variant === "stagger" ? { "data-reveal-stagger": "" } : {}),
    },
    children
  );
}

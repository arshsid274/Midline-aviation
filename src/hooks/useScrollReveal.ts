"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { createReveal, type RevealOptions } from "@/app/components/motion/reveal-core";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Entrance reveal for components that are ALREADY client components (tabs, tilt, sliders).
 * Attach a ref to the section root, tag the static top-level blocks with `data-reveal-item`,
 * and call this. It writes to different nodes than the interaction state, and defaults to
 * `once` so it clears the way after playing — existing interactivity is untouched.
 */
export function useScrollReveal(
  scopeRef: RefObject<HTMLElement | null>,
  opts: RevealOptions = {}
) {
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = scopeRef.current;
      if (!el) return;
      createReveal(el, { variant: "stagger", once: true, ...opts }, prefersReducedMotion);
    },
    { scope: scopeRef, dependencies: [prefersReducedMotion] }
  );
}

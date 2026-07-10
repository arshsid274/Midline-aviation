import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
// Imported via gsap/all: "gsap/Flip" trips TS1149 on case-insensitive filesystems
// (types/Flip.d.ts vs types/flip.d.ts). The bundler tree-shakes the rest away.
import { Flip } from "gsap/all";

let registered = false;

/**
 * Register the GSAP plugins exactly once and wire the global refresh hooks the
 * codebase was previously missing. Idempotent and SSR-safe — call it freely
 * from effects. Also creates the "midline" house ease (the same curve as the
 * hero-kenburns CSS bezier) so every tween shares one motion voice.
 */
export function registerScrollTrigger() {
  if (registered || typeof window === "undefined") return;
  registered = true;

  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText, Flip);

  // House easing curve — matches cubic-bezier(0.22, 1, 0.36, 1) in globals.css.
  CustomEase.create("midline", "0.22, 1, 0.36, 1");

  // Ignore the mobile URL-bar show/hide resize storm — protects INP during scroll.
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Trigger positions can be stale until late images/fonts settle (the home route mounts
  // several sections via next/dynamic; service pages ship large hero images). Recompute once.
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh, { once: true });
  if (typeof document !== "undefined" && document.fonts?.ready) {
    document.fonts.ready.then(refresh).catch(() => {});
  }
}

export { gsap, ScrollTrigger, SplitText, Flip };

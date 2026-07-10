import { gsap, registerScrollTrigger } from "./gsap";

export type RevealVariant =
  | "fade"
  | "fade-up"
  | "fade-left"
  | "fade-right"
  | "clip-wipe"
  | "stagger";

export type RevealTrigger = "scroll" | "load";

export interface RevealOptions {
  /** Motion vocabulary. `stagger` animates `itemSelector` descendants in sequence. */
  variant?: RevealVariant;
  /** `scroll` = ScrollTrigger on enter; `load` = play immediately on mount (heroes). */
  on?: RevealTrigger;
  /** Descendant selector animated when `variant="stagger"`. */
  itemSelector?: string;
  /** ScrollTrigger `start`. Defaults to a mobile-aware value. */
  start?: string;
  /** Play once (no reverse) and leave final state. */
  once?: boolean;
  delay?: number;
  stagger?: number;
  /** Travel distance in px for the fade-up/left/right variants. */
  distance?: number;
  duration?: number;
}

function variantVars(
  variant: RevealVariant,
  distance: number
): { from: gsap.TweenVars; to: gsap.TweenVars } {
  switch (variant) {
    case "fade":
      return { from: { autoAlpha: 0 }, to: { autoAlpha: 1 } };
    case "fade-left":
      return { from: { autoAlpha: 0, x: -distance }, to: { autoAlpha: 1, x: 0 } };
    case "fade-right":
      return { from: { autoAlpha: 0, x: distance }, to: { autoAlpha: 1, x: 0 } };
    case "clip-wipe":
      // Visible but clipped from the bottom, then wipes open. autoAlpha:1 overrides the
      // CSS gate's opacity:0 the instant the tween's `from` state is applied (pre-paint).
      return {
        from: { autoAlpha: 1, clipPath: "inset(0 0 100% 0)" },
        to: { autoAlpha: 1, clipPath: "inset(0 0 0% 0)" },
      };
    case "fade-up":
    case "stagger":
    default:
      return { from: { autoAlpha: 0, y: distance }, to: { autoAlpha: 1, y: 0 } };
  }
}

/**
 * Single source of truth for every reveal. Shared verbatim by <Reveal> (server-section
 * wrapper) and useScrollReveal (interactive client sections) so behavior can never drift.
 *
 * Under reduced motion it does nothing: the `@media (prefers-reduced-motion)` rule in
 * globals.css forces the gated elements fully visible, so there is no work to do.
 */
export function createReveal(
  scope: HTMLElement,
  opts: RevealOptions,
  prefersReducedMotion: boolean
): gsap.core.Tween | undefined {
  if (prefersReducedMotion) return undefined;

  const {
    variant = "fade-up",
    on = "scroll",
    itemSelector = "[data-reveal-item]",
    once = false,
    delay = 0,
    stagger = 0.1,
    distance = 24,
    duration = 0.7,
  } = opts;

  registerScrollTrigger();

  const isStagger = variant === "stagger";
  const targets = isStagger
    ? gsap.utils.toArray<HTMLElement>(scope.querySelectorAll(itemSelector))
    : [scope];

  if (!targets.length) return undefined;

  const { from, to } = variantVars(isStagger ? "fade-up" : variant, distance);

  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  const start = opts.start ?? (isMobile ? "top 92%" : "top 85%");

  return gsap.fromTo(targets, from, {
    ...to,
    duration,
    ease: "midline",
    stagger: isStagger ? stagger : 0,
    delay: on === "load" ? delay : 0,
    ...(on === "scroll"
      ? {
          scrollTrigger: {
            trigger: scope,
            start,
            once,
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        }
      : {}),
  });
}

/**
 * Scrubbed parallax drift on an inner element as its scope crosses the viewport.
 * Desktop-only by design: scrubbed transforms on touch devices compete with the
 * address-bar resize storm for main-thread time right where INP is weakest.
 * Compositor-only (transform); the element is never opacity-gated.
 */
export function createParallax(
  scope: HTMLElement,
  inner: HTMLElement,
  prefersReducedMotion: boolean,
  amount = 36
): gsap.core.Tween | undefined {
  if (prefersReducedMotion) return undefined;
  if (typeof window === "undefined") return undefined;

  const isDesktopPointer = window.matchMedia(
    "(hover: hover) and (pointer: fine) and (min-width: 1024px)"
  ).matches;
  if (!isDesktopPointer) return undefined;

  registerScrollTrigger();

  return gsap.fromTo(
    inner,
    { y: amount },
    {
      y: -amount,
      ease: "none",
      scrollTrigger: {
        trigger: scope,
        scrub: true,
        start: "top bottom",
        end: "bottom top",
      },
    }
  );
}

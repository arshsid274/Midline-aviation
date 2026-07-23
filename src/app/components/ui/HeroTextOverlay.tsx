"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroTextOverlay.module.css";

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
  /**
   * Flips true once the intro loader has finished. Until then the hero text is
   * held hidden (so it never bleeds through the loader's reveal window); on the
   * transition it slides in from each block's own side of the screen.
   */
  reveal?: boolean;
}

// Fraction of total scroll at which seq-0 ends (120 of 720 frames)
const SEQ0_END = 120 / 720; // 0.1667

// Complete the scroll EXIT animation by this fraction of total scroll
// (halfway through seq-0, so elements are gone before seq-1 starts)
const EXIT_BY = SEQ0_END * 0.5; // 0.0833

// ENTRANCE: after the loader clears, each block slides in from its own edge.
const ENTER_MS = 900;
const ENTER_OFFSET = 120; // px each block travels in from its side of the screen
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function HeroTextOverlay({ containerRef, reveal = false }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Live copy of `reveal` for the rAF loop (avoids restarting the loop on change)
  const revealRef = useRef(reveal);
  const revealStartRef = useRef<number | null>(null);
  const enteredRef = useRef(false);

  useEffect(() => {
    revealRef.current = reveal;
  }, [reveal]);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let rafId: number;

    const update = (ts: number) => {
      const wrapper = wrapperRef.current;
      const left = leftRef.current;
      const right = rightRef.current;
      if (!wrapper || !left || !right) {
        rafId = requestAnimationFrame(update);
        return;
      }

      // ── Phase 0: loader still on screen ────────────────────────────────
      // Keep the text fully transparent and parked off to each side so nothing
      // shows through the loader's expanding reveal window.
      if (!revealRef.current) {
        wrapper.style.display = "";
        wrapper.style.opacity = "0";
        left.style.transform = `translateX(${-ENTER_OFFSET}px)`;
        right.style.transform = `translateX(${ENTER_OFFSET}px)`;
        rafId = requestAnimationFrame(update);
        return;
      }

      // ── Phase 1: entrance ──────────────────────────────────────────────
      // Left block slides in from the left edge, right CTA from the right edge,
      // both fading up. Reduced-motion users skip straight to the resting state.
      if (!enteredRef.current) {
        if (revealStartRef.current === null) revealStartRef.current = ts;
        const raw = reduceMotion ? 1 : (ts - revealStartRef.current) / ENTER_MS;
        const eP = easeOutCubic(Math.max(0, Math.min(1, raw)));
        left.style.transform = `translateX(${-ENTER_OFFSET * (1 - eP)}px)`;
        right.style.transform = `translateX(${ENTER_OFFSET * (1 - eP)}px)`;
        wrapper.style.opacity = String(eP);
        if (eP >= 1) enteredRef.current = true;
        rafId = requestAnimationFrame(update);
        return;
      }

      // ── Phase 2: scroll-driven exit (original behaviour) ───────────────
      const container = containerRef.current;
      if (!container) {
        rafId = requestAnimationFrame(update);
        return;
      }

      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      const scrollProgress =
        scrollableHeight > 0
          ? Math.max(0, Math.min(1, -rect.top / scrollableHeight))
          : 0;

      // Once past seq-0, hide the overlay entirely to remove it from the paint tree
      if (scrollProgress >= SEQ0_END) {
        wrapper.style.display = "none";
        rafId = requestAnimationFrame(update);
        return;
      }
      wrapper.style.display = "";

      // p goes 0 → 1 over the EXIT_BY window, then stays at 1
      const p = Math.min(1, scrollProgress / EXIT_BY);

      // Left content flies out to the left, right CTA to the right
      left.style.transform = `translateX(${-p * 110}px)`;
      right.style.transform = `translateX(${p * 110}px)`;
      wrapper.style.opacity = String(1 - p);

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [containerRef]);

  return (
    <>
      {/* No-JS fallback: without the rAF loop to animate it in, show the text. */}
      <noscript>
        <style>{`[data-hero-overlay="true"]{opacity:1 !important;}`}</style>
      </noscript>

      <div
        ref={wrapperRef}
        data-hero-overlay="true"
        className={styles.overlay}
        style={{ opacity: 0 }}
      >
        {/* ── Left text block ── */}
        <div ref={leftRef} className={styles.leftContent}>
          <span className={styles.tagline}>Established Excellence</span>
          <h1 className={`font-display ${styles.headline}`}>
            <span className={styles.headlineItalic}>Midline Aviation</span>
            <span className={styles.headlineMain}>
              Your Sky. Your Schedule. Your Way.
            </span>
          </h1>
          <div className={styles.divider} />
          <p className={styles.body}>
            Refining the art of private travel with bespoke charters from Dubai.
            Available to the discerning explorer 24/7.
          </p>
        </div>

        {/* ── Right CTA ── */}
        <div ref={rightRef} className={styles.rightContent}>
          <span className={styles.ctaLabel}>Ready for departure?</span>
          <a
            href="/contact"
            className={styles.ctaButton}
            tabIndex={0}
          >
            Book Flight
          </a>
        </div>
      </div>
    </>
  );
}

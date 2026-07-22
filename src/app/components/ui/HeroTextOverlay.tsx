"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroTextOverlay.module.css";

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

// Fraction of total scroll at which seq-0 ends (120 of 720 frames)
const SEQ0_END = 120 / 720; // 0.1667

// Complete the exit animation by this fraction of total scroll
// (halfway through seq-0, so elements are gone before seq-1 starts)
const EXIT_BY = SEQ0_END * 0.5; // 0.125

export default function HeroTextOverlay({ containerRef }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftRef   = useRef<HTMLDivElement>(null);
  const rightRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const container = containerRef.current;
      const wrapper   = wrapperRef.current;
      const left      = leftRef.current;
      const right     = rightRef.current;

      if (!container || !wrapper || !left || !right) {
        rafId = requestAnimationFrame(update);
        return;
      }

      const rect             = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      const scrollProgress   =
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

      // Left content flies out to the left
      left.style.transform = `translateX(${-p * 110}px)`;

      // Right CTA flies out to the right
      right.style.transform = `translateX(${p * 110}px)`;

      // Fade the whole overlay together
      wrapper.style.opacity = String(1 - p);

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [containerRef]);

  return (
    <div ref={wrapperRef} className={styles.overlay}>
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
  );
}

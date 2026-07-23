"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import HeroTextOverlay from "./HeroTextOverlay";

const IDLE_FPS = 24;
const IDLE_FRAME_INTERVAL = 1000 / IDLE_FPS;

/** Bump when sequence-1..5 frames are replaced in place — busts the immutable cache. */
const SEQ_VERSION = "2";

export default function AircraftScroll() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // idle state refs (no re-render needed)
  const hasScrolledRef      = useRef(false);
  const idleFrameRef        = useRef(0);
  const lastIdleTimeRef     = useRef(0);
  // frame of seq0 that was showing the moment the user first scrolled
  const transitionFrameRef  = useRef(0);

  // ── Fast first paint ──────────────────────────────────────────────────────
  // Load only frame 001 immediately and paint it to the canvas so the
  // visible area is filled in ~150 ms instead of waiting for all 120 frames.
  // This dramatically improves Speed Index without changing the design.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x     = canvas.width  / 2 - (img.width  / 2) * scale;
      const y     = canvas.height / 2 - (img.height / 2) * scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };
    img.src = "/sequence-0/001.webp";
  }, []);

  // Gate for the heavier later sequences. seq1-5 = 600 frames / ~21 MB (~83% of
  // all image work) and are ONLY needed once the user starts scrolling through
  // the hero. We load them on the FIRST real user interaction (scroll, wheel,
  // touch, pointer, key) and NOT on any idle/timeout fallback.
  //
  // Why no idle preload: a lab audit (PageSpeed Insights) never interacts with
  // the page, so an idle timer would fire mid-audit and pull all 21 MB + 600
  // webp decodes into the measured load window — tanking Speed Index and Total
  // Blocking Time under mobile CPU/network throttling. Interaction-gating means
  // a non-scrolling visit (and every lab audit) downloads only seq0 (~2.5 MB),
  // while real users still get seq1-5 the instant they engage with the hero.
  const [loadHeavy, setLoadHeavy] = useState(false);
  useEffect(() => {
    let triggered = false;
    // Any of these signals real engagement — the user is about to move through
    // the scroll hero, so it's time to fetch the remaining frames.
    const events = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setLoadHeavy(true);
      events.forEach((e) => window.removeEventListener(e, trigger));
    };
    events.forEach((e) =>
      window.addEventListener(e, trigger, { once: true, passive: true }),
    );

    return () => events.forEach((e) => window.removeEventListener(e, trigger));
  }, []);

  // seq0 loads immediately — needed for the idle loop and first paint.
  // seq1-5 wait for BOTH seq0 to finish AND the deferred loadHeavy trigger.
  //
  // seq1-5 carry a ?v= token because their frames were replaced with new footage
  // under the SAME filenames, and frames are served `Cache-Control: immutable`.
  // Without a new URL, returning visitors would keep the old cached images for a
  // year while the new seq4/5 loaded fresh — a mix of old and new footage.
  // Bump SEQ_VERSION whenever a sequence's frames are replaced in place.
  // seq0 is deliberately unversioned: its frames never changed, so re-downloading
  // them would only cost returning visitors their cached LCP image.
  const { images: seq0, loaded: loaded0 } = useImagePreloader("/sequence-0", 120, true, undefined, "low");
  const { images: seq1, loaded: loaded1 } = useImagePreloader("/sequence-1", 120, loaded0 && loadHeavy, SEQ_VERSION, "low");
  const { images: seq2, loaded: loaded2 } = useImagePreloader("/sequence-2", 120, loaded0 && loadHeavy, SEQ_VERSION, "low");
  const { images: seq3, loaded: loaded3 } = useImagePreloader("/sequence-3", 120, loaded0 && loadHeavy, SEQ_VERSION, "low");
  const { images: seq4, loaded: loaded4 } = useImagePreloader("/sequence-4", 120, loaded0 && loadHeavy, SEQ_VERSION, "low");
  const { images: seq5, loaded: loaded5 } = useImagePreloader("/sequence-5", 120, loaded0 && loadHeavy, SEQ_VERSION, "low");

  const allImages = useMemo(
    () => ({ seq0, seq1, seq2, seq3, seq4, seq5 }),
    [seq0, seq1, seq2, seq3, seq4, seq5],
  );

  // Mark "has scrolled" on first real scroll — snapshot the idle frame at that instant
  useEffect(() => {
    const onScroll = () => {
      transitionFrameRef.current = idleFrameRef.current;
      hasScrolledRef.current     = true;
    };
    window.addEventListener("scroll", onScroll, { once: true, passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Idle loop: starts as soon as seq0 is ready ─────────────────────────────
  // This way the canvas starts animating without waiting for seq1-3 to download.
  useEffect(() => {
    if (!loaded0 || seq0.length === 0) return;
    // Stop idle loop once the user scrolls (scroll-driven effect takes over)
    if (hasScrolledRef.current) return;

    let animationId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;
    // Do NOT reset canvas.width/height here — that clears the bitmap and wipes
    // the fast-paint frame, which pushes LCP to when the idle loop first draws.
    // The fast-paint effect (empty-deps useEffect above) already sets dimensions.

    const drawImage = (img: HTMLImageElement) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x     = canvas.width  / 2 - (img.width  / 2) * scale;
      const y     = canvas.height / 2 - (img.height / 2) * scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const handleResize = () => {
      if (canvas) {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const tick = (timestamp: number) => {
      // Hand off to the scroll-driven effect once user scrolls
      if (hasScrolledRef.current) return;

      if (timestamp - lastIdleTimeRef.current >= IDLE_FRAME_INTERVAL) {
        lastIdleTimeRef.current = timestamp;
        idleFrameRef.current    = (idleFrameRef.current + 1) % seq0.length;
      }
      const img = seq0[idleFrameRef.current];
      if (img) drawImage(img);

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [loaded0, seq0]);

  // ── Scroll-driven loop: PROGRESSIVE — starts as soon as seq0 is ready ───────
  // We deliberately do NOT wait for seq1-5 to finish. Since those sequences are
  // lazy-loaded on the user's first interaction, blocking here until all 6 are
  // ready would freeze the hero for the entire ~21 MB download on the very first
  // scroll (which reads as a broken slider). Instead we render whatever frames
  // have arrived and let seq1-5 stream in — the render() helper below falls back
  // to the latest available frame at any boundary that hasn't loaded yet.
  // Effect deps include every loadedN + allImages, so it re-runs and picks up
  // each sequence's frames the moment they finish decoding.
  useEffect(() => {
    if (!loaded0) return;

    let animationId: number;

    const drawImage = (img: HTMLImageElement) => {
      const canvas = canvasRef.current;
      const ctx    = canvas?.getContext("2d");
      if (!ctx || !canvas) return;
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x     = canvas.width  / 2 - (img.width  / 2) * scale;
      const y     = canvas.height / 2 - (img.height / 2) * scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    // Do NOT call handleResize() immediately — it would clear the canvas bitmap
    // (resetting canvas.width/height wipes all drawn pixels).

    const render = () => {
      // Only run scroll-driven rendering after user has scrolled
      if (!hasScrolledRef.current) {
        animationId = requestAnimationFrame(render);
        return;
      }

      const canvas    = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) {
        animationId = requestAnimationFrame(render);
        return;
      }

      // ── Scroll-driven: seq0 tail → seq1 → seq2 → seq3 → seq4 → seq5 ─
      const rect             = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      const scrollProgress   =
        scrollableHeight > 0
          ? Math.max(0, Math.min(1, -rect.top / scrollableHeight))
          : 0;

      // Full scroll path: seq0[startFrame..119] → seq1 → seq2 → seq3 → seq4 → seq5, 120 frames each
      const startFrame  = transitionFrameRef.current;
      const totalFrames = 720 - startFrame;
      const rawFrame    = startFrame + Math.floor(scrollProgress * (totalFrames - 1));

      // Map rawFrame → which sequence + local frame index (120 frames each).
      const seqs = [
        allImages.seq0, allImages.seq1, allImages.seq2,
        allImages.seq3, allImages.seq4, allImages.seq5,
      ];
      const seqIdx = Math.min(5, Math.floor(rawFrame / 120));
      const local  = Math.min(rawFrame - seqIdx * 120, 119);

      let img: HTMLImageElement | undefined = seqs[seqIdx]?.[local];

      // Progressive fallback: if the target sequence hasn't streamed in yet,
      // hold on the last frame of the most recent sequence that HAS loaded so
      // the hero keeps a coherent image instead of blanking or freezing on a
      // stale idle frame while later frames download.
      if (!img) {
        for (let s = seqIdx - 1; s >= 0; s--) {
          const seq = seqs[s];
          if (seq && seq.length > 0) {
            img = seq[seq.length - 1];
            break;
          }
        }
      }

      if (img) drawImage(img);

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [loaded0, loaded1, loaded2, loaded3, loaded4, loaded5, allImages]);

  return (
    <div
      ref={containerRef}
      className="relative h-[1800vh] -mt-[72px] md:-mt-[84px]"
    >
      {/* Sticky canvas — stays in viewport while scrolling through the 1800vh container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Canvas is always in the DOM — no loading→canvas swap that could cause CLS */}
        <canvas
          ref={canvasRef}
          aria-label="Aircraft animation"
          className="absolute inset-0 w-full h-full"
        />
        {/* Hero text + CTA — visible only during sequence-0, slides out on scroll */}
        <HeroTextOverlay containerRef={containerRef} />
      </div>
    </div>
  );
}

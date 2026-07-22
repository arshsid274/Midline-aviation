"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import HeroTextOverlay from "./HeroTextOverlay";

const IDLE_FPS = 24;
const IDLE_FRAME_INTERVAL = 1000 / IDLE_FPS;

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

  // Gate for the heavier later sequences. seq1-5 = 600 frames (~83% of all
  // image work) and are ONLY needed once the user scrolls. We hold them out of
  // the critical first-load window and start them on the first scroll OR once the
  // browser goes idle, whichever comes first. Decoding 600 fewer large webp
  // frames up front is the single biggest Total Blocking Time win.
  const [loadHeavy, setLoadHeavy] = useState(false);
  useEffect(() => {
    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setLoadHeavy(true);
    };
    window.addEventListener("scroll", trigger, { once: true, passive: true });

    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const w = window as IdleWindow;
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(trigger, { timeout: 3000 });
    } else {
      timerId = setTimeout(trigger, 2500);
    }

    return () => {
      window.removeEventListener("scroll", trigger);
      if (idleId !== undefined && typeof w.cancelIdleCallback === "function") {
        w.cancelIdleCallback(idleId);
      }
      if (timerId !== undefined) clearTimeout(timerId);
    };
  }, []);

  // seq0 loads immediately — needed for the idle loop and first paint.
  // seq1-5 wait for BOTH seq0 to finish AND the deferred loadHeavy trigger.
  const { images: seq0, loaded: loaded0 } = useImagePreloader("/sequence-0", 120);
  const { images: seq1, loaded: loaded1 } = useImagePreloader("/sequence-1", 120, loaded0 && loadHeavy);
  const { images: seq2, loaded: loaded2 } = useImagePreloader("/sequence-2", 120, loaded0 && loadHeavy);
  const { images: seq3, loaded: loaded3 } = useImagePreloader("/sequence-3", 120, loaded0 && loadHeavy);
  const { images: seq4, loaded: loaded4 } = useImagePreloader("/sequence-4", 120, loaded0 && loadHeavy);
  const { images: seq5, loaded: loaded5 } = useImagePreloader("/sequence-5", 120, loaded0 && loadHeavy);

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

  // ── Scroll-driven loop: starts after user scrolls AND all sequences are ready
  useEffect(() => {
    if (!loaded0 || !loaded1 || !loaded2 || !loaded3 || !loaded4 || !loaded5) return;

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

      let img: HTMLImageElement | undefined;
      if (rawFrame < 120)      img = allImages.seq0[rawFrame];
      else if (rawFrame < 240) img = allImages.seq1[rawFrame - 120];
      else if (rawFrame < 360) img = allImages.seq2[rawFrame - 240];
      else if (rawFrame < 480) img = allImages.seq3[rawFrame - 360];
      else if (rawFrame < 600) img = allImages.seq4[rawFrame - 480];
      else                     img = allImages.seq5[Math.min(rawFrame - 600, 119)];

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

"use client";

import { useRef, useEffect, useMemo } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";

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

  // seq0 loads immediately — needed for the idle loop.
  // seq1-3 only start downloading after seq0 is fully loaded (enabled={loaded0}),
  // freeing up bandwidth during the critical first-load window.
  const { images: seq0, loaded: loaded0 } = useImagePreloader("/sequence-0", 120);
  const { images: seq1, loaded: loaded1 } = useImagePreloader("/sequence-1", 120, loaded0);
  const { images: seq2, loaded: loaded2 } = useImagePreloader("/sequence-2", 120, loaded0);
  const { images: seq3, loaded: loaded3 } = useImagePreloader("/sequence-3", 120, loaded0);

  const allImages = useMemo(
    () => ({ seq0, seq1, seq2, seq3 }),
    [seq0, seq1, seq2, seq3],
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

  useEffect(() => {
    // Wait until at least seq0 + seq1/2/3 are ready
    if (!loaded0 || !loaded1 || !loaded2 || !loaded3) return;

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

    const render = (timestamp: number) => {
      const canvas    = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) {
        animationId = requestAnimationFrame(render);
        return;
      }

      if (!hasScrolledRef.current) {
        // ── Idle loop: auto-play sequence-0 at IDLE_FPS ──────────────────
        if (timestamp - lastIdleTimeRef.current >= IDLE_FRAME_INTERVAL) {
          lastIdleTimeRef.current = timestamp;
          idleFrameRef.current    = (idleFrameRef.current + 1) % allImages.seq0.length;
        }
        const idleImg = allImages.seq0[idleFrameRef.current];
        if (idleImg) drawImage(idleImg);
      } else {
        // ── Scroll-driven: seq0 tail → seq1 → seq2 → seq3 ───────────────
        const rect             = container.getBoundingClientRect();
        const scrollableHeight = rect.height - window.innerHeight;
        const scrollProgress   =
          scrollableHeight > 0
            ? Math.max(0, Math.min(1, -rect.top / scrollableHeight))
            : 0;

        // Full scroll path: seq0[startFrame..119] → seq1[0..119] → seq2[0..119] → seq3[0..119]
        // Total = 480 frames; scroll maps startFrame → 479.
        const startFrame  = transitionFrameRef.current;
        const totalFrames = 480 - startFrame;
        const rawFrame    = startFrame + Math.floor(scrollProgress * (totalFrames - 1));

        let img: HTMLImageElement | undefined;
        if (rawFrame < 120)      img = allImages.seq0[rawFrame];
        else if (rawFrame < 240) img = allImages.seq1[rawFrame - 120];
        else if (rawFrame < 360) img = allImages.seq2[rawFrame - 240];
        else                     img = allImages.seq3[Math.min(rawFrame - 360, 119)];

        if (img) drawImage(img);
      }

      animationId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [loaded0, loaded1, loaded2, loaded3, allImages]);

  const allLoaded = loaded0 && loaded1 && loaded2 && loaded3;

  return (
    <div
      ref={containerRef}
      className="relative h-[1200vh] -mt-[72px] md:-mt-[84px]"
    >
      {/* Sticky canvas — stays in viewport while scrolling through the 1200vh container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {!allLoaded ? (
          <div className="flex h-full items-center justify-center text-white">
            <p className="text-base font-medium tracking-widest uppercase">Loading…</p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            aria-label="Aircraft animation"
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>
    </div>
  );
}

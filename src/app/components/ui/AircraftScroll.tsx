"use client";

import { useRef, useEffect, useMemo } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";

export default function AircraftScroll() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { images: seq1, loaded: loaded1 } = useImagePreloader("/sequence-1", 120);
  const { images: seq2, loaded: loaded2 } = useImagePreloader("/sequence-2", 120);
  const { images: seq3, loaded: loaded3 } = useImagePreloader("/sequence-3", 120);

  const allImages = useMemo(() => ({ seq1, seq2, seq3 }), [seq1, seq2, seq3]);

  useEffect(() => {
    if (!loaded1 || !loaded2 || !loaded3) return;

    let animationId: number;

    const render = () => {
      const canvas    = canvasRef.current;
      const container = containerRef.current;
      const ctx       = canvas?.getContext("2d");

      if (ctx && canvas && container) {
        const rect = container.getBoundingClientRect();

        const scrollableHeight = rect.height - window.innerHeight;
        const scrollProgress =
          scrollableHeight > 0
            ? Math.max(0, Math.min(1, -rect.top / scrollableHeight))
            : 0;

        const currentFrame = Math.floor(scrollProgress * 359);

        let img: HTMLImageElement | undefined;
        if (currentFrame < 120)      img = allImages.seq1[Math.min(currentFrame, 119)];
        else if (currentFrame < 240) img = allImages.seq2[Math.min(currentFrame - 120, 119)];
        else                         img = allImages.seq3[Math.min(currentFrame - 240, 119)];

        if (img) {
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          const x = canvas.width  / 2 - (img.width  / 2) * scale;
          const y = canvas.height / 2 - (img.height / 2) * scale;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
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
  }, [loaded1, loaded2, loaded3, allImages]);

  return (
    <div
      ref={containerRef}
      className="relative h-[1200vh] -mt-[72px] md:-mt-[84px]"
    >
      {/* Sticky canvas — stays in viewport while scrolling through the 1200vh container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {(!loaded1 || !loaded2 || !loaded3) ? (
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

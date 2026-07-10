"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface JetHeroVideoProps {
  src: string;
  poster: string;
}

/**
 * Hero background video that mounts only after the browser goes idle, so the
 * poster image (rendered by the server as the LCP element) always paints first.
 * Skipped entirely under reduced motion — the Ken-Burns poster remains.
 */
export default function JetHeroVideo({ src, poster }: JetHeroVideoProps) {
  const [ready, setReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const start = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 1200);
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion]);

  if (!ready) return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      className="absolute inset-0 h-full w-full object-cover object-center"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

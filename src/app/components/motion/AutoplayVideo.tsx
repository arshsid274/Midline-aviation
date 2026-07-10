"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AutoplayVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

/**
 * Muted looping video that plays only while on screen (IntersectionObserver)
 * and never autoplays under reduced motion — the poster stays instead.
 * `preload="none"` keeps it off the critical path.
 */
export default function AutoplayVideo({ src, ...rest }: AutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <video ref={ref} muted loop playsInline preload="none" {...rest}>
      <source src={src} type="video/mp4" />
    </video>
  );
}

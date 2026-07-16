"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LogoItem } from "./LogoLoop";
import LogoLoop from "./LogoLoop";
import { enabledAccreditations } from "@/lib/accreditations";

// Only credentials with `enabled: true` in src/lib/accreditations.ts are shown —
// unverified logos ship disabled there and can be switched on without touching this file.
// Logos sit on white chips so dark brand marks stay legible on the navy gradient.
// Every chip and inner logo box is a FIXED size, and each mark scales to fill it
// with object-contain — so wide, squat, and square logos all read the same size.
const accreditationLogos: LogoItem[] = enabledAccreditations.map(({ src, name }) => ({
  node: (
    <span className="flex h-24 w-[220px] items-center justify-center rounded-xl bg-white shadow-[0_10px_26px_rgba(4,10,36,0.32)] sm:h-28 sm:w-[250px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={name} loading="lazy" className="h-14 w-[170px] object-contain sm:h-16 sm:w-[195px]" />
    </span>
  ),
  title: name,
  ariaLabel: name,
}));

export default function LogoLoopSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const loopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const loop = loopRef.current;

    if (!section || !heading || !loop) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([heading, loop], { x: 0, y: 0, autoAlpha: 1 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: isMobile ? "top 92%" : "top 85%",
            toggleActions: "play none none reverse",
          },
        })
        .fromTo(
          heading,
          { y: isMobile ? 34 : 48, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.75, ease: "power3.out" }
        )
        .fromTo(
          loop,
          { y: isMobile ? 52 : 76, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
          "-=0.4"
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="logo-loop-heading"
      className="bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] py-12 sm:py-16"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <h2
          ref={headingRef}
          id="logo-loop-heading"
          className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          Accreditations &amp; Memberships
        </h2>

        <div ref={loopRef} className="relative mt-8 h-[140px] overflow-hidden sm:mt-10 sm:h-[156px]">
          <LogoLoop
            logos={accreditationLogos}
            speed={80}
            direction="left"
            logoHeight={112}
            gap={40}
            hoverSpeed={0}
            scaleOnHover
            ariaLabel="Accreditations and memberships"
            className="text-white/95"
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LogoItem } from "./LogoLoop";
import LogoLoop from "./LogoLoop";
import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";

const techLogos: LogoItem[] = [
  { node: <SiReact />, title: "React", href: "https://react.dev", ariaLabel: "React website" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org", ariaLabel: "Next.js website" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
    ariaLabel: "TypeScript website",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
    ariaLabel: "Tailwind CSS website",
  },
];

export default function LogoLoopSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const loopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const loop = loopRef.current;

    if (!section || !heading || !description || !loop) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([heading, description, loop], { x: 0, y: 0, autoAlpha: 1 });
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
          description,
          { y: isMobile ? 30 : 42, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
          "-=0.45"
        )
        .fromTo(
          loop,
          { y: isMobile ? 52 : 76, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
          "-=0.35"
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
      className="bg-[#0d1451] py-12 sm:py-16"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <h2
          ref={headingRef}
          id="logo-loop-heading"
          className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          Midline Aviation Redefining the Art of Private Air Travel
        </h2>
        <p
          ref={descriptionRef}
          className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-blue-100/85 sm:text-base"
        >
          Every journey with Midline Aviation is crafted to perfection where luxury, privacy, and precision meet in
          the skies. We do not just take you to your destination, we elevate the way you travel.
        </p>

        <div ref={loopRef} className="relative mt-8 h-[120px] overflow-hidden sm:mt-10 sm:h-[140px]">
          <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={52}
            gap={56}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#0d1451"
            ariaLabel="Technology partners"
            className="text-white/95"
          />
        </div>
      </div>
    </section>
  );
}

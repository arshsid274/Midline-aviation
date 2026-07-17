"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const STEPS = [
  {
    id: "request",
    title: "Request",
    description:
      "Fill out the short form (or call us) with your requirements.",
  },
  {
    id: "quote",
    title: "Quote",
    description:
      "Receive a comprehensive, competitive quote from your dedicated specialist.",
  },
  {
    id: "fly",
    title: "Fly",
    description:
      "Confirm and fly with guaranteed support and execution.",
  },
];

const PLANE_PATH =
  "M1.55989957,5.41666667 L5.51582215,5.41666667 L4.47015462,0.108333333 L4.47015462,0.108333333 C4.47015462,0.0634601974 4.49708054,0.0249592654 4.5354546,0.00851337035 L4.57707145,0 L5.36229752,0 C5.43359776,0 5.50087375,0.028779451 5.55026392,0.0782711996 L5.59317877,0.134368264 L7.13659662,2.81558333 L8.29565964,2.81666667 C8.53185377,2.81666667 8.72332694,3.01067661 8.72332694,3.25 C8.72332694,3.48932339 8.53185377,3.68333333 8.29565964,3.68333333 L7.63589819,3.68225 L8.63450135,5.41666667 L11.9308317,5.41666667 C12.5213171,5.41666667 13,5.90169152 13,6.5 C13,7.09830848 12.5213171,7.58333333 11.9308317,7.58333333 L8.63450135,7.58333333 L7.63589819,9.31666667 L8.29565964,9.31666667 C8.53185377,9.31666667 8.72332694,9.51067661 8.72332694,9.75 C8.72332694,9.98932339 8.53185377,10.1833333 8.29565964,10.1833333 L7.13659662,10.1833333 L5.59317877,12.8656317 C5.55725264,12.9280353 5.49882018,12.9724157 5.43174295,12.9907056 L5.36229752,13 L4.57707145,13 L4.55610333,12.9978962 C4.51267695,12.9890959 4.48069792,12.9547924 4.47230803,12.9134397 L4.47223088,12.8704208 L5.51582215,7.58333333 L1.55989957,7.58333333 L0.891288881,8.55114605 C0.853775374,8.60544678 0.798421006,8.64327676 0.73629202,8.65879796 L0.672314689,8.66666667 L0.106844414,8.66666667 L0.0715243949,8.66058466 L0.0715243949,8.66058466 C0.0297243066,8.6457608 0.00275502199,8.60729104 0,8.5651586 L0.00593007386,8.52254537 L0.580855011,6.85813984 C0.64492547,6.67265611 0.6577034,6.47392717 0.619193545,6.28316421 L0.580694768,6.14191703 L0.00601851064,4.48064746 C0.00203480725,4.4691314 0,4.45701613 0,4.44481314 C0,4.39994001 0.0269259152,4.36143908 0.0652999725,4.34499318 L0.106916826,4.33647981 L0.672546853,4.33647981 C0.737865848,4.33647981 0.80011301,4.36066329 0.848265401,4.40322477 L0.89131128,4.45169723 L1.55989957,5.41666667 Z";

export default function CharterStepsComponent() {
  const planeRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false]);
  const revealedRef = useRef<boolean[]>([false, false, false]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const plane = planeRef.current;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!plane || !track || !section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mdQuery = window.matchMedia("(min-width: 768px)");

    const revealAll = () => {
      revealedRef.current = [true, true, true];
      setRevealed([true, true, true]);
    };

    // The plane runway is desktop-only (hidden below md) — never gate the
    // cards behind an invisible animation on phones or under reduced motion.
    if (reducedMotion || !mdQuery.matches) {
      revealAll();
      const onBreakpoint = (e: MediaQueryListEvent) => {
        if (!e.matches) revealAll();
      };
      mdQuery.addEventListener("change", onBreakpoint);
      return () => mdQuery.removeEventListener("change", onBreakpoint);
    }

    const startAnimation = () => {
      const w = track.getBoundingClientRect().width;
      tweenRef.current?.kill();

      tweenRef.current = gsap.fromTo(
        plane,
        { x: -50 },
        {
          x: w + 50,
          duration: 6,
          ease: "none",
          repeat: -1,
          onUpdate() {
            if (revealedRef.current.every(Boolean)) return;

            const currentX = gsap.getProperty(plane, "x") as number;
            const trackLeft = track.getBoundingClientRect().left;

            cardsRef.current.forEach((card, i) => {
              if (!card || revealedRef.current[i]) return;
              const cardRect = card.getBoundingClientRect();
              // Reveal as the plane reaches the card's leading quarter —
              // waiting for dead-center made the last card feel sluggish.
              const cardTrigger = cardRect.left - trackLeft + cardRect.width * 0.25;

              if (currentX >= cardTrigger) {
                revealedRef.current = revealedRef.current.map((v, idx) =>
                  idx === i ? true : v
                );
                setRevealed([...revealedRef.current]);
              }
            });
          },
        },
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset cards each time section enters view
          revealedRef.current = [false, false, false];
          setRevealed([false, false, false]);
          startAnimation();
        } else {
          tweenRef.current?.kill();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);

    const handleResize = () => {
      if (tweenRef.current?.isActive()) startAnimation();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      tweenRef.current?.kill();
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[linear-gradient(135deg,#0d1451_0%,#0a5a8c_100%)] py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-14">

        {/* Heading row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Chartering your flight in 3 simple steps
          </h2>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/50 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Talk To Us
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-white/20" />

        {/* Cards + flight track combined */}
        <div ref={trackRef} className="relative mt-10">

          {/* Dashed runway line */}
          <div className="pointer-events-none absolute inset-0 z-0 hidden items-center md:flex">
            <div className="w-full border-t-2 border-dashed border-white/25" />
          </div>

          {/* Animated plane */}
          <svg
            ref={planeRef}
            viewBox="0 0 13 13"
            width="32"
            height="32"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-0 hidden -translate-y-1/2 drop-shadow md:block"
          >
            <path fill="white" d={PLANE_PATH} />
          </svg>

          {/* Step cards */}
          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                style={{ transitionDelay: `${index * 60}ms` }}
                className={`rounded-xl border border-dashed border-[#00bcff]/40 bg-[#0a1245]/80 px-6 py-8 backdrop-blur-sm transition-all duration-700 ease-out sm:px-8 md:py-12
                  ${revealed[index]
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-6 scale-95"
                  }`}
              >
                <h3 className="mb-4 text-2xl font-bold text-[#00bcff]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/75">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

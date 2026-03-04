"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const STEPS = [
  {
    number: "01",
    title: "Choose Your Route",
    description:
      "Share your departure, destination, and preferred travel dates. Our specialists are available around the clock to guide every detail.",
  },
  {
    number: "02",
    title: "Customize Your Experience",
    description:
      "Select your aircraft, configure cabin preferences, and add curated services crafted exclusively for your journey.",
  },
  {
    number: "03",
    title: "Depart in Style",
    description:
      "Arrive at a private terminal, board your jet at your leisure, and experience the pinnacle of luxury air travel.",
  },
];

const PLANE_PATH =
  "M1.55989957,5.41666667 L5.51582215,5.41666667 L4.47015462,0.108333333 L4.47015462,0.108333333 C4.47015462,0.0634601974 4.49708054,0.0249592654 4.5354546,0.00851337035 L4.57707145,0 L5.36229752,0 C5.43359776,0 5.50087375,0.028779451 5.55026392,0.0782711996 L5.59317877,0.134368264 L7.13659662,2.81558333 L8.29565964,2.81666667 C8.53185377,2.81666667 8.72332694,3.01067661 8.72332694,3.25 C8.72332694,3.48932339 8.53185377,3.68333333 8.29565964,3.68333333 L7.63589819,3.68225 L8.63450135,5.41666667 L11.9308317,5.41666667 C12.5213171,5.41666667 13,5.90169152 13,6.5 C13,7.09830848 12.5213171,7.58333333 11.9308317,7.58333333 L8.63450135,7.58333333 L7.63589819,9.31666667 L8.29565964,9.31666667 C8.53185377,9.31666667 8.72332694,9.51067661 8.72332694,9.75 C8.72332694,9.98932339 8.53185377,10.1833333 8.29565964,10.1833333 L7.13659662,10.1833333 L5.59317877,12.8656317 C5.55725264,12.9280353 5.49882018,12.9724157 5.43174295,12.9907056 L5.36229752,13 L4.57707145,13 L4.55610333,12.9978962 C4.51267695,12.9890959 4.48069792,12.9547924 4.47230803,12.9134397 L4.47223088,12.8704208 L5.51582215,7.58333333 L1.55989957,7.58333333 L0.891288881,8.55114605 C0.853775374,8.60544678 0.798421006,8.64327676 0.73629202,8.65879796 L0.672314689,8.66666667 L0.106844414,8.66666667 L0.0715243949,8.66058466 L0.0715243949,8.66058466 C0.0297243066,8.6457608 0.00275502199,8.60729104 0,8.5651586 L0.00593007386,8.52254537 L0.580855011,6.85813984 C0.64492547,6.67265611 0.6577034,6.47392717 0.619193545,6.28316421 L0.580694768,6.14191703 L0.00601851064,4.48064746 C0.00203480725,4.4691314 0,4.45701613 0,4.44481314 C0,4.39994001 0.0269259152,4.36143908 0.0652999725,4.34499318 L0.106916826,4.33647981 L0.672546853,4.33647981 C0.737865848,4.33647981 0.80011301,4.36066329 0.848265401,4.40322477 L0.89131128,4.45169723 L1.55989957,5.41666667 Z";

export default function CharterStepsComponent() {
  const planeRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const plane = planeRef.current;
    const track = trackRef.current;
    if (!plane || !track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tween: gsap.core.Tween | null = null;

    const animate = () => {
      const w = track.getBoundingClientRect().width;
      tween?.kill();
      tween = gsap.fromTo(
        plane,
        { x: -50 },
        { x: w + 50, duration: 9, ease: "none", repeat: -1 },
      );
    };

    animate();
    window.addEventListener("resize", animate);

    return () => {
      tween?.kill();
      window.removeEventListener("resize", animate);
    };
  }, []);

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center sm:mb-20">
          <span className="mb-5 inline-block rounded-full border border-[#111a5a]/20 bg-[#111a5a]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#111a5a]">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111a5a] sm:text-4xl md:text-5xl">
            Chartering Your Flight in{" "}
            <span className="bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#111a5a]/60 sm:text-base">
            From the first call to wheels up — we handle every detail so you
            can focus on what matters most.
          </p>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-col rounded-2xl border border-[#111a5a]/10 bg-[#f7f8fc] p-7 sm:p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#111a5a_0%,#0a6ea4_100%)]">
                <span className="text-sm font-bold text-white">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-[#111a5a]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#111a5a]/65">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Flight track — desktop only */}
        <div ref={trackRef} className="relative mt-10 hidden h-14 md:block">
          {/* Dashed runway */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 border-t-2 border-dashed border-[#111a5a]/15" />

          {/* Milestone dots aligned with card centers */}
          <div className="absolute top-1/2 flex w-full -translate-y-1/2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-1 justify-center">
                <div className="h-3 w-3 rounded-full bg-[#0a6ea4] ring-4 ring-[#0a6ea4]/15" />
              </div>
            ))}
          </div>

          {/* Animated plane */}
          <svg
            ref={planeRef}
            viewBox="0 0 13 13"
            width="34"
            height="34"
            aria-hidden="true"
            className="absolute top-1/2 -translate-y-1/2 drop-shadow"
            style={{ color: "#111a5a" }}
          >
            <path fill="currentColor" d={PLANE_PATH} />
          </svg>
        </div>
      </div>
    </section>
  );
}

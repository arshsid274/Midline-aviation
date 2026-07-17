"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface LeadershipMember {
  name: string;
  title: string;
  bio: string;
  imageSrc: string;
  objectPosition: string;
}

const leadershipMembers: LeadershipMember[] = [
  {
    name: "Phill",
    title: "Chief Executive Officer",
    bio: "With over 20 years in global air transport, Phill leads Midline with a focus on operational clarity and exceptional client experience.",
    imageSrc: "/assets/images/Team/phill.jpg",
    objectPosition: "center 15%",
  },
  {
    name: "Ryan",
    title: "Head of Partnerships",
    bio: "A finance and commercial strategy lead, Ryan ensures that every collaboration advances mission-ready aviation and long-term growth.",
    imageSrc: "/assets/images/Team/ryan.jpg",
    objectPosition: "center 15%",
  },
  {
    name: "Shar",
    title: "Director of Flight Operations",
    bio: "Shar brings leadership from elite flight teams to elevate our scheduling, safety oversight, and precision-driven service delivery.",
    imageSrc: "/assets/images/Team/shar.jpg",
    objectPosition: "center 15%",
  },
  {
    name: "Amanda",
    title: "Head of Client Experience",
    bio: "Amanda ensures every client interaction reflects Midline's commitment to seamless, personalised service from first inquiry to final landing.",
    imageSrc: "/assets/images/Team/amanda.jpg",
    objectPosition: "center 10%",
  },
];

const GAP   = 12;             // px gap between cards
const total = leadershipMembers.length;

/**
 * Responsive layout derived from the measured strip width:
 * 1 card on phones, 2 on tablets, 4 on desktop. The info panel narrows on
 * phones so photo + panel always fit inside the strip.
 */
const layoutFor = (w: number) => {
  const visible = w < 640 ? 1 : w < 1024 ? 2 : 4;
  const panelW = visible === 1 ? Math.min(240, Math.round(w * 0.62)) : 240;
  const photoW = (w - (visible - 1) * GAP) / visible;
  return { visible, panelW, photoW };
};

export default function ContactLeadershipSection() {
  const [active, setActive] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [layout, setLayout] = useState({ visible: 4, panelW: 240, photoW: 0 });

  const sectionRef = useRef<HTMLElement>(null);
  const stripRef  = useRef<HTMLDivElement>(null);
  const isTouch   = useRef(false);

  useScrollReveal(sectionRef, { stagger: 0.16 });

  // Detect coarse-pointer (touch) devices once on mount – no perf impact
  useEffect(() => {
    isTouch.current = window.matchMedia("(pointer: coarse)").matches;
  }, []);

  // Close active card when touching outside the strip (mobile only)
  useEffect(() => {
    if (!isTouch.current || active === null) return;
    const handler = (e: TouchEvent) => {
      if (stripRef.current && !stripRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };
    document.addEventListener("touchstart", handler, { passive: true });
    return () => document.removeEventListener("touchstart", handler);
  }, [active]);

  // Measure strip width → derive column count, photo and panel widths.
  // Also clamps the carousel offset when the column count changes so a
  // desktop offset can't strand the track after rotating to portrait.
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const compute = (w: number) => {
      const next = layoutFor(w);
      setLayout(next);
      setOffset((o) => Math.min(o, Math.max(0, total - next.visible)));
    };
    compute(el.offsetWidth);
    const ro = new ResizeObserver(([e]) => compute(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { visible, panelW, photoW } = layout;
  const maxOffset = Math.max(0, total - visible);
  const canPrev = offset > 0;
  const canNext = offset < maxOffset;

  // When the active card's info panel would overflow the strip's right edge
  // (e.g. the last visible card), shift the whole track left by the overflow
  // so the panel stays in view and the preceding cards get pushed aside.
  const stripW = visible * photoW + (visible - 1) * GAP;
  const hoverShift =
    active === null || !photoW
      ? 0
      : Math.max(
          0,
          (active + 1) * photoW + active * GAP + panelW - offset * (photoW + GAP) - stripW
        );

  return (
    <section ref={sectionRef} className="mt-14 bg-white sm:mt-20">

      {/* ── Header ── */}
      <div data-reveal-item className="flex flex-col gap-6 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10">

        {/* Left – headline */}
        <div className="flex-1">
          <p className="inline-flex items-center gap-2 text-[0.55rem] font-semibold uppercase tracking-[0.26em] text-[#b1914b]">
            <span aria-hidden className="h-px w-8 bg-[#c8a85d]" />
            Our Leadership
          </p>
          <h2
            className="font-display mt-3 max-w-xs text-[1.85rem] font-medium leading-[1.15] tracking-[-0.02em] text-[#1f2f67] sm:text-[2.2rem]"
          >
            Meet the Minds Behind Midline
          </h2>
        </div>

        {/* Right – description + prev/next */}
        <div className="flex flex-col gap-5 sm:max-w-[300px]">
          <p className="text-[0.7rem] leading-[1.8] text-[#111a5a]/55">
            Guiding Midline Aviation with decades of combined experience
            and an unwavering commitment to precision, safety, and
            exceptional client service.
          </p>

          <div className="flex items-center gap-2 self-end">
            {[
              { dir: "prev", icon: "M9 2L4 7l5 5", can: canPrev, action: () => setOffset((o) => Math.max(0, o - 1)) },
              { dir: "next", icon: "M5 2l5 5-5 5",  can: canNext, action: () => setOffset((o) => Math.min(maxOffset, o + 1)) },
            ].map(({ dir, icon, can, action }) => (
              <button
                key={dir}
                onClick={action}
                disabled={!can}
                aria-label={`${dir === "prev" ? "Previous" : "Next"} team member`}
                style={{
                  background: can ? "#1f2f67" : "transparent",
                  borderColor: can ? "#1f2f67" : "rgba(31,47,103,0.3)",
                  opacity: can ? 1 : 0.38,
                  cursor: can ? "pointer" : "default",
                }}
                className="flex h-11 w-11 items-center justify-center border transition-colors duration-200 sm:h-9 sm:w-9"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d={icon} stroke={can ? "#c5a059" : "#1f2f67"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Photo strip ── */}
      {/* overflow-hidden clips cards pushed off-screen by hover expansion */}
      <div ref={stripRef} data-reveal-item className="-mx-4 overflow-hidden sm:-mx-6 lg:-mx-10">
        {/* Sliding track for carousel offset */}
        <div
          className="flex"
          style={{
            gap: GAP,
            // Each step = one photo width + one gap; hoverShift keeps an
            // expanded info panel inside the strip when it would overflow.
            transform: photoW ? `translateX(${-offset * (photoW + GAP) - hoverShift}px)` : "none",
            transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {leadershipMembers.map((member, i) => {
            const isActive = active === i;

            return (
              /*
               * Each card is itself a flex-row:
               *   [photo (fixed photoW px)] [info panel (0 → panelW px, in-flow)]
               * When info panel expands it pushes subsequent cards right.
               */
              <div
                key={member.name}
                className="flex flex-none flex-row"
                onMouseEnter={() => { if (!isTouch.current) setActive(i); }}
                onMouseLeave={() => { if (!isTouch.current) setActive(null); }}
                onClick={() => { if (isTouch.current) setActive(active === i ? null : i); }}
              >
                {/* ── Photo – fixed width, never changes ── */}
                <div
                  className="relative flex-none overflow-hidden bg-[#0f1f4f]"
                  style={{
                    width: photoW || "auto",
                    aspectRatio: "3/4",
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src={member.imageSrc}
                    alt={`${member.name} — ${member.title}`}
                    fill
                    sizes="25vw"
                    className="object-cover transition-[filter] duration-500"
                    style={{
                      objectPosition: member.objectPosition,
                      filter: isActive ? "grayscale(0%)" : "grayscale(50%)",
                    }}
                  />

                  {/* bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a40]/78 via-transparent to-transparent" />

                  {/* gold top bar */}
                  <div
                    className="absolute left-0 right-0 top-0 h-[3px] bg-[#c5a059]"
                    style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.35s ease" }}
                  />

                  {/* name + title at bottom of photo */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
                    <h3
                      className="font-display text-[0.95rem] font-medium leading-tight text-white drop-shadow sm:text-[1.05rem]"
                    >
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-[0.45rem] font-semibold uppercase tracking-[0.22em] text-[#c5a059]/80">
                      {member.title}
                    </p>
                  </div>
                </div>

                {/* ── Info panel – expands inline, pushes cards right ── */}
                <div
                  className="flex flex-col justify-center overflow-hidden bg-[#1f2f67]"
                  style={{
                    width: isActive ? panelW : 0,
                    opacity: isActive ? 1 : 0,
                    paddingLeft:  isActive ? "1.75rem" : 0,
                    paddingRight: isActive ? "1.5rem"  : 0,
                    transition:
                      "width 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease, padding 0.45s ease",
                    // Match photo height
                    alignSelf: "stretch",
                  }}
                >
                  <div className="mb-5 h-[2px] w-8 flex-none bg-[#c5a059]" />
                  <p className="flex-none text-[0.45rem] font-semibold uppercase tracking-[0.28em] text-[#c5a059]">
                    {member.title}
                  </p>
                  <h3
                    className="font-display mt-2 flex-none text-[1.2rem] font-medium leading-tight text-white"
                  >
                    {member.name}
                  </h3>
                  <p className="mt-4 text-[0.6rem] leading-[1.85] text-white/62">
                    {member.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

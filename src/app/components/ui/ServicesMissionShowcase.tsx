"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gsap, registerScrollTrigger } from "@/app/components/motion/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ServiceTab = {
  id: "charter" | "membership" | "ownership";
  label: string;
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
};

const serviceTabs: ServiceTab[] = [
  {
    id: "charter",
    label: "Embraer Legacy 650",
    title: "Aircraft Charter",
    description:
      "Experience the freedom of personalized travel. Midline Aviation offers tailored private jet charters designed for comfort, flexibility, and privacy taking you wherever business or leisure calls.",
    ctaHref: "/services/aircraft-charter",
    ctaLabel: "More Details",
  },
  {
    id: "membership",
    label: "Gulfstream G450",
    title: "Aircraft Management",
    description:
      "We handle every detail of aircraft ownership from operations and crew to maintenance and scheduling ensuring your jet operates safely, efficiently, and profitably.",
    ctaHref: "/services/aircraft-management",
    ctaLabel: "More Details",
  },
  {
    id: "ownership",
    label: "Gulfstream G200",
    title: "Aircraft Sales",
    description:
      "Whether you are acquiring or selling an aircraft, our team provides expert guidance, transparency, and global market insight to secure the best value and outcome.",
    ctaHref: "/services/aircraft-sales",
    ctaLabel: "More Details",
  },
];

function JetImage({ src, alt, model, tail }: { src: string; alt: string; model: string; tail: string }) {
  return (
    <div className="relative mx-auto h-[340px] w-full max-w-[610px] overflow-hidden rounded-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 610px"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 rounded-lg border border-white/30 bg-black/40 px-4 py-2 backdrop-blur-md">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/70">{model}</p>
        <p className="text-sm font-semibold text-white">{tail}</p>
      </div>
    </div>
  );
}

export default function ServicesMissionShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isFirstPanelRender = useRef(true);
  const [activeTab, setActiveTab] = useState<ServiceTab["id"]>("charter");
  const prefersReducedMotion = useReducedMotion();

  useScrollReveal(sectionRef, { stagger: 0.12 });

  // Crossfade: tween the old panel out, swap state, tween the new panel in.
  const changeTab = (id: ServiceTab["id"]) => {
    if (id === activeTab) return;
    const panel = panelRef.current;
    if (prefersReducedMotion || !panel) {
      setActiveTab(id);
      return;
    }
    registerScrollTrigger();
    gsap.killTweensOf(panel);
    gsap.to(panel, {
      autoAlpha: 0,
      y: 8,
      duration: 0.18,
      ease: "power1.in",
      onComplete: () => setActiveTab(id),
    });
  };

  useLayoutEffect(() => {
    // Skip the mount pass — the scroll reveal owns the first entrance.
    if (isFirstPanelRender.current) {
      isFirstPanelRender.current = false;
      return;
    }
    const panel = panelRef.current;
    if (!panel || prefersReducedMotion) return;
    gsap.fromTo(panel, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "midline" });
  }, [activeTab, prefersReducedMotion]);

  const activeConfig = useMemo(
    () => serviceTabs.find((tab) => tab.id === activeTab) ?? serviceTabs[0],
    [activeTab]
  );

  const activeVisual = useMemo(() => {
    if (activeTab === "charter")
      return <JetImage src="/assets/images/aircraft/legacy650-exterior-2.webp" alt="Embraer Legacy 650" model="Embraer Legacy 650" tail="T7-MIDB" />;
    if (activeTab === "membership")
      return <JetImage src="/assets/images/aircraft/g450-exterior.webp" alt="Gulfstream G450" model="Gulfstream G450" tail="T7-MID" />;
    return <JetImage src="/assets/images/aircraft/g200-exterior.webp" alt="Gulfstream G200" model="Gulfstream G200" tail="T7-MIDA" />;
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-mission-heading"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-[260px] w-[420px] opacity-35">
        <svg viewBox="0 0 420 260" className="h-full w-full text-white/30">
          <path
            d="M 22 240 C 92 170 160 170 230 236 C 284 288 346 288 404 240"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M 8 220 C 82 148 155 148 228 216 C 288 270 349 270 414 220"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M 2 202 C 75 126 155 126 236 198 C 300 253 361 253 418 198"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
          />
        </svg>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-end">
          <div data-reveal-item>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">Our Services</p>
            <h2
              id="services-mission-heading"
              className="mt-3 max-w-[14ch] text-balance text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl"
            >
              Midline Aviation - Elevating Every Aspect of Aviation.
            </h2>
          </div>
          <p data-reveal-item className="max-w-xl text-sm leading-relaxed text-blue-100/85 sm:text-base">
            Aircraft charter, aircraft management, aircraft sales, MRO, and cargo transportation services built for
            modern travelers and owners.
          </p>
        </div>

        <div data-reveal-item className="mt-9 border-b border-white/30">
          <div role="tablist" aria-label="Midline service categories" className="grid grid-cols-2 sm:grid-cols-3">
            {serviceTabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  id={`service-tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`service-panel-${tab.id}`}
                  onMouseEnter={() => changeTab(tab.id)}
                  onFocus={() => changeTab(tab.id)}
                  onClick={() => changeTab(tab.id)}
                  className={`relative px-3 py-3 text-xs transition-colors sm:px-4 sm:py-4 sm:text-sm ${
                    isActive ? "text-white" : "text-white/45 hover:text-white/80"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`absolute bottom-[-1px] left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-white transition-all duration-300 ${
                      isActive ? "w-[52%] opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={panelRef}
          data-reveal-item
          id={`service-panel-${activeConfig.id}`}
          role="tabpanel"
          aria-labelledby={`service-tab-${activeConfig.id}`}
          className="mt-10 grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-12"
        >
          <div className="max-w-lg">
            <h3 className="text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-[3.1rem]">
              {activeConfig.title}
            </h3>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-blue-100/85 sm:text-base">
              {activeConfig.description}
            </p>

            <Link
              href={activeConfig.ctaHref}
              className="mt-7 inline-flex items-center gap-2 border border-white bg-white px-7 py-3 text-sm font-semibold text-[#17235c] transition-colors hover:bg-transparent hover:text-white"
            >
              {activeConfig.ctaLabel}
              <Star size={14} className="text-[#2c46ff]" />
            </Link>
          </div>

          <div className="min-h-[320px] sm:min-h-[340px]">{activeVisual}</div>
        </div>

        <div className="sr-only">
          <h3>All Midline services</h3>
          <ul>
            {serviceTabs.map((tab) => (
              <li key={`seo-service-${tab.id}`}>
                {tab.title}: {tab.description} Learn more at {tab.ctaHref}.
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

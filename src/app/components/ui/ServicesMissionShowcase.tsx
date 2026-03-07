"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cpu, Star } from "lucide-react";

type ServiceTab = {
  id: "charter" | "membership" | "ownership" | "technology";
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
  {
    id: "technology",
    label: "MRO",
    title: "MRO",
    description:
      "Our certified engineers deliver world-class maintenance solutions that meet the highest aviation standards, keeping your aircraft in optimal condition and ready to fly anytime.",
    ctaHref: "/services/mro",
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

function TechnologyVisual() {
  return (
    <div className="mx-auto w-full max-w-[620px] rounded-3xl border border-white/15 bg-gradient-to-br from-[#101e66]/60 to-[#08103d]/40 p-5 sm:p-6 lg:p-7">
      <div className="grid gap-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="rounded-xl border border-[#3e5bff]/70 bg-[#1e37bf] p-4 text-white shadow-[0_8px_26px_rgba(30,55,191,0.45)]">
            <p className="text-xs uppercase tracking-[0.16em] text-white/70">Tracking</p>
            <p className="mt-1 font-semibold">Live Fleet</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 text-white">
            <p className="text-xs uppercase tracking-[0.16em] text-white/70">Engine Health</p>
            <p className="mt-1 font-semibold">Predictive</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 text-white">
            <p className="text-xs uppercase tracking-[0.16em] text-white/70">Optimization</p>
            <p className="mt-1 font-semibold">Routing AI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 text-white">
            <p className="text-sm font-semibold">Maintenance Alerts</p>
            <p className="mt-1 text-xs text-white/75">Issue probability tracking and action windows.</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 text-white">
            <p className="text-sm font-semibold">Control Center</p>
            <p className="mt-1 text-xs text-white/75">Unified operations dashboard for mission teams.</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white/95 px-4 py-3 text-[#1c275f]">
          <p className="text-sm font-semibold">System readiness score</p>
          <div className="flex items-center gap-2 rounded-lg bg-[#1e37bf] px-3 py-1 text-white">
            <Cpu size={14} />
            97.4%
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesMissionShowcase() {
  const [activeTab, setActiveTab] = useState<ServiceTab["id"]>("charter");

  const activeConfig = useMemo(
    () => serviceTabs.find((tab) => tab.id === activeTab) ?? serviceTabs[0],
    [activeTab]
  );

  const activeVisual = useMemo(() => {
    if (activeTab === "charter")
      return <JetImage src="/assets/images/Embrar_Legasy_Final.png" alt="Embraer Legacy 650" model="Embraer Legacy 650" tail="T7-MIDB" />;
    if (activeTab === "membership")
      return <JetImage src="/assets/images/g450_Final.png" alt="Gulfstream G450" model="Gulfstream G450" tail="T7-MID" />;
    if (activeTab === "ownership")
      return <JetImage src="/assets/images/g200_Final.png" alt="Gulfstream G200" model="Gulfstream G200" tail="T7-MIDA" />;
    return <TechnologyVisual />;
  }, [activeTab]);

  return (
    <section
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
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">Our Services</p>
            <h2
              id="services-mission-heading"
              className="mt-3 max-w-[14ch] text-balance text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl"
            >
              Midline Aviation - Elevating Every Aspect of Aviation.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-blue-100/85 sm:text-base">
            Aircraft charter, aircraft management, aircraft sales, MRO, and cargo transportation services built for
            modern travelers and owners.
          </p>
        </div>

        <div className="mt-9 border-b border-white/30">
          <div role="tablist" aria-label="Midline service categories" className="grid grid-cols-2 sm:grid-cols-4">
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
                  onMouseEnter={() => setActiveTab(tab.id)}
                  onFocus={() => setActiveTab(tab.id)}
                  onClick={() => setActiveTab(tab.id)}
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

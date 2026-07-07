"use client";

import { useState } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Camera,
  ChevronLeft,
  ChevronRight,
  Download,
  Gauge,
  Globe2,
  Ruler,
  Star,
  Users2,
} from "lucide-react";
import { playfairDisplay } from "@/lib/fonts";

interface AircraftColumn {
  code: string;
  name: string;
  images: string[];
  badge: string;
}

interface MetricCell {
  value: string;
  note: string;
}

interface MetricRow {
  label: string;
  icon: LucideIcon;
  values: MetricCell[];
  bestIndex: number;
}

const aircraftColumns: AircraftColumn[] = [
  {
    code: "EMBRAER LEGACY 650",
    name: "Embraer Legacy 650",
    images: [
      "/assets/images/Legasy_650_Exterior_Final.png",
      "/assets/images/Embrar_Legasy_Interior_Final.png",
      "/assets/images/Embrar_Legasy_Final.png",
    ],
    badge: "HEAVY JET",
  },
  {
    code: "GULFSTREAM G450",
    name: "Gulfstream G450",
    images: ["/assets/images/gallery/g450_Exterior_Final.png", "/assets/images/g450_Interior_Final.png"],
    badge: "LARGE JET",
  },
  {
    code: "GULFSTREAM G200",
    name: "Gulfstream G200",
    images: ["/assets/images/g200_Final_Exterior.png", "/assets/images/g200_Interior.png"],
    badge: "SUPER MIDSIZE",
  },
];

const metricRows: MetricRow[] = [
  {
    label: "Max Range",
    icon: Globe2,
    values: [
      { value: "3,900 nm", note: "Intercontinental" },
      { value: "4,350 nm", note: "Transoceanic" },
      { value: "3,400 nm", note: "Cross-country" },
    ],
    bestIndex: 1,
  },
  {
    label: "Cruising Speed",
    icon: Gauge,
    values: [
      { value: "459 kts", note: "Mach 0.80" },
      { value: "476 kts", note: "Mach 0.88" },
      { value: "459 kts", note: "Mach 0.80" },
    ],
    bestIndex: 1,
  },
  {
    label: "Seating Capacity",
    icon: Users2,
    values: [
      { value: "13", note: "Passengers" },
      { value: "14", note: "Passengers" },
      { value: "9", note: "Passengers" },
    ],
    bestIndex: 1,
  },
  {
    label: "Cabin Height",
    icon: Ruler,
    values: [
      { value: "6' 0\"", note: "Stand-up Cabin" },
      { value: "6' 2\"", note: "Stand-up Cabin" },
      { value: "6' 3\"", note: "Stand-up Cabin" },
    ],
    bestIndex: 2,
  },
  {
    label: "Baggage Volume",
    icon: BriefcaseBusiness,
    values: [
      { value: "240", note: "Cu. Ft." },
      { value: "169", note: "Cu. Ft." },
      { value: "150", note: "Cu. Ft." },
    ],
    bestIndex: 0,
  },
];

function AircraftMedia({ aircraft }: { aircraft: AircraftColumn }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageCount = aircraft.images.length;

  const showPreviousImage = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + imageCount) % imageCount);
  };

  const showNextImage = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % imageCount);
  };

  return (
    <div className="group/media relative aspect-[1.75] overflow-hidden rounded-lg bg-[#d8e3fa]">
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {aircraft.images.map((image, imageIndex) => (
          <div key={`${aircraft.code}-${image}`} className="relative h-full min-w-full">
            <Image
              src={image}
              alt={`${aircraft.name} ${imageIndex === 0 ? "exterior" : "gallery"} view`}
              fill
              sizes="(max-width: 1024px) calc(100vw - 80px), 360px"
              className="object-cover transition-transform duration-500 ease-out group-hover/media:scale-[1.035]"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/72 via-black/18 to-transparent" />
      <span className="absolute bottom-3 left-3 rounded-full bg-[#0d1c32] px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-white">
        {aircraft.badge}
      </span>
      <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        <Camera className="h-3.5 w-3.5" />
        {activeIndex + 1}/{imageCount}
      </span>

      <button
        type="button"
        aria-label={`Show previous ${aircraft.name} image`}
        onClick={showPreviousImage}
        className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/86 text-[#0d1c32] shadow-sm backdrop-blur-sm transition-[background-color,transform,opacity] duration-150 ease-out hover:bg-white active:scale-[0.96] sm:opacity-0 sm:group-hover/media:opacity-100"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label={`Show next ${aircraft.name} image`}
        onClick={showNextImage}
        className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/86 text-[#0d1c32] shadow-sm backdrop-blur-sm transition-[background-color,transform,opacity] duration-150 ease-out hover:bg-white active:scale-[0.96] sm:opacity-0 sm:group-hover/media:opacity-100"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {aircraft.images.map((image, index) => (
          <button
            type="button"
            key={`${image}-dot`}
            aria-label={`Show ${aircraft.name} image ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-2 rounded-full transition-[background-color,transform] duration-150 ease-out active:scale-[0.86] ${
              activeIndex === index ? "bg-white" : "bg-white/55 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function FleetAircraftComparisonSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f9f9ff] py-16 sm:py-20 lg:py-24">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(17,28,44,1) 1px, transparent 1px, transparent 72px), repeating-linear-gradient(to bottom, rgba(17,28,44,1) 1px, transparent 1px, transparent 72px)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-16">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#44474d]">Specifications</p>
          <h2 className={`${playfairDisplay.className} mt-3 text-4xl font-medium text-[#0d1c32] sm:text-5xl`}>
            Metrics
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#44474d] sm:text-lg">
            Compare aircraft range, speed, cabin comfort, and storage in a cleaner card format inspired by the latest
            fleet design.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#c5c6cd] bg-white shadow-[0_18px_50px_rgba(17,28,44,0.07)]">
          <div className="flex flex-col lg:flex-row">
            <div className="hidden w-64 shrink-0 flex-col border-r border-[#c5c6cd] bg-[#f9f9ff] lg:flex">
              <div className="h-[480px] border-b border-[#c5c6cd] p-6" />
              <div className="flex flex-col">
                {metricRows.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.label} className="flex h-24 items-center border-b border-[#c5c6cd]/70 px-6">
                      <div className="flex items-center gap-3 text-[#44474d]">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#d8e3fa]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium">{metric.label}</span>
                      </div>
                    </div>
                  );
                })}
                <div className="h-24 border-b border-[#c5c6cd]/70" />
              </div>
            </div>

            <div className="grid flex-1 gap-6 p-4 lg:grid-cols-3 lg:gap-0 lg:p-0">
              {aircraftColumns.map((aircraft, aircraftIndex) => (
                <article
                  key={aircraft.code}
                  className={`relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#c5c6cd] bg-white lg:rounded-none lg:border-y-0 lg:border-l-0 ${
                    aircraftIndex < aircraftColumns.length - 1 ? "lg:border-r" : "lg:border-r-0"
                  }`}
                >
                  <div className="flex h-auto flex-col border-b border-[#c5c6cd] p-5 lg:h-[480px] lg:p-6">
                    <AircraftMedia aircraft={aircraft} />

                    <h3 className={`${playfairDisplay.className} mt-6 text-2xl font-medium text-[#0d1c32]`}>
                      {aircraft.name}
                    </h3>

                    <button
                      type="button"
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#c5c6cd] px-4 py-3 text-sm font-semibold text-[#44474d] transition-[background-color,transform,color] duration-150 ease-out hover:bg-[#e7eeff] hover:text-[#0d1c32] active:scale-[0.98] lg:mt-auto"
                    >
                      <Download className="h-4 w-4" />
                      Download Brochure
                    </button>
                  </div>

                  <div className="flex flex-col">
                    {metricRows.map((metric) => {
                      const Icon = metric.icon;
                      const cell = metric.values[aircraftIndex];
                      const isBest = metric.bestIndex === aircraftIndex;

                      return (
                        <div
                          key={`${aircraft.code}-${metric.label}`}
                          className={`relative flex min-h-24 items-center justify-between gap-4 border-b border-[#c5c6cd]/70 px-5 py-4 transition-colors duration-150 ease-out hover:bg-[#e7eeff] lg:h-24 lg:flex-col lg:justify-center lg:gap-1 lg:px-4 lg:text-center ${
                            isBest ? "bg-[#f0f3ff]" : ""
                          }`}
                        >
                          {isBest && (
                            <Star className="absolute right-3 top-3 h-3.5 w-3.5 fill-[#775a19] text-[#775a19]" />
                          )}
                          <div className="flex items-center gap-2 text-left text-[#44474d] lg:hidden">
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d8e3fa]">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-[0.14em]">{metric.label}</span>
                          </div>
                          <div className="min-w-[7rem] text-right lg:min-w-0 lg:text-center">
                            <div className="text-xl font-semibold tracking-[-0.01em] text-[#0d1c32]">{cell.value}</div>
                            <div className="mt-0.5 text-sm text-[#44474d]">{cell.note}</div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex h-20 items-center justify-center border-b border-[#c5c6cd]/70 px-5 lg:h-24">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#775a19] transition-[color,transform] duration-150 ease-out hover:text-[#0d1c32] active:scale-[0.98]"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

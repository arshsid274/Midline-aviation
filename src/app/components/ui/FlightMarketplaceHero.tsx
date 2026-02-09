"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Plane, Users } from "lucide-react";
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("./WorldMap").then((mod) => ({ default: mod.WorldMap })), {
  ssr: false,
  loading: () => <div className="h-[230px] w-full animate-pulse rounded-2xl bg-zinc-900 sm:h-[320px] lg:h-[430px]" />,
});

export const JET_DATA = [
  {
    id: 1,
    jet: "Embraer Legacy 650",
    capacity: 14,
    fromICAO: "OMDB",
    toICAO: "KJFK",
    fromCity: "Dubai",
    toCity: "New York",
    price: "EUR 165,000",
    operator: "ExecuJet",
    lat1: 25.2532,
    lng1: 55.3657,
    lat2: 40.6413,
    lng2: -73.7781,
  },
  {
    id: 2,
    jet: "Gulfstream G450",
    capacity: 16,
    fromICAO: "OMDW",
    toICAO: "EGLL",
    fromCity: "Dubai",
    toCity: "London",
    price: "EUR 145,000",
    operator: "Jet Aviation",
    lat1: 24.8964,
    lng1: 55.1614,
    lat2: 51.47,
    lng2: -0.4543,
  },
  {
    id: 3,
    jet: "Gulfstream G200",
    capacity: 10,
    fromICAO: "OMSJ",
    toICAO: "VIDP",
    fromCity: "Sharjah",
    toCity: "New Delhi",
    price: "EUR 78,000",
    operator: "Abu Dhabi Aviation",
    lat1: 25.3286,
    lng1: 55.5172,
    lat2: 28.5562,
    lng2: 77.1,
  },
  {
    id: 4,
    jet: "Bombardier Global 6000",
    capacity: 13,
    fromICAO: "OMDB",
    toICAO: "LSZH",
    fromCity: "Dubai",
    toCity: "Zurich",
    price: "EUR 95,000",
    operator: "VistaJet",
    lat1: 25.2532,
    lng1: 55.3657,
    lat2: 47.4582,
    lng2: 8.5555,
  },
  {
    id: 5,
    jet: "Dassault Falcon 7X",
    capacity: 12,
    fromICAO: "OMDB",
    toICAO: "LFPG",
    fromCity: "Dubai",
    toCity: "Paris",
    price: "EUR 110,000",
    operator: "Falcon Ops",
    lat1: 25.2532,
    lng1: 55.3657,
    lat2: 49.0097,
    lng2: 2.5479,
  },
  {
    id: 6,
    jet: "Cessna Citation Latitude",
    capacity: 9,
    fromICAO: "OMDB",
    toICAO: "VABB",
    fromCity: "Dubai",
    toCity: "Mumbai",
    price: "EUR 45,000",
    operator: "Empire Aviation",
    lat1: 25.2532,
    lng1: 55.3657,
    lat2: 19.0896,
    lng2: 72.8656,
  },
  {
    id: 7,
    jet: "Airbus ACJ319",
    capacity: 19,
    fromICAO: "OMDB",
    toICAO: "WSSS",
    fromCity: "Dubai",
    toCity: "Singapore",
    price: "EUR 195,000",
    operator: "Global Jet",
    lat1: 25.2532,
    lng1: 55.3657,
    lat2: 1.3644,
    lng2: 103.9915,
  },
  {
    id: 8,
    jet: "Learjet 75",
    capacity: 8,
    fromICAO: "OMDB",
    toICAO: "HECA",
    fromCity: "Dubai",
    toCity: "Cairo",
    price: "EUR 38,000",
    operator: "EgyptAir",
    lat1: 25.2532,
    lng1: 55.3657,
    lat2: 30.1219,
    lng2: 31.4056,
  },
];

type JetDeal = (typeof JET_DATA)[number];

const FlightCard = React.memo(({ deal, isActive }: { deal: JetDeal; isActive: boolean }) => (
  <article className="min-w-0 flex-[0_0_100%] px-2 sm:flex-[0_0_62%] sm:px-2.5 md:flex-[0_0_45%] lg:flex-[0_0_33.333%] xl:flex-[0_0_26%] 2xl:flex-[0_0_22%]">
    <div
      className={`h-full rounded-2xl border p-2 transition-all duration-500 sm:p-2.5 ${
        isActive
          ? "border-[#41b3b5] bg-[#121a31] shadow-[0_12px_30px_rgba(65,179,181,0.26)] sm:scale-[1.02]"
          : "border-white/10 bg-[#0f1529] opacity-75"
      }`}
    >
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="flex h-20 items-center justify-center rounded-lg bg-zinc-800/40 text-[11px] text-zinc-500 sm:h-24">
          Exterior
        </div>
        <div className="flex h-20 items-center justify-center rounded-lg bg-zinc-800/40 text-[11px] text-zinc-500 sm:h-24">
          Interior
        </div>
      </div>

      <div className="rounded-xl bg-black/15 p-3.5 sm:p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="truncate text-sm font-semibold text-white sm:text-base">{deal.jet}</h3>
          <div className="flex items-center rounded-full border border-white/10 bg-zinc-900/70 px-2 py-0.5 text-[11px] text-zinc-200">
            <Users size={12} className="mr-1" />
            <span>{deal.capacity}</span>
          </div>
        </div>

        <div className="relative mb-5 flex items-center justify-between gap-3">
          <div className="z-10 bg-[#121a31] pr-1.5">
            <p className="font-mono text-xs font-semibold text-[#41b3b5]">{deal.fromICAO}</p>
            <p className="text-[11px] text-zinc-400">{deal.fromCity}</p>
          </div>
          <div className="absolute left-0 right-0 top-2 z-0 border-t border-dashed border-zinc-700" />
          <div className="z-10 rounded-full bg-[#121a31] px-1.5">
            <Plane size={14} className={`rotate-90 transition-colors ${isActive ? "text-[#41b3b5]" : "text-zinc-600"}`} />
          </div>
          <div className="z-10 bg-[#121a31] pl-1.5 text-right">
            <p className="font-mono text-xs font-semibold text-[#41b3b5]">{deal.toICAO}</p>
            <p className="text-[11px] text-zinc-400">{deal.toCity}</p>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-zinc-800 pt-3.5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">Operator</p>
            <p className="text-xs font-semibold text-zinc-200 sm:text-sm">{deal.operator}</p>
          </div>
          <span className="text-base font-semibold text-white sm:text-lg">{deal.price}</span>
        </div>
      </div>
    </div>
  </article>
));

FlightCard.displayName = "FlightCard";

export default function FlightMarketplaceHero() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: false,
      duration: 45,
    },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const activeDeal = JET_DATA[selectedIndex] ?? JET_DATA[0];
  const currentRoute = useMemo(
    () => [
      {
        start: { lat: activeDeal.lat1, lng: activeDeal.lng1 },
        end: { lat: activeDeal.lat2, lng: activeDeal.lng2 },
      },
    ],
    [activeDeal]
  );

  return (
    <section className="overflow-hidden bg-gradient-to-b from-[#111838] via-[#0f1630] to-[#0b1124] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <header className="mb-8 sm:mb-10 lg:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#41b3b5]/80">Live Marketplace</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            Premium routes designed for mobile-first booking experiences
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-blue-100/80 sm:text-base">
            Explore active private jet routes with responsive cards and smooth carousel transitions optimized for phone
            and tablet.
          </p>
        </header>

        <div className="mb-8 h-[230px] overflow-hidden rounded-2xl border border-[#3a78b6]/60 shadow-[0_12px_36px_rgba(1,8,20,0.45)] sm:mb-10 sm:h-[320px] md:h-[380px] lg:h-[460px]">
          <WorldMap key={`map-route-${selectedIndex}`} dots={currentRoute} />
        </div>

        <div className="relative pb-16 sm:pb-0">
          <div className="overflow-hidden px-1 sm:px-3" ref={emblaRef}>
            <div className="flex cursor-grab active:cursor-grabbing">
              {JET_DATA.map((deal, index) => (
                <FlightCard key={deal.id} deal={deal} isActive={index === selectedIndex} />
              ))}
            </div>
          </div>

          <button
            aria-label="Previous route"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#3a78b6] bg-white text-[#123a67] shadow-lg transition hover:scale-105 hover:bg-slate-100 sm:inline-flex lg:-left-3"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            aria-label="Next route"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#3a78b6] bg-white text-[#123a67] shadow-lg transition hover:scale-105 hover:bg-slate-100 sm:inline-flex lg:-right-3"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 sm:hidden">
            <button
              aria-label="Previous route"
              onClick={() => emblaApi?.scrollPrev()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#3a78b6] bg-white text-[#123a67] shadow"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              aria-label="Next route"
              onClick={() => emblaApi?.scrollNext()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#3a78b6] bg-white text-[#123a67] shadow"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

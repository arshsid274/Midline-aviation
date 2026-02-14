"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Plane, Users } from "lucide-react";
import gsap from "gsap";
import { WorldMap } from "./WorldMap";

export const JET_DATA = [
  {
    id: 1,
    jet: "Embraer Legacy 650",
    capacity: 14,
    fromICAO: "OMDB",
    toICAO: "KJFK",
    fromCity: "Dubai",
    toCity: "New York",
    price: "AED 610k",
    marketRange: "AED 500k - 770k",
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
    price: "AED 275k",
    marketRange: "AED 190k - 360k",
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
    price: "AED 130k",
    marketRange: "AED 95k - 170k",
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
    price: "AED 250k",
    marketRange: "AED 200k - 330k",
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
    price: "AED 265k",
    marketRange: "AED 210k - 350k",
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
    price: "AED 120k",
    marketRange: "AED 90k - 160k",
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
    price: "AED 320k",
    marketRange: "AED 240k - 410k",
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
    price: "AED 165k",
    marketRange: "AED 120k - 220k",
    operator: "EgyptAir",
    lat1: 25.2532,
    lng1: 55.3657,
    lat2: 30.1219,
    lng2: 31.4056,
  },
];

type JetDeal = (typeof JET_DATA)[number];

const FlightCard = React.memo(function FlightCard({
  deal,
  isActive,
}: {
  deal: JetDeal;
  isActive: boolean;
}) {
  const routeTrackRef = React.useRef<HTMLDivElement>(null);
  const planeRef = React.useRef<HTMLDivElement>(null);
  const planeTweenRef = React.useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = routeTrackRef.current;
    const plane = planeRef.current;
    if (!track || !plane) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stopAnimation = () => {
      planeTweenRef.current?.kill();
      planeTweenRef.current = null;
    };

    const centerPlane = () => {
      gsap.set(plane, {
        left: "50%",
        x: 0,
        xPercent: -50,
        yPercent: -50,
      });
    };

    const animatePlane = () => {
      stopAnimation();

      if (!isActive || prefersReducedMotion) {
        centerPlane();
        return;
      }

      const travelDistance = Math.max(track.clientWidth - plane.clientWidth, 0);
      if (travelDistance <= 0) {
        centerPlane();
        return;
      }

      gsap.set(plane, {
        left: 0,
        x: 0,
        xPercent: 0,
        yPercent: -50,
      });

      planeTweenRef.current = gsap.to(plane, {
        x: travelDistance,
        duration: 2.35,
        repeat: -1,
        ease: "none",
      });
    };

    animatePlane();
    if (isActive) {
      window.addEventListener("resize", animatePlane);
    }

    return () => {
      if (isActive) {
        window.removeEventListener("resize", animatePlane);
      }
      stopAnimation();
    };
  }, [isActive]);

  return (
    <article
      role="listitem"
      aria-label={`${deal.jet} from ${deal.fromCity} to ${deal.toCity}`}
      className="min-w-0 flex-[0_0_100%] px-2 py-4 sm:flex-[0_0_62%] sm:px-2.5 md:flex-[0_0_45%] lg:flex-[0_0_33.333%] xl:flex-[0_0_26%] 2xl:flex-[0_0_22%]"
    >
      <div
        className={`h-full rounded-2xl border p-2 transition-all duration-500 sm:p-2.5 ${
          isActive
            ? "border-[#41b3b5] bg-[#0d1451] shadow-[0_12px_30px_rgba(65,179,181,0.26)] sm:scale-[1.02]"
            : "border-white/15 bg-[#0d1451]/90 opacity-80"
        }`}
      >
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="flex h-20 items-center justify-center rounded-lg bg-[#0d1451]/70 text-[11px] text-blue-100/45 sm:h-24">
            Exterior
          </div>
          <div className="flex h-20 items-center justify-center rounded-lg bg-[#0d1451]/70 text-[11px] text-blue-100/45 sm:h-24">
            Interior
          </div>
        </div>

        <div className="rounded-xl bg-[#0d1451]/65 p-3.5 sm:p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="truncate text-sm font-semibold text-white sm:text-base">{deal.jet}</h3>
            <div className="flex items-center rounded-full border border-white/15 bg-[#0d1451]/80 px-2 py-0.5 text-[11px] text-blue-50">
              <Users size={12} className="mr-1" />
              <span>{deal.capacity}</span>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-2.5">
            <div className="min-w-0 bg-[#0d1451] pr-1.5">
              <p className="truncate whitespace-nowrap font-mono text-xs font-semibold text-[#41b3b5]">{deal.fromICAO}</p>
              <p className="truncate text-[11px] text-zinc-400">{deal.fromCity}</p>
            </div>

            <div ref={routeTrackRef} className="relative h-6 w-[84px] sm:w-[106px]">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-dashed border-[#3a78b6]/45" />
              <div
                ref={planeRef}
                className={`absolute top-1/2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0d1451] transition-colors duration-300 ${
                  isActive ? "text-[#41b3b5] drop-shadow-[0_0_8px_rgba(65,179,181,0.4)]" : "text-zinc-600"
                }`}
              >
                <Plane size={16} className="rotate-[48deg]" />
              </div>
            </div>

            <div className="min-w-0 bg-[#0d1451] pl-1.5 text-right">
              <p className="truncate whitespace-nowrap font-mono text-xs font-semibold text-[#41b3b5]">{deal.toICAO}</p>
              <p className="truncate text-[11px] text-zinc-400">{deal.toCity}</p>
            </div>
          </div>

          <div className="flex items-end justify-between gap-3 border-t border-[#1a2369] pt-3.5">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.16em] text-blue-100/55">Operator</p>
              <p className="truncate text-xs font-semibold text-zinc-200 sm:text-sm">{deal.operator}</p>
            </div>
            <span className="shrink-0 whitespace-nowrap text-base font-semibold text-white sm:text-lg">{deal.price}</span>
          </div>
        </div>
      </div>
    </article>
  );
});

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
    <section
      aria-labelledby="flight-marketplace-heading"
      className="overflow-hidden bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <header className="mb-8 sm:mb-10 lg:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0d1451]">Live Marketplace</p>
          <h2
            id="flight-marketplace-heading"
            className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-[#0d1451] sm:text-3xl md:text-4xl"
          >
            Midline Airlines designed for mobile-first booking experiences
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-[#0d1451] sm:text-base">
            Explore active private jet routes with responsive cards and smooth carousel transitions optimized for phone
            and tablet.
          </p>
          <p className="sr-only" aria-live="polite">
            Active marketplace route: {activeDeal.fromCity} ({activeDeal.fromICAO}) to {activeDeal.toCity} (
            {activeDeal.toICAO}) operated by {activeDeal.operator}.
          </p>
        </header>

        <figure className="mb-8 h-[230px] overflow-hidden rounded-2xl border border-[#3a78b6]/60 shadow-[0_12px_36px_rgba(1,8,20,0.45)] sm:mb-10 sm:h-[320px] md:h-[380px] lg:h-[460px]">
          <WorldMap dots={currentRoute} />
          <figcaption className="sr-only">
            Route map highlighting flights between {activeDeal.fromCity} and {activeDeal.toCity}.
          </figcaption>
        </figure>

        <div className="relative pb-16 sm:pb-0">
          <div className="relative mx-auto w-full">
            <div className="overflow-hidden" ref={emblaRef}>
              <div
                role="list"
                aria-label="Available private jet routes"
                className="flex cursor-grab active:cursor-grabbing"
              >
                {JET_DATA.map((deal, index) => (
                  <FlightCard key={deal.id} deal={deal} isActive={index === selectedIndex} />
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Previous route"
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#3a78b6] bg-white text-[#123a67] shadow-lg transition hover:scale-105 hover:bg-slate-100 sm:inline-flex"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next route"
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#3a78b6] bg-white text-[#123a67] shadow-lg transition hover:scale-105 hover:bg-slate-100 sm:inline-flex"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 sm:hidden">
            <button
              type="button"
              aria-label="Previous route"
              onClick={() => emblaApi?.scrollPrev()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#3a78b6] bg-white text-[#123a67] shadow"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next route"
              onClick={() => emblaApi?.scrollNext()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#3a78b6] bg-white text-[#123a67] shadow"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="sr-only">
          <h3>Private jet marketplace routes</h3>
          <ul>
            {JET_DATA.map((deal) => (
              <li key={`seo-route-${deal.id}`}>
                {deal.jet} from {deal.fromCity} ({deal.fromICAO}) to {deal.toCity} ({deal.toICAO}), operated by{" "}
                {deal.operator}, listed at {deal.price}.
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
}

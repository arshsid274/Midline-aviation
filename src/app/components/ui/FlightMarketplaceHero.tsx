"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Plane, Users } from "lucide-react";
import gsap from "gsap";
import { WorldMap } from "./WorldMap";

const JET_VISUALS = {
  "gulfstream-heavy": {
    exteriorSrc: "/assets/images/aircraft/g450-exterior.webp",
    exteriorAlt: "Gulfstream G450 T7-MID on the ramp",
    interiorSrc: "/assets/images/aircraft/g450-cabin-wide.webp",
    interiorAlt: "Gulfstream G450 luxury cabin interior",
  },
  "gulfstream-mid-size": {
    exteriorSrc: "/assets/images/aircraft/g200-exterior.webp",
    exteriorAlt: "Gulfstream G200 T7-MIDA on the tarmac",
    interiorSrc: "/assets/images/aircraft/g200-cabin.webp",
    interiorAlt: "Gulfstream G200 cabin interior",
  },
  "embraer-heavy": {
    exteriorSrc: "/assets/images/aircraft/legacy650-exterior.webp",
    exteriorAlt: "Embraer Legacy 650 T7-MIDB on the tarmac",
    interiorSrc: "/assets/images/aircraft/legacy650-cabin-wide.webp",
    interiorAlt: "Embraer Legacy 650 interior cabin",
  },
} as const;

type JetVisualKey = keyof typeof JET_VISUALS;

export const JET_DATA = [
  {
    id: 1,
    tail: "T7-MID",
    jet: "Gulfstream (Heavy)",
    model: "Gulfstream G450",
    visualKey: "gulfstream-heavy",
    capacity: 13,
    cruiseSpeed: "533 kts",
    rangeNm: 3900,
    baggage: "12-14 Bags",
    interior: "VIP/Bed",
    year: 2013,

    fromICAO: "OMDB",
    toICAO: "EGLL",
    fromCity: "Dubai",
    toCity: "London",
    distanceNm: 2950,
    duration: "6h 10m",

    price: "AED 320k",
    marketRange: "AED 290k - 380k",
    operator: "Private Fleet",
    lat1: 25.2532,
    lng1: 55.3657,
    lat2: 51.4700,
    lng2: -0.4543,
  },

  {
    id: 2,
    tail: "T7-MIDA",
    jet: "Gulfstream (Mid Size)",
    model: "Gulfstream G200",
    visualKey: "gulfstream-mid-size",
    capacity: 8,
    cruiseSpeed: "459 kts",
    rangeNm: 3100,
    baggage: "12-14 Bags",
    interior: "VIP",
    year: 2011,

    fromICAO: "OMDB",
    toICAO: "VIDP",
    fromCity: "Dubai",
    toCity: "Delhi",
    distanceNm: 1180,
    duration: "2h 40m",

    price: "AED 135k",
    marketRange: "AED 110k - 165k",
    operator: "Private Fleet",
    lat1: 25.2532,
    lng1: 55.3657,
    lat2: 28.5562,
    lng2: 77.1000,
  },

  {
    id: 3,
    tail: "T7-MIDB",
    jet: "Embraer (Heavy)",
    model: "Embraer Legacy 650",
    visualKey: "embraer-heavy",
    capacity: 13,
    cruiseSpeed: "460 kts",
    rangeNm: 3900,
    baggage: "Up to 20 Bags",
    interior: "VIP/Bed",
    year: 2015,

    fromICAO: "OMDB",
    toICAO: "LSZH",
    fromCity: "Dubai",
    toCity: "Zurich",
    distanceNm: 2550,
    duration: "5h 40m",

    price: "AED 285k",
    marketRange: "AED 250k - 340k",
    operator: "Private Fleet",
    lat1: 25.2532,
    lng1: 55.3657,
    lat2: 47.4581,
    lng2: 8.5555,
  },

  {
    id: 4,
    tail: "T7-MID",
    jet: "Gulfstream (Heavy)",
    model: "Gulfstream G450",
    visualKey: "gulfstream-heavy",
    capacity: 13,
    cruiseSpeed: "533 kts",
    rangeNm: 3900,
    baggage: "12-14 Bags",
    interior: "VIP/Bed",
    year: 2013,

    fromICAO: "OMDB",
    toICAO: "KJFK",
    fromCity: "Dubai",
    toCity: "New York",
    distanceNm: 5900,
    duration: "12h 10m",

    price: "AED 620k",
    marketRange: "AED 560k - 720k",
    operator: "Private Fleet",
    lat1: 25.2532,
    lng1: 55.3657,
    lat2: 40.6413,
    lng2: -73.7781,
  },

  {
    id: 5,
    tail: "T7-MIDA",
    jet: "Gulfstream (Mid Size)",
    model: "Gulfstream G200",
    visualKey: "gulfstream-mid-size",
    capacity: 8,
    cruiseSpeed: "459 kts",
    rangeNm: 3100,
    baggage: "12-14 Bags",
    interior: "VIP",
    year: 2011,

    fromICAO: "OMDB",
    toICAO: "LTFM",
    fromCity: "Dubai",
    toCity: "Istanbul",
    distanceNm: 1850,
    duration: "4h 25m",

    price: "AED 210k",
    marketRange: "AED 180k - 250k",
    operator: "Private Fleet",
    lat1: 25.2532,
    lng1: 55.3657,
    lat2: 41.2753,
    lng2: 28.7519,
  },

  {
    id: 6,
    tail: "T7-MIDB",
    jet: "Embraer (Heavy)",
    model: "Embraer Legacy 650",
    visualKey: "embraer-heavy",
    capacity: 13,
    cruiseSpeed: "460 kts",
    rangeNm: 3900,
    baggage: "Up to 20 Bags",
    interior: "VIP/Bed",
    year: 2015,

    fromICAO: "OMDB",
    toICAO: "WSSS",
    fromCity: "Dubai",
    toCity: "Singapore",
    distanceNm: 3150,
    duration: "7h 15m",

    price: "AED 355k",
    marketRange: "AED 310k - 420k",
    operator: "Private Fleet",
    lat1: 25.2532,
    lng1: 55.3657,
    lat2: 1.3644,
    lng2: 103.9915,
  },

  {
    id: 7,
    tail: "T7-MID",
    jet: "Gulfstream (Heavy)",
    model: "Gulfstream G450",
    visualKey: "gulfstream-heavy",
    capacity: 13,
    cruiseSpeed: "533 kts",
    rangeNm: 3900,
    baggage: "12-14 Bags",
    interior: "VIP/Bed",
    year: 2013,

    fromICAO: "OMAA",
    toICAO: "HECA",
    fromCity: "Abu Dhabi",
    toCity: "Cairo",
    distanceNm: 1300,
    duration: "2h 50m",

    price: "AED 160k",
    marketRange: "AED 135k - 190k",
    operator: "Private Fleet",
    lat1: 24.4330,
    lng1: 54.6511,
    lat2: 30.1219,
    lng2: 31.4056,
  },

  {
    id: 8,
    tail: "T7-MIDA",
    jet: "Gulfstream (Mid Size)",
    model: "Gulfstream G200",
    visualKey: "gulfstream-mid-size",
    capacity: 8,
    cruiseSpeed: "459 kts",
    rangeNm: 3100,
    baggage: "12-14 Bags",
    interior: "VIP",
    year: 2011,

    fromICAO: "OMDW",
    toICAO: "OOMS",
    fromCity: "Dubai",
    toCity: "Muscat",
    distanceNm: 190,
    duration: "50m",

    price: "AED 68k",
    marketRange: "AED 55k - 85k",
    operator: "Private Fleet",
    lat1: 24.8964,
    lng1: 55.1614,
    lat2: 23.5933,
    lng2: 58.2844,
  }
];


type JetDeal = (typeof JET_DATA)[number];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getJetVisuals = (visualKey: string) => {
  if (visualKey in JET_VISUALS) {
    return JET_VISUALS[visualKey as JetVisualKey];
  }
  return JET_VISUALS["gulfstream-heavy"];
};

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
  const visuals = getJetVisuals(deal.visualKey);

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
      className="min-w-0 flex-[0_0_100%] px-2 py-4 sm:flex-[0_0_74%] sm:px-2.5 md:flex-[0_0_62%] lg:flex-[0_0_74%] xl:flex-[0_0_58%] 2xl:flex-[0_0_52%]"
    >
      <div
        className={`h-full rounded-2xl border p-2 transition-all duration-500 sm:p-2.5 ${
          isActive
            ? "border-[#41b3b5] bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] shadow-[0_12px_30px_rgba(65,179,181,0.26)] sm:scale-[1.02]"
            : "border-white/15 bg-[linear-gradient(90deg,rgba(17,26,90,0.90)_0%,rgba(10,110,164,0.90)_100%)] opacity-80"
        }`}
      >
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="relative h-20 overflow-hidden rounded-lg sm:h-24">
            <Image
              src={visuals.exteriorSrc}
              alt={visuals.exteriorAlt}
              fill
              sizes="(max-width: 640px) 42vw, 220px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050b2a]/86 via-[#050b2a]/30 to-transparent" />
            <div className="absolute bottom-1.5 left-2 right-2 flex items-end justify-between">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-blue-100/90">Exterior</p>
              <span className="font-mono text-[9px] font-semibold tracking-widest text-[#41b3b5]/90">{deal.tail}</span>
            </div>
          </div>
          <div className="relative h-20 overflow-hidden rounded-lg sm:h-24">
            <Image
              src={visuals.interiorSrc}
              alt={visuals.interiorAlt}
              fill
              sizes="(max-width: 640px) 42vw, 220px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050b2a]/86 via-[#050b2a]/30 to-transparent" />
            <p className="absolute bottom-1.5 left-2 text-[10px] font-medium uppercase tracking-[0.12em] text-blue-100/90">
              Interior
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[linear-gradient(90deg,rgba(17,26,90,0.65)_0%,rgba(10,110,164,0.65)_100%)] p-3.5 sm:p-4">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white sm:text-base">{deal.model}</h3>
              <p className="truncate text-[11px] text-white/60">{deal.jet}</p>
              <p className="mt-0.5 font-mono text-[10px] font-semibold tracking-widest text-white/50">{deal.tail}</p>
            </div>
            <div className="flex shrink-0 items-center rounded-full border border-white/15 bg-[linear-gradient(90deg,rgba(17,26,90,0.80)_0%,rgba(10,110,164,0.80)_100%)] px-2 py-0.5 text-[11px] text-blue-50">
              <Users size={12} className="mr-1" />
              <span>{deal.capacity}</span>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-2.5">
            <div className="min-w-0 pr-1.5">
              <p className="truncate whitespace-nowrap font-mono text-xs font-semibold text-[#41b3b5]">{deal.fromICAO}</p>
              <p className="truncate text-[11px] text-zinc-400">{deal.fromCity}</p>
            </div>

            <div ref={routeTrackRef} className="relative h-6 w-[84px] sm:w-[106px]">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-dashed border-[#3a78b6]/45" />
              <div
                ref={planeRef}
                className={`absolute top-1/2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] transition-colors duration-300 ${
                  isActive ? "text-[#41b3b5] drop-shadow-[0_0_8px_rgba(65,179,181,0.4)]" : "text-zinc-600"
                }`}
              >
                <Plane size={16} className="rotate-[48deg]" />
              </div>
            </div>

            <div className="min-w-0 pl-1.5 text-right">
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

  const mapFocus = useMemo(() => {
    const latDelta = Math.abs(activeDeal.lat1 - activeDeal.lat2);
    const lngDelta = Math.abs(activeDeal.lng1 - activeDeal.lng2);
    const routeSpan = Math.max(latDelta, lngDelta);

    const destinationBiasedLat = activeDeal.lat1 * 0.3 + activeDeal.lat2 * 0.7;
    const destinationBiasedLng = activeDeal.lng1 * 0.3 + activeDeal.lng2 * 0.7;
    const zoom = clamp(2.2 - routeSpan / 24, 1.25, 2.15);

    return {
      lat: destinationBiasedLat,
      lng: destinationBiasedLng,
      zoom,
    };
  }, [activeDeal]);

  return (
    <section
      aria-labelledby="flight-marketplace-heading"
      className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[43%] bg-white lg:block" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[43%] hidden w-28 bg-gradient-to-r from-transparent to-white lg:block"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <header className="mb-8 sm:mb-10 lg:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0c134d]/72">Live Marketplace</p>
          <h2
            id="flight-marketplace-heading"
            className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-[#0c134d] sm:text-3xl md:text-4xl"
          >
            Regional private jet routes, split view booking and map intelligence
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-[#0c134d]/82 sm:text-base">
            View active route deals in the carousel and follow each selected route on the interactive map,
            optimized for short-to-mid-range regional flights.
          </p>
          <p className="sr-only" aria-live="polite">
            Active marketplace route: {activeDeal.fromCity} ({activeDeal.fromICAO}) to {activeDeal.toCity} (
            {activeDeal.toICAO}) operated by {activeDeal.operator}.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-stretch lg:gap-7">
          <div className="relative order-2 rounded-2xl border border-white/12 bg-[#070f35]/82 p-3 shadow-[0_18px_46px_rgba(0,6,26,0.45)] sm:p-4 lg:order-1">
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#7ec8ff]/82">Available Flights</p>
              <p className="mt-1 text-xs text-blue-100/70 sm:text-sm">
                Browse live route cards and the map updates to match your selection.
              </p>
            </div>

            <div className="relative pb-16 sm:pb-0">
              <div className="relative mx-auto w-full">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#070f35] to-transparent sm:w-16"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#070f35] to-transparent sm:w-16"
                />
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
                  className="absolute left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[linear-gradient(90deg,rgba(17,26,90,0.95)_0%,rgba(10,110,164,0.95)_100%)] text-white shadow-lg transition hover:scale-105 hover:bg-[#1a276c] sm:inline-flex"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  aria-label="Next route"
                  onClick={() => emblaApi?.scrollNext()}
                  className="absolute right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[linear-gradient(90deg,rgba(17,26,90,0.95)_0%,rgba(10,110,164,0.95)_100%)] text-white shadow-lg transition hover:scale-105 hover:bg-[#1a276c] sm:inline-flex"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 sm:hidden">
                <button
                  type="button"
                  aria-label="Previous route"
                  onClick={() => emblaApi?.scrollPrev()}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-[linear-gradient(90deg,rgba(17,26,90,0.90)_0%,rgba(10,110,164,0.90)_100%)] text-white shadow"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next route"
                  onClick={() => emblaApi?.scrollNext()}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-[linear-gradient(90deg,rgba(17,26,90,0.90)_0%,rgba(10,110,164,0.90)_100%)] text-white shadow"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <aside className="relative sticky top-20 z-30 order-1 flex min-h-[300px] flex-col self-start overflow-hidden md:top-24 rounded-2xl border border-[#3a78b6]/45 bg-[linear-gradient(90deg,rgba(17,26,90,0.86)_0%,rgba(10,110,164,0.86)_100%)] p-4 shadow-[0_20px_50px_rgba(0,8,28,0.55)] sm:min-h-[360px] sm:p-5 lg:relative lg:top-auto lg:z-auto lg:order-2 lg:self-auto">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#070f35]/88 to-transparent"
            />
            <p className="relative text-[11px] font-medium uppercase tracking-[0.18em] text-[#7ec8ff]/82">
              Interactive Map
            </p>
            <h3 className="relative mt-2 text-lg font-semibold text-white sm:text-xl">
              {activeDeal.fromCity} to {activeDeal.toCity}
            </h3>
            <p className="relative mt-1 text-xs text-blue-100/72 sm:text-sm">
              {activeDeal.fromICAO} to {activeDeal.toICAO} - {activeDeal.operator}
            </p>

            <div className="relative mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg border border-[#3a78b6]/35 bg-[#070f35]/55 p-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-blue-100/58">Listed Price</p>
                <p className="mt-1 text-sm font-semibold text-white">{activeDeal.price}</p>
              </div>
              <div className="rounded-lg border border-[#3a78b6]/35 bg-[#070f35]/55 p-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-blue-100/58">Market Band</p>
                <p className="mt-1 text-sm font-semibold text-white">{activeDeal.marketRange}</p>
              </div>
            </div>

            <figure className="relative mt-3 h-56 overflow-hidden rounded-xl border border-[#3a78b6]/35 shadow-inner sm:mt-4 sm:h-64 lg:h-auto lg:flex-1">
              <WorldMap dots={currentRoute} lineColor="#41b3b5" focus={mapFocus} />
              <figcaption className="sr-only">
                Route map highlighting flights between {activeDeal.fromCity} and {activeDeal.toCity}.
              </figcaption>
            </figure>
          </aside>
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

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Cpu, Plane, ShieldCheck, Star } from "lucide-react";
import { motion } from "motion/react";
import gsap from "gsap";
import { JET_DATA } from "@/app/components/ui/FlightMarketplaceHero";
import { Globe } from "@/components/ui/globe";

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
    label: "On-Demand Charter",
    title: "Best in class On-Demand",
    description:
      "View instant pricing for any route in the world. Request bespoke charter offers or book a guaranteed rate for priority departures.",
    ctaHref: "/services/aircraft-charter",
    ctaLabel: "Learn More",
  },
  {
    id: "membership",
    label: "Membership",
    title: "Frequent flyers welcome",
    description:
      "Enjoy the freedom and flexibility of on-demand charter with loyalty benefits, concierge support, and member-first access.",
    ctaHref: "/services/aircraft-management",
    ctaLabel: "Learn More",
  },
  {
    id: "ownership",
    label: "Whole Ownership",
    title: "Ownership built for confidence",
    description:
      "From acquisition to operations, Midline handles fleet strategy, compliance, and maintenance with transparent reporting.",
    ctaHref: "/services/aircraft-sales",
    ctaLabel: "Explore Ownership",
  },
  {
    id: "technology",
    label: "Technology Services",
    title: "Technology that keeps you ahead",
    description:
      "Data-led operations, predictive maintenance insights, and real-time mission support for more efficient aviation decisions.",
    ctaHref: "/services/mro",
    ctaLabel: "View Services",
  },
];

type OnDemandProfile = {
  bars: [number, number, number];
  dotsY: [number, number, number];
  midLineHeight: number;
};

const CHART_START_X = 16;
const CHART_END_X = 506;
const BAR_CENTER_X = {
  left: 83,
  middle: 260,
  right: 429,
} as const;

type DotPoint = { cx: number; cy: number };

const buildDotPoints = (profile: OnDemandProfile): [DotPoint, DotPoint, DotPoint] => [
  { cx: BAR_CENTER_X.left, cy: profile.dotsY[0] },
  { cx: BAR_CENTER_X.middle, cy: profile.dotsY[1] },
  { cx: BAR_CENTER_X.right, cy: profile.dotsY[2] },
];

const buildCurvePath = (dots: [DotPoint, DotPoint, DotPoint]) => {
  const points = [
    { x: CHART_START_X, y: dots[0].cy + 2 },
    { x: dots[0].cx, y: dots[0].cy },
    { x: dots[1].cx, y: dots[1].cy },
    { x: dots[2].cx, y: dots[2].cy },
    { x: CHART_END_X, y: dots[2].cy + 2 },
  ];

  let d = `M ${points[0].x} ${points[0].y}`;
  const tension = 1;

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = i === 0 ? points[0] : points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i + 2 < points.length ? points[i + 2] : points[points.length - 1];

    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${p2.x} ${p2.y}`;
  }

  return d;
};

const onDemandProfiles: OnDemandProfile[] = [
  {
    bars: [44, 86, 48],
    dotsY: [104, 22, 101],
    midLineHeight: 82,
  },
  {
    bars: [52, 78, 53],
    dotsY: [96, 36, 94],
    midLineHeight: 76,
  },
  {
    bars: [47, 39, 49],
    dotsY: [60, 92, 60],
    midLineHeight: 42,
  },
  {
    bars: [46, 83, 47],
    dotsY: [104, 24, 102],
    midLineHeight: 80,
  },
];

const ICAO_TO_IATA: Record<string, string> = {
  OMDB: "DXB",
  OMDW: "DWC",
  OMSJ: "SHJ",
  KJFK: "JFK",
  EGLL: "LHR",
  VIDP: "DEL",
  LSZH: "ZRH",
  LFPG: "CDG",
  VABB: "BOM",
  WSSS: "SIN",
  HECA: "CAI",
};

const onDemandRoutes = JET_DATA.map((deal, index) => ({
  id: deal.id,
  priceRange: deal.marketRange ?? deal.price,
  fromCode: ICAO_TO_IATA[deal.fromICAO] ?? deal.fromICAO,
  toCode: ICAO_TO_IATA[deal.toICAO] ?? deal.toICAO,
  fromCity: deal.fromCity,
  toCity: deal.toCity,
  profile: onDemandProfiles[index % onDemandProfiles.length],
}));

type MembershipDestination = {
  id: string;
  code: string;
  city: string;
  lat: number;
  lng: number;
};

type MembershipPoint = {
  x: number;
  y: number;
};

type MembershipRouteVisual = {
  id: string;
  code: string;
  city: string;
  path: string;
  destinationPoint: MembershipPoint;
  labelPoint: MembershipPoint;
  dashOffset: number;
};

const DUBAI_HUB = {
  code: "DXB",
  city: "Dubai",
  lat: 25.2532,
  lng: 55.3657,
};

const MEMBERSHIP_VIEWBOX = 340;
const MEMBERSHIP_CENTER = MEMBERSHIP_VIEWBOX / 2;
const MEMBERSHIP_RADIUS = MEMBERSHIP_VIEWBOX * 0.4;
const MEMBERSHIP_CAMERA = {
  lat: DUBAI_HUB.lat,
  lng: DUBAI_HUB.lng,
};
const MEMBERSHIP_ROUTE_FLOW = {
  outbound: 3,
  inbound: 2,
} as const;
const MEMBERSHIP_GLOBE_THETA = (MEMBERSHIP_CAMERA.lat * Math.PI) / 180;
const MEMBERSHIP_GLOBE_PHI = -((MEMBERSHIP_CAMERA.lng + 90) * Math.PI) / 180;

const projectMembershipPoint = (lat: number, lng: number): MembershipPoint | null => {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const centerLatRad = (MEMBERSHIP_CAMERA.lat * Math.PI) / 180;
  const centerLngRad = (MEMBERSHIP_CAMERA.lng * Math.PI) / 180;

  const visibility =
    Math.sin(centerLatRad) * Math.sin(latRad) +
    Math.cos(centerLatRad) * Math.cos(latRad) * Math.cos(lngRad - centerLngRad);

  if (visibility <= 0) return null;

  const x =
    MEMBERSHIP_CENTER + MEMBERSHIP_RADIUS * Math.cos(latRad) * Math.sin(lngRad - centerLngRad);
  const y =
    MEMBERSHIP_CENTER -
    MEMBERSHIP_RADIUS *
      (Math.cos(centerLatRad) * Math.sin(latRad) -
        Math.sin(centerLatRad) * Math.cos(latRad) * Math.cos(lngRad - centerLngRad));

  return { x, y };
};

const buildMembershipArc = (start: MembershipPoint, end: MembershipPoint) => {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  const liftVectorX = midX - MEMBERSHIP_CENTER;
  const liftVectorY = midY - MEMBERSHIP_CENTER;
  const liftVectorLength = Math.hypot(liftVectorX, liftVectorY) || 1;
  const routeDistance = Math.hypot(end.x - start.x, end.y - start.y);
  const liftDistance = Math.min(34, 14 + routeDistance * 0.18);

  const controlX = midX + (liftVectorX / liftVectorLength) * liftDistance;
  const controlY = midY + (liftVectorY / liftVectorLength) * liftDistance;

  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} Q ${controlX.toFixed(2)} ${controlY.toFixed(2)} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
};

function OnDemandVisual() {
  const [routeIndex, setRouteIndex] = useState(0);

  const routeIndexRef = useRef(0);
  const leftBarRef = useRef<HTMLDivElement>(null);
  const centerBarRef = useRef<HTMLDivElement>(null);
  const rightBarRef = useRef<HTMLDivElement>(null);
  const curvePathRef = useRef<SVGPathElement>(null);
  const midLineRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLParagraphElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const pulseTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const switchTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const activeRoute = onDemandRoutes[routeIndex];
  const activeDots = buildDotPoints(activeRoute.profile);
  const activeCurvePath = buildCurvePath(activeDots);

  useEffect(() => {
    const applyProfile = (profile: OnDemandProfile, immediate = false) => {
      const duration = immediate ? 0 : 0.95;
      const ease = "power2.inOut";
      const nextDots = buildDotPoints(profile);
      const nextPath = buildCurvePath(nextDots);

      if (leftBarRef.current) {
        gsap.to(leftBarRef.current, { height: `${profile.bars[0]}%`, duration, ease });
      }

      if (centerBarRef.current) {
        gsap.to(centerBarRef.current, { height: `${profile.bars[1]}%`, duration, ease });
      }

      if (rightBarRef.current) {
        gsap.to(rightBarRef.current, { height: `${profile.bars[2]}%`, duration, ease });
      }

      if (midLineRef.current) {
        gsap.to(midLineRef.current, { height: `${profile.midLineHeight}%`, duration, ease });
      }

      if (curvePathRef.current) {
        gsap.to(curvePathRef.current, {
          attr: { d: nextPath },
          duration,
          ease,
        });
      }

      nextDots.forEach((dot, idx) => {
        const dotNode = dotRefs.current[idx];
        if (!dotNode) return;
        gsap.to(dotNode, {
          attr: { cx: dot.cx, cy: dot.cy },
          duration,
          ease,
        });
      });
    };

    const runPulseAnimation = () => {
      pulseTimelineRef.current?.kill();
      pulseTimelineRef.current = gsap
        .timeline({ repeat: -1, yoyo: true })
        .to([leftBarRef.current, rightBarRef.current], {
          opacity: 0.84,
          duration: 1.15,
          ease: "sine.inOut",
        })
        .to(
          centerBarRef.current,
          {
            opacity: 1,
            duration: 1.15,
            ease: "sine.inOut",
          },
          0
        )
        .to(
          [dotRefs.current[0], dotRefs.current[2]],
          {
            scale: 1.12,
            transformOrigin: "center center",
            duration: 1.15,
            ease: "sine.inOut",
          },
          0
        )
        .to(
          dotRefs.current[1],
          {
            scale: 1.15,
            transformOrigin: "center center",
            duration: 1.15,
            ease: "sine.inOut",
          },
          0.1
        );
    };

    const switchToRoute = (nextIndex: number) => {
      const nextRoute = onDemandRoutes[nextIndex];

      switchTimelineRef.current?.kill();
      switchTimelineRef.current = gsap
        .timeline()
        .to([priceRef.current, ticketRef.current], {
          autoAlpha: 0,
          y: -8,
          duration: 0.22,
          ease: "power1.in",
        })
        .add(() => {
          routeIndexRef.current = nextIndex;
          setRouteIndex(nextIndex);
        })
        .to([priceRef.current, ticketRef.current], {
          autoAlpha: 1,
          y: 0,
          duration: 0.34,
          ease: "power2.out",
        });

      applyProfile(nextRoute.profile);
    };

    routeIndexRef.current = 0;
    applyProfile(onDemandRoutes[0].profile, true);
    runPulseAnimation();

    const cycleTimer = window.setInterval(() => {
      const next = (routeIndexRef.current + 1) % onDemandRoutes.length;
      switchToRoute(next);
    }, 2700);

    return () => {
      window.clearInterval(cycleTimer);
      pulseTimelineRef.current?.kill();
      switchTimelineRef.current?.kill();
    };
  }, []);

  return (
    <div className="relative mx-auto h-[328px] w-full max-w-[610px] sm:h-[340px] lg:h-[360px]">
      <div className="absolute left-0 right-0 top-0">
        <div className="relative mx-auto h-[148px] max-w-[470px] overflow-hidden rounded-xl border border-white/20 bg-white/6">
          <div ref={leftBarRef} className="absolute bottom-0 left-[2%] h-[44%] w-[28%] bg-white/16" />
          <div ref={centerBarRef} className="absolute bottom-0 left-[35%] h-[86%] w-[30%] bg-[#2c46ff]" />
          <div ref={rightBarRef} className="absolute bottom-0 right-[2%] h-[48%] w-[31%] bg-white/16" />

          <svg viewBox="0 0 520 130" className="absolute inset-0 h-full w-full">
            <path
              ref={curvePathRef}
              d={activeCurvePath}
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2.1"
            />
            <circle
              ref={(node) => {
                dotRefs.current[0] = node;
              }}
              className="charter-curve-dot"
              cx={activeDots[0].cx}
              cy={activeDots[0].cy}
              r="5"
              fill="rgba(255,255,255,0.92)"
            />
            <circle
              ref={(node) => {
                dotRefs.current[1] = node;
              }}
              className="charter-curve-dot"
              cx={activeDots[1].cx}
              cy={activeDots[1].cy}
              r="5.5"
              fill="rgba(255,255,255,0.92)"
            />
            <circle
              ref={(node) => {
                dotRefs.current[2] = node;
              }}
              className="charter-curve-dot"
              cx={activeDots[2].cx}
              cy={activeDots[2].cy}
              r="5"
              fill="rgba(255,255,255,0.92)"
            />
          </svg>

          <p ref={priceRef} className="absolute left-1/2 top-3 -translate-x-1/2 text-xs font-semibold tracking-wide text-white/90">
            {activeRoute.priceRange}
          </p>
          <div
            ref={midLineRef}
            className="absolute bottom-0 left-1/2 h-[82%] w-px -translate-x-1/2 bg-white/50"
          />
        </div>
      </div>

      <div
        ref={ticketRef}
        className="absolute bottom-0 left-0 right-0 mx-auto w-[min(100%,470px)] overflow-hidden rounded-xl border border-white/30 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
      >
        <div className="px-4 py-4 sm:px-8 sm:py-5">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-[#19214d] sm:text-3xl">{activeRoute.fromCode}</p>
              <p className="text-xs text-[#3f4b82]/80 sm:text-sm">{activeRoute.fromCity}</p>
            </div>

            <div className="relative mx-2 w-[88px] sm:mx-7 sm:w-[170px]">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-[#4b5ca8]/45" />
              <div className="relative mx-auto h-7 w-7 rounded-full bg-[#1f45ff] text-white">
                <Plane size={14} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-semibold tracking-tight text-[#19214d] sm:text-3xl">{activeRoute.toCode}</p>
              <p className="text-xs text-[#3f4b82]/80 sm:text-sm">{activeRoute.toCity}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 border-t border-[#2f4388]/20 bg-[#edf1ff] px-4 py-3 text-xs text-[#2d3d7b]/90 sm:grid-cols-3 sm:gap-0 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#1f45ff]" />
            Departure: {activeRoute.fromCode}
          </div>
          <div className="flex items-center gap-2 sm:justify-center">
            <div className="h-2 w-2 rounded-full bg-[#5c74ff]" />
            Return: {activeRoute.toCode}
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <div className="h-2 w-2 rounded-full bg-[#a4b2ff]" />
            Market: Dubai
          </div>
        </div>
      </div>
    </div>
  );
}

function MembershipVisual() {
  const membershipDestinations = useMemo<MembershipDestination[]>(() => {
    const uniqueDestinations = new Map<string, MembershipDestination>();

    JET_DATA.forEach((deal) => {
      if (uniqueDestinations.has(deal.toICAO)) return;

      uniqueDestinations.set(deal.toICAO, {
        id: deal.toICAO,
        code: ICAO_TO_IATA[deal.toICAO] ?? deal.toICAO,
        city: deal.toCity,
        lat: deal.lat2,
        lng: deal.lng2,
      });
    });

    return Array.from(uniqueDestinations.values());
  }, []);

  const globeConfig = useMemo(
    () => ({
      width: 820,
      height: 820,
      phi: MEMBERSHIP_GLOBE_PHI,
      theta: MEMBERSHIP_GLOBE_THETA,
      dark: 0.15,
      diffuse: 1.05,
      mapSamples: 20000,
      mapBrightness: 3.1,
      baseColor: [0.74, 0.83, 1] as [number, number, number],
      markerColor: [1, 1, 1] as [number, number, number],
      glowColor: [0.9, 0.94, 1] as [number, number, number],
      markers: [
        { location: [DUBAI_HUB.lat, DUBAI_HUB.lng] as [number, number], size: 0.12 },
        ...membershipDestinations.map((destination) => ({
          location: [destination.lat, destination.lng] as [number, number],
          size: 0.045,
        })),
      ],
    }),
    [membershipDestinations]
  );

  const hubPoint = useMemo(() => projectMembershipPoint(DUBAI_HUB.lat, DUBAI_HUB.lng), []);

  const membershipRoutes = useMemo<MembershipRouteVisual[]>(() => {
    if (!hubPoint) return [];

    return membershipDestinations.flatMap((destination, index) => {
      const destinationPoint = projectMembershipPoint(destination.lat, destination.lng);
      if (!destinationPoint) return [];

      const cycleSize = MEMBERSHIP_ROUTE_FLOW.outbound + MEMBERSHIP_ROUTE_FLOW.inbound;
      const shouldEndInDubai = index % cycleSize >= MEMBERSHIP_ROUTE_FLOW.outbound;
      const startPoint = shouldEndInDubai ? destinationPoint : hubPoint;
      const endPoint = shouldEndInDubai ? hubPoint : destinationPoint;

      const vectorX = destinationPoint.x - MEMBERSHIP_CENTER;
      const vectorY = destinationPoint.y - MEMBERSHIP_CENTER;
      const vectorLength = Math.hypot(vectorX, vectorY) || 1;
      const labelOffset = 17;

      return [
        {
          id: destination.id,
          code: destination.code,
          city: destination.city,
          destinationPoint,
          labelPoint: {
            x: destinationPoint.x + (vectorX / vectorLength) * labelOffset,
            y: destinationPoint.y + (vectorY / vectorLength) * labelOffset,
          },
          path: buildMembershipArc(startPoint, endPoint),
          dashOffset: shouldEndInDubai ? 250 : -250,
        },
      ];
    });
  }, [hubPoint, membershipDestinations]);

  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[640px] lg:h-[380px]">
      <div className="pointer-events-none absolute inset-0 rounded-[30px] border border-white/15 bg-[radial-gradient(circle_at_70%_28%,rgba(204,221,255,0.24),rgba(104,131,243,0.28)_46%,rgba(18,28,96,0.16)_100%)]" />

      <div className="relative mx-auto aspect-square w-full max-w-[420px]">
        <div className="pointer-events-none absolute inset-[9%] rounded-full border border-[#dfe9ff]/90 shadow-[0_0_40px_rgba(214,227,255,0.85),inset_0_0_30px_rgba(168,193,255,0.45)]" />
        <Globe
          className="max-w-none opacity-100"
          config={globeConfig}
          autoRotate={false}
          rotationSpeed={0}
          interactive={false}
          ariaLabel="Membership routes from Dubai to key destinations"
        />

        <svg
          viewBox={`0 0 ${MEMBERSHIP_VIEWBOX} ${MEMBERSHIP_VIEWBOX}`}
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {membershipRoutes.map((route, index) => (
            <g key={route.id}>
              <motion.path
                d={route.path}
                fill="none"
                stroke="rgba(58,120,182,0.55)"
                strokeWidth="4.4"
                strokeLinecap="round"
                className="blur-[2px]"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 0.7, 0] }}
                transition={{
                  duration: 2.6,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 0.6,
                  delay: index * 0.16,
                }}
              />

              <motion.path
                d={route.path}
                fill="none"
                stroke="rgba(129,198,255,0.92)"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0.5] }}
                transition={{
                  duration: 2.2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 0.6,
                  delay: index * 0.16,
                }}
              />

              <motion.path
                d={route.path}
                fill="none"
                stroke="rgba(79,175,255,0.98)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="18 220"
                initial={{ strokeDashoffset: 0, opacity: 0.28 }}
                animate={{ strokeDashoffset: route.dashOffset, opacity: [0.28, 1, 0.28] }}
                transition={{
                  duration: 1.8,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.16,
                }}
              />

              <motion.circle
                cx={route.destinationPoint.x}
                cy={route.destinationPoint.y}
                r="2.5"
                fill="rgba(149,211,255,0.96)"
                initial={{ scale: 0 }}
                animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.75, 1, 0.75] }}
                transition={{
                  duration: 2.2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.16,
                }}
              />
            </g>
          ))}
          {hubPoint && (
            <motion.circle
              cx={hubPoint.x}
              cy={hubPoint.y}
              r="3.2"
              fill="#ffffff"
              initial={{ scale: 0.9, opacity: 0.9 }}
              animate={{ scale: [0.95, 1.5, 0.95], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          )}
        </svg>

        {membershipRoutes.map((route) => (
          <div
            key={`${route.id}-label`}
            className="absolute rounded-[2px] border border-white/25 bg-white px-2 py-0.5 text-[10px] font-semibold text-[#192663] shadow-[0_6px_16px_rgba(0,0,0,0.25)]"
            title={route.city}
            style={{
              left: `${(route.labelPoint.x / MEMBERSHIP_VIEWBOX) * 100}%`,
              top: `${(route.labelPoint.y / MEMBERSHIP_VIEWBOX) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {route.code}
          </div>
        ))}

        {hubPoint && (
          <div
            className="absolute rounded-[2px] border border-white/80 bg-white px-2 py-0.5 text-[10px] font-semibold text-[#17308f] shadow-[0_8px_18px_rgba(220,232,255,0.45)]"
            style={{
              left: `${(hubPoint.x / MEMBERSHIP_VIEWBOX) * 100}%`,
              top: `${(hubPoint.y / MEMBERSHIP_VIEWBOX) * 100}%`,
              transform: "translate(-50%, -130%)",
            }}
          >
            {DUBAI_HUB.code}
          </div>
        )}
      </div>
    </div>
  );
}

function OwnershipVisual() {
  return (
    <div className="relative mx-auto h-[350px] w-full max-w-[620px] rounded-3xl border border-white/15 bg-gradient-to-br from-white/8 via-white/5 to-transparent p-5 sm:p-8">
      <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4">
        <div className="rounded-2xl border border-white/20 bg-white/7 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">Acquisition</p>
          <p className="mt-2 text-lg font-semibold text-white">Market Fit</p>
        </div>
        <div className="rounded-2xl border border-[#3e5bff]/70 bg-[#2239bd]/70 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-white/70">Operations</p>
          <p className="mt-2 text-lg font-semibold text-white">24/7 Control</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/7 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">Compliance</p>
          <p className="mt-2 text-lg font-semibold text-white">Audit Ready</p>
        </div>
      </div>

      <div className="grid grid-cols-1 items-center gap-3 text-sm text-white/80 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <div className="rounded-xl border border-white/15 bg-white/5 p-4">Structuring</div>
        <div className="hidden h-px bg-white/35 sm:block" />
        <div className="rounded-xl border border-white/15 bg-white/5 p-4">Crew & Dispatch</div>
        <div className="hidden h-px bg-white/35 sm:block" />
        <div className="rounded-xl border border-white/15 bg-white/5 p-4">Value Retention</div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/15 bg-[#e8eeff] px-4 py-3 text-[#1d2a65] sm:mt-8 sm:px-5 sm:py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#3b4f9c]">Managed Efficiency</p>
          <p className="text-lg font-semibold sm:text-xl">32% lower operational overhead</p>
        </div>
        <ShieldCheck size={24} className="text-[#2c46ff]" />
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
  const [activeTab, setActiveTab] = useState<ServiceTab["id"]>("membership");

  const activeConfig = useMemo(
    () => serviceTabs.find((tab) => tab.id === activeTab) ?? serviceTabs[0],
    [activeTab]
  );

  const activeVisual = useMemo(() => {
    if (activeTab === "charter") return <OnDemandVisual />;
    if (activeTab === "membership") return <MembershipVisual />;
    if (activeTab === "ownership") return <OwnershipVisual />;
    return <TechnologyVisual />;
  }, [activeTab]);

  return (
    <section
      aria-labelledby="services-mission-heading"
      className="relative overflow-hidden bg-[#0d1451] py-14 sm:py-16 lg:py-20"
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">Services</p>
            <h2
              id="services-mission-heading"
              className="mt-3 max-w-[14ch] text-balance text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl"
            >
              The Perfect Plane for Every Mission
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-blue-100/85 sm:text-base">
            Midline Airlines offers a complete set of private aviation solutions for modern travelers, operators, and
            aircraft owners.
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

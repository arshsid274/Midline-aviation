"use client";

import { memo, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import DottedMap from "dotted-map";
import Image from "next/image";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
  }>;
  lineColor?: string;
  focus?: {
    lat: number;
    lng: number;
    zoom?: number;
  };
}

const mapInstance = new DottedMap({ height: 100, grid: "diagonal" });
const staticMapData = `data:image/svg+xml;utf8,${encodeURIComponent(
  mapInstance.getSVG({
    radius: 0.22,
    color: "#01699a",
    shape: "circle",
    backgroundColor: "#111a5a",
  })
)}`;

const toCoords = (lat: number, lng: number) => ({
  x: (lng + 180) * (800 / 360),
  y: (90 - lat) * (400 / 180),
});

const getArcPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dr = Math.sqrt(dx * dx + dy * dy);
  return `M ${start.x} ${start.y} A ${dr} ${dr} 0 0 1 ${end.x} ${end.y}`;
};

export const WorldMap = memo(({ dots = [], lineColor = "#3a78b6", focus }: MapProps) => {
  const mapSummary = useMemo(
    () =>
      dots.length
        ? dots
            .map((dot) => `Route from ${dot.start.lat.toFixed(2)}, ${dot.start.lng.toFixed(2)} to ${dot.end.lat.toFixed(2)}, ${dot.end.lng.toFixed(2)}`)
            .join(". ")
        : "Global route map",
    [dots]
  );

  const zoomLevel = focus?.zoom ?? 1;
  const focusPoint = focus ? toCoords(focus.lat, focus.lng) : null;
  const mapTransformStyle = {
    transform: zoomLevel === 1 ? "none" : `scale(${zoomLevel})`,
    transformOrigin: focusPoint
      ? `${(focusPoint.x / 800) * 100}% ${(focusPoint.y / 400) * 100}%`
      : "50% 50%",
  } as const;

  const paths = useMemo(
    () =>
      dots.map((dot, index) => {
        const startPoint = toCoords(dot.start.lat, dot.start.lng);
        const endPoint = toCoords(dot.end.lat, dot.end.lng);

        return {
          key: `${dot.start.lat}-${dot.start.lng}-${dot.end.lat}-${dot.end.lng}-${index}`,
          d: getArcPath(startPoint, endPoint),
          startPoint,
          endPoint,
        };
      }),
    [dots]
  );

  return (
    <div
      role="img"
      aria-label={mapSummary}
      className="relative h-full min-h-[220px] w-full overflow-hidden rounded-lg border border-zinc-800 bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)]"
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" style={mapTransformStyle}>
        <Image
          src={staticMapData}
          alt="Global route map"
          fill
          unoptimized
          sizes="100vw"
          className="select-none object-cover opacity-55"
        />

        <svg aria-hidden="true" viewBox="0 0 800 400" className="pointer-events-none absolute inset-0 h-full w-full">
          <AnimatePresence mode="wait">
            {paths.map(({ d, startPoint, endPoint, key }) => (
              <g key={key}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke={lineColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.24 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="blur-[2px]"
                />

                <motion.path
                  d={d}
                  fill="none"
                  stroke={lineColor}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />

                <motion.circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r="3"
                  fill={lineColor}
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.45, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.2 }}
                />

                <motion.circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r="3"
                  fill={lineColor}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                />
              </g>
            ))}
          </AnimatePresence>
        </svg>
      </div>
    </div>
  );
});

WorldMap.displayName = "WorldMap";

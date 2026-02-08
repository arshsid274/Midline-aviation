// "use client";

// import { useRef, useMemo } from "react";
// import { motion } from "motion/react";
// import DottedMap from "dotted-map";

// interface MapProps {
//   dots?: Array<{
//     start: { lat: number; lng: number };
//     end: { lat: number; lng: number };
//   }>;
//   lineColor?: string;
// }

// export function WorldMap({ dots = [], lineColor = "#0ea5e9" }: MapProps) {
//   const svgRef = useRef<SVGSVGElement>(null);
  
//   const svgMap = useMemo(() => {
//     const map = new DottedMap({ height: 100, grid: "diagonal" });
//     return map.getSVG({
//       radius: 0.22,
//       color: "#00000040",
//       shape: "circle",
//       backgroundColor: "white",
//     });
//   }, []);

//   const projectPoint = useMemo(() => (lat: number, lng: number) => {
//     const x = (lng + 180) * (800 / 360);
//     const y = (90 - lat) * (400 / 180);
//     return { x, y };
//   }, []);

//   const createCurvedPath = useMemo(() => (
//     start: { x: number; y: number },
//     end: { x: number; y: number }
//   ) => {
//     const midX = (start.x + end.x) / 2;
//     const midY = Math.min(start.y, end.y) - 50;
//     return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
//   }, []);

//   const paths = useMemo(() => {
//     return dots.map((dot, i) => {
//       const startPoint = projectPoint(dot.start.lat, dot.start.lng);
//       const endPoint = projectPoint(dot.end.lat, dot.end.lng);
//       return { startPoint, endPoint, key: i };
//     });
//   }, [dots, projectPoint]);

//   return (
//     <div className="w-full aspect-[2/1] bg-white rounded-lg relative">
//       <img
//         src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
//         className="h-full w-full"
//         alt="world map"
//       />
//       <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-full absolute inset-0">
//         {paths.map(({ startPoint, endPoint, key }) => (
//           <g key={key}>
//             <motion.path
//               d={createCurvedPath(startPoint, endPoint)}
//               fill="none"
//               stroke={lineColor}
//               strokeWidth="2"
//               initial={{ pathLength: 0 }}
//               animate={{ pathLength: 1 }}
//               transition={{ duration: 1, delay: 0.5 * key }}
//             />
//             <circle cx={startPoint.x} cy={startPoint.y} r="4" fill={lineColor} />
//             <circle cx={endPoint.x} cy={endPoint.y} r="4" fill={lineColor} />
//           </g>
//         ))}
//       </svg>
//     </div>
//   );
// }


"use client";
import { useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Changed to framer-motion for consistency
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
  }>;
  lineColor?: string;
}

const mapInstance = new DottedMap({ height: 100, grid: "diagonal" });
const STATIC_MAP_DATA = `data:image/svg+xml;utf8,${encodeURIComponent(
  mapInstance.getSVG({ radius: 0.22, color: "#1e3a3a", shape: "circle", backgroundColor: "#0a1628" })
)}`;

const getCoords = (lat: number, lng: number) => ({
  x: (lng + 180) * (800 / 360),
  y: (90 - lat) * (400 / 180),
});

const getPath = (s: { x: number; y: number }, e: { x: number; y: number }) => {
  // Calculate curvature based on distance to prevent flat lines
  const dx = e.x - s.x;
  const dy = e.y - s.y;
  const dr = Math.sqrt(dx * dx + dy * dy);
  return `M ${s.x} ${s.y} A ${dr} ${dr} 0 0 1 ${e.x} ${e.y}`;
};

export const WorldMap = memo(({ dots = [], lineColor = "#41b3b5" }: MapProps) => {
  const paths = useMemo(() => {
    return dots.map((dot, i) => {
      const startPoint = getCoords(dot.start.lat, dot.start.lng);
      const endPoint = getCoords(dot.end.lat, dot.end.lng);
      return {
        d: getPath(startPoint, endPoint),
        startPoint,
        endPoint,
        key: `${dot.start.lat}-${dot.end.lat}-${i}`,
      };
    });
  }, [dots]);

  return (
    <div className="w-full aspect-[2/1] bg-[#0a1628] rounded-lg relative overflow-hidden border border-zinc-800">
      <img src={STATIC_MAP_DATA} className="h-full w-full select-none opacity-50" alt="map" />

      <svg viewBox="0 0 800 400" className="w-full h-full absolute inset-0 pointer-events-none">
        <AnimatePresence mode="wait">
          {paths.map(({ d, startPoint, endPoint, key }) => (
            <g key={key}>
              {/* Outer Glow Path */}
              <motion.path
                d={d}
                fill="none"
                stroke={lineColor}
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="blur-[2px]"
              />
              
              {/* Main Flight Path */}
              <motion.path
                d={d}
                fill="none"
                stroke={lineColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />

              {/* Start Point Pulse */}
              <motion.circle
                cx={startPoint.x}
                cy={startPoint.y}
                r="3"
                fill={lineColor}
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />

              {/* End Point Marker */}
              <motion.circle
                cx={endPoint.x}
                cy={endPoint.y}
                r="3"
                fill={lineColor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              />
            </g>
          ))}
        </AnimatePresence>
      </svg>
    </div>
  );
});

WorldMap.displayName = 'WorldMap';
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
import { motion } from "motion/react";
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
  mapInstance.getSVG({ radius: 0.22, color: "#00000040", shape: "circle", backgroundColor: "white" })
)}`;

const getCoords = (lat: number, lng: number) => ({
  x: (lng + 180) * (800 / 360),
  y: (90 - lat) * (400 / 180),
});

const getPath = (s: { x: number; y: number }, e: { x: number; y: number }) => 
  `M ${s.x} ${s.y} Q ${(s.x + e.x) / 2} ${Math.min(s.y, e.y) - 50} ${e.x} ${e.y}`;

export const WorldMap = memo(({ dots = [], lineColor = "#41b3b5" }: MapProps) => {
  const { paths, style } = useMemo(() => {
    if (dots.length === 0) return { paths: [], style: {} };
    
    const pathData = dots.map((dot, i) => {
      const startPoint = getCoords(dot.start.lat, dot.start.lng);
      const endPoint = getCoords(dot.end.lat, dot.end.lng);
      return { 
        d: getPath(startPoint, endPoint), 
        startPoint, 
        endPoint, 
        key: `${dot.start.lat}-${i}` 
      };
    });

    const allPoints = pathData.flatMap(p => [p.startPoint, p.endPoint]);
    const centerX = allPoints.reduce((sum, p) => sum + p.x, 0) / allPoints.length;
    const centerY = allPoints.reduce((sum, p) => sum + p.y, 0) / allPoints.length;

    const scale = 2;
    const offsetX = -(centerX - 400) * (scale - 1);
    const offsetY = -(centerY - 200) * (scale - 1);
    
    return { 
      paths: pathData, 
      style: {
        transform: `scale(${scale})`,
        transformOrigin: `${centerX}px ${centerY}px`,
        transition: 'transform 0.5s ease'
      }
    };
  }, [dots]);

  return (
    <div className="w-full aspect-[2/1] bg-white rounded-lg relative overflow-hidden">
      <div style={style}>
        <img src={STATIC_MAP_DATA} className="h-full w-full select-none" alt="map" />
        <svg viewBox="0 0 800 400" className="w-full h-full absolute inset-0 pointer-events-none">
          {paths.map(({ d, startPoint, endPoint, key }) => (
            <g key={key}>
              <motion.path
                d={d}
                fill="none"
                stroke={lineColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <circle cx={startPoint.x} cy={startPoint.y} r="3" fill={lineColor} />
              <circle cx={endPoint.x} cy={endPoint.y} r="3" fill={lineColor} />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
});

WorldMap.displayName = 'WorldMap';

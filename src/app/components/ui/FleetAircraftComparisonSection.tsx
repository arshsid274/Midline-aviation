import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  ChevronDown,
  Download,
  Gauge,
  Globe2,
  Ruler,
  SlidersHorizontal,
  Star,
  Users2,
} from "lucide-react";
import { playfairDisplay } from "@/lib/fonts";

interface AircraftOption {
  label: string;
  value: string;
}

interface AircraftColumn {
  code: string;
  name: string;
  image: string;
  badge: string;
  options: AircraftOption[];
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
    image: "/assets/images/Embrar_Legasy_650.png",
    badge: "HEAVY JET",
    options: [
      { label: "Embraer Legacy 650", value: "legacy-650" },
      { label: "Citation X", value: "citation-x" },
      { label: "Challenger 350", value: "challenger-350" },
    ],
  },
  {
    code: "GULFSTREAM G450",
    name: "Gulfstream G450",
    image: "/assets/images/gallery/g450_Exterior_Final.png",
    badge: "LARGE JET",
    options: [
      { label: "Gulfstream G450", value: "g450" },
      { label: "Global 6000", value: "global-6000" },
      { label: "Falcon 900LX", value: "falcon-900lx" },
    ],
  },
  {
    code: "GULFSTREAM G200",
    name: "Gulfstream G200",
    image: "/assets/images/gallery/G200_Exterior_final.png",
    badge: "SUPER MIDSIZE",
    options: [
      { label: "Gulfstream G200", value: "g200" },
      { label: "Hawker 900XP", value: "hawker-900xp" },
      { label: "Citation Latitude", value: "citation-latitude" },
    ],
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

export default function FleetAircraftComparisonSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Subtle navy grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(17,26,90,1) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(to bottom, rgba(17,26,90,1) 1px, transparent 1px, transparent 64px)",
        }}
      />
      {/* Soft top glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(ellipse, #111a5a 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-6 border-b border-[#111a5a]/10 pb-8 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#111a5a]/55">
              Fleet Analysis
            </p>
            <h2
              className={`${playfairDisplay.className} mt-3 text-4xl font-medium tracking-[-0.02em] text-[#111a5a] sm:text-5xl`}
            >
              Compare Aircraft
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#111a5a]/58">
              Analyze performance, comfort, and specifications side-by-side to find the perfect jet for your next
              journey.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-[#111a5a]/16 bg-[linear-gradient(90deg,rgba(17,26,90,0.05)_0%,rgba(10,110,164,0.05)_100%)] px-4 py-2.5 text-sm font-semibold text-[#111a5a]/70 transition-colors hover:bg-[linear-gradient(90deg,rgba(17,26,90,0.10)_0%,rgba(10,110,164,0.10)_100%)] hover:text-[#111a5a]"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-[#111a5a]/16 bg-[linear-gradient(90deg,rgba(17,26,90,0.05)_0%,rgba(10,110,164,0.05)_100%)] px-4 py-2.5 text-sm font-semibold text-[#111a5a]/70 transition-colors hover:bg-[linear-gradient(90deg,rgba(17,26,90,0.10)_0%,rgba(10,110,164,0.10)_100%)] hover:text-[#111a5a]"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Glass table card */}
        <div className="overflow-hidden rounded-3xl border border-[#111a5a]/10 bg-white/80 shadow-[0_24px_64px_rgba(17,26,90,0.1)] backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr>
                  {/* Metrics label header cell */}
                  <th className="h-[290px] min-w-[210px] w-[22%] border-b border-r border-[#111a5a]/8 bg-[#f5f7fd] p-6 text-left align-bottom">
                    <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#111a5a]/40">
                      Specifications
                    </span>
                    <span
                      className={`${playfairDisplay.className} mt-2 block text-3xl font-medium text-[#111a5a]`}
                    >
                      Metrics
                    </span>
                  </th>

                  {/* Aircraft columns */}
                  {aircraftColumns.map((aircraft, columnIndex) => (
                    <th
                      key={aircraft.code}
                      className={`h-[290px] min-w-[260px] w-[26%] border-b border-[#111a5a]/8 bg-white p-5 align-top ${
                        columnIndex < aircraftColumns.length - 1 ? "border-r border-[#111a5a]/8" : ""
                      }`}
                    >
                      <div className="flex h-full flex-col gap-3.5 text-left">
                        {/* Dropdown */}
                        <div className="relative">
                          <select
                            defaultValue={aircraft.options[0]?.value}
                            className="w-full appearance-none rounded-lg border border-[#111a5a]/18 bg-[#f5f7fd] py-1.5 pl-3 pr-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111a5a]"
                            aria-label={`${aircraft.name} options`}
                          >
                            {aircraft.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#111a5a]/60" />
                        </div>

                        {/* Aircraft image */}
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-[#111a5a]/10">
                          <Image
                            src={aircraft.image}
                            alt={`${aircraft.name} private jet exterior`}
                            fill
                            sizes="260px"
                            className="object-cover transition-transform duration-500 hover:scale-[1.05]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          {/* Glass badge */}
                          <span className="absolute bottom-2.5 left-2.5 rounded-md border border-white/30 bg-[linear-gradient(90deg,rgba(17,26,90,0.75)_0%,rgba(10,110,164,0.75)_100%)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                            {aircraft.badge}
                          </span>
                        </div>

                        <h3 className={`${playfairDisplay.className} text-[1.2rem] font-medium text-[#111a5a]`}>
                          {aircraft.name}
                        </h3>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {metricRows.map((metric, rowIndex) => {
                  const Icon = metric.icon;
                  const isEven = rowIndex % 2 === 0;
                  return (
                    <tr key={metric.label} className={isEven ? "bg-[#f8faff]" : "bg-white"}>
                      {/* Metric label cell */}
                      <td className="h-[86px] border-b border-r border-[#111a5a]/8 px-6 py-4">
                        <div className="flex items-center gap-2.5 text-sm font-semibold text-[#111a5a]/70">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[linear-gradient(90deg,rgba(17,26,90,0.08)_0%,rgba(10,110,164,0.08)_100%)]">
                            <Icon className="h-3.5 w-3.5 text-[#111a5a]/60" />
                          </span>
                          <span>{metric.label}</span>
                        </div>
                      </td>

                      {/* Value cells */}
                      {metric.values.map((cell, index) => {
                        const isBest = index === metric.bestIndex;
                        return (
                          <td
                            key={`${metric.label}-${index}-${cell.value}`}
                            className={`relative h-[86px] border-b border-[#111a5a]/8 px-4 py-3 text-center transition-colors ${
                              index < metric.values.length - 1 ? "border-r border-[#111a5a]/8" : ""
                            } ${isBest ? "bg-[linear-gradient(90deg,rgba(17,26,90,0.04)_0%,rgba(10,110,164,0.04)_100%)]" : ""}`}
                          >
                            {isBest && (
                              <Star className="absolute right-2.5 top-2.5 h-3.5 w-3.5 fill-[#111a5a] text-[#111a5a] opacity-30" />
                            )}
                            <div className="flex h-full flex-col items-center justify-center">
                              <span
                                className={`text-xl font-semibold ${isBest ? "text-[#111a5a]" : "text-[#111a5a]/70"}`}
                              >
                                {cell.value}
                              </span>
                              <span className="mt-0.5 text-[11px] text-[#111a5a]/42">{cell.note}</span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>

              <tfoot>
                <tr>
                  <td className="border-r border-t border-[#111a5a]/8 bg-[#f5f7fd] p-6" />
                  {aircraftColumns.map((aircraft, index) => (
                    <td
                      key={`${aircraft.code}-cta`}
                      className={`border-t border-[#111a5a]/8 bg-white p-5 ${
                        index < aircraftColumns.length - 1 ? "border-r border-[#111a5a]/8" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className="w-full rounded-xl border-2 border-[#111a5a]/30 px-4 py-2.5 text-sm font-semibold text-[#111a5a] transition-all hover:border-[#111a5a] hover:bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] hover:text-white"
                      >
                        View Details
                      </button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

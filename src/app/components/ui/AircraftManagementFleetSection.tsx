import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/app/components/motion/Reveal";

interface ManagedAircraft {
  label: string;
  name: string;
  description: string;
  imageSrc: string;
  objectPosition?: string;
}

const managedFleet: ManagedAircraft[] = [
  {
    label: "Large Jet",
    name: "Gulfstream G450",
    description: "Full-service management for the G450 — long-range capability backed by disciplined dispatch and maintenance oversight.",
    imageSrc: "/assets/images/aircraft/g450-exterior.webp",
  },
  {
    label: "Heavy Jet",
    name: "Embraer Legacy 650",
    description: "Heavy-jet management with the cabin space and range for extended business and diplomatic missions.",
    imageSrc: "/assets/images/aircraft/legacy650-exterior.webp",
  },
  {
    label: "Super Midsize",
    name: "Gulfstream G200",
    description: "Efficient super-midsize management tuned for regional reach, quick turnarounds, and cost control.",
    imageSrc: "/assets/images/aircraft/g200-exterior.webp",
  },
];

export default function AircraftManagementFleetSection() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal as="div" variant="fade-up" className="mb-9 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#111a5a]/72">Under Our Wing</p>
            <h2
              className="font-display mt-2 text-3xl font-medium tracking-[-0.02em] text-[#111a5a] sm:text-4xl"
            >
              Our Management Fleet
            </h2>
          </div>
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#111a5a] transition-colors hover:text-[#1d2f86]"
          >
            View All Specifications
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal as="div" variant="stagger" stagger={0.12} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {managedFleet.map((aircraft) => (
            <article
              key={aircraft.name}
              data-reveal-item
              className="group overflow-hidden rounded-2xl border border-[#111a5a]/12 bg-white shadow-[0_16px_32px_rgba(17,26,90,0.1)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={aircraft.imageSrc}
                  alt={`${aircraft.name} aircraft`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={aircraft.objectPosition ? { objectPosition: aircraft.objectPosition } : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111a5a]/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 inline-flex rounded bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white">
                  {aircraft.label}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#111a5a]">{aircraft.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#111a5a]/72">{aircraft.description}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

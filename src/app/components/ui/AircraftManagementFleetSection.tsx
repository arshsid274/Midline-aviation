import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { playfairDisplay } from "@/lib/fonts";

interface ManagedAircraft {
  label: string;
  name: string;
  description: string;
  imageSrc: string;
  objectPosition?: string;
}

const managedFleet: ManagedAircraft[] = [
  {
    label: "Ultra Long Range",
    name: "Global 7500",
    description: "Built for intercontinental missions with smooth cabin comfort and precision dispatch.",
    imageSrc: "/assets/images/fleet/global-7500.jpg",
  },
  {
    label: "Heavy Jet",
    name: "Gulfstream G650ER",
    description: "High-performance management support for long-range business and diplomatic operations.",
    imageSrc: "/assets/images/fleet/gulfstream-g650er.jpg",
  },
  {
    label: "Managed Portfolio",
    name: "Diverse Fleet Access",
    description: "Access a curated management portfolio aligned to mission profile, cost, and passenger capacity.",
    imageSrc: "/assets/images/fleet/citation-latitude.jpg",
  },
];

export default function AircraftManagementFleetSection() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#111a5a]/72">Under Our Wing</p>
            <h2
              className={`${playfairDisplay.className} mt-2 text-3xl font-medium tracking-[-0.02em] text-[#111a5a] sm:text-4xl`}
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
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {managedFleet.map((aircraft) => (
            <article
              key={aircraft.name}
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
        </div>
      </div>
    </section>
  );
}

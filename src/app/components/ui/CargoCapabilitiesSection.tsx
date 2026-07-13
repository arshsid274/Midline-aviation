import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/app/components/motion/Reveal";

const operations = [
  {
    title: "Express Delivery",
    description:
      "Time-critical shipments handled with priority routing, guaranteed delivery windows, and same-day processing at major hubs.",
    image: "/assets/images/aircraft/g200-exterior.webp",
    tag: "Priority Freight",
  },
  {
    title: "Heavy Lift",
    description:
      "Oversized and heavy cargo solutions using wide-body freighter capacity with specialized loading equipment and structural engineering support.",
    image: "/assets/images/aircraft/legacy650-exterior-rear.webp",
    tag: "Oversized Cargo",
  },
  {
    title: "Specialized Cargo",
    description:
      "Hazmat, temperature-sensitive, and high-value cargo handled under strict compliance protocols, with dedicated secure storage and monitoring.",
    image: "/assets/images/aircraft/g450-nose.webp",
    tag: "Sensitive Freight",
  },
];

export default function CargoCapabilitiesSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
          <Reveal as="div" variant="stagger" stagger={0.14}>
            <p data-reveal-item className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#111a5a]/60">Capabilities</p>
            <h2
              data-reveal-item
              className="font-display mt-3 text-3xl font-medium tracking-[-0.02em] text-[#111a5a] sm:text-4xl"
            >
              Our Operations
            </h2>
            <p data-reveal-item className="mt-3 max-w-xl text-sm leading-relaxed text-[#111a5a]/68 sm:text-base">
              From express packages to mission-critical oversized freight — Midline Cargo operates across every
              spectrum of air logistics.
            </p>
          </Reveal>
          <a
            href="#"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#111a5a] underline-offset-4 hover:underline"
          >
            View All Operations
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Image cards grid */}
        <Reveal as="div" variant="stagger" stagger={0.12} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {operations.map((op) => (
            <article
              key={op.title}
              data-reveal-item
              className="group relative overflow-hidden rounded-2xl border border-[#111a5a]/12 shadow-[0_16px_36px_rgba(17,26,90,0.10)]"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={op.image}
                  alt={op.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111a5a]/82 via-[#0b5f95]/28 to-transparent" />

                {/* Tag badge */}
                <span className="absolute left-4 top-4 rounded-full border border-[#00bcff]/40 bg-[linear-gradient(90deg,rgba(17,26,90,0.70)_0%,rgba(10,110,164,0.70)_100%)] px-3 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-[#00bcff] backdrop-blur-sm">
                  {op.tag}
                </span>

                {/* Title on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-2xl font-medium text-white">{op.title}</h3>
                </div>
              </div>

              {/* Description panel */}
              <div className="bg-white p-5">
                <p className="text-sm leading-relaxed text-[#111a5a]/70">{op.description}</p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#111a5a] underline-offset-4 hover:underline"
                >
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </Reveal>

        {/* Bottom metrics bar */}
        <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-[#111a5a]/10 bg-[#f8faff] p-6 sm:grid-cols-4 sm:p-8">
          {[
            { value: "500+", label: "Tonnes/Day Capacity" },
            { value: "180+", label: "Global Destinations" },
            { value: "48hr", label: "Express Turnaround" },
            { value: "100%", label: "Compliance Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-semibold text-[#111a5a] sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#111a5a]/54">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

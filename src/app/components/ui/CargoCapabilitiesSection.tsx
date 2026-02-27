import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { playfairDisplay } from "@/lib/fonts";

const operations = [
  {
    title: "Express Delivery",
    description:
      "Time-critical shipments handled with priority routing, guaranteed delivery windows, and same-day processing at major hubs.",
    image: "/assets/images/fleet/gulfstream-g650er.jpg",
    tag: "Priority Freight",
  },
  {
    title: "Heavy Lift",
    description:
      "Oversized and heavy cargo solutions using wide-body freighter capacity with specialized loading equipment and structural engineering support.",
    image: "/assets/images/fleet/embraer-heavy-exterior.jpg",
    tag: "Oversized Cargo",
  },
  {
    title: "Specialized Cargo",
    description:
      "Hazmat, temperature-sensitive, and high-value cargo handled under strict compliance protocols, with dedicated secure storage and monitoring.",
    image: "/assets/images/available-flights/gulfstream-heavy-exterior.jpg",
    tag: "Sensitive Freight",
  },
];

export default function CargoCapabilitiesSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#0d1451]/60">Capabilities</p>
            <h2
              className={`${playfairDisplay.className} mt-3 text-3xl font-medium tracking-[-0.02em] text-[#0d1451] sm:text-4xl`}
            >
              Our Operations
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#0d1451]/68 sm:text-base">
              From express packages to mission-critical oversized freight — Midline Cargo operates across every
              spectrum of air logistics.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#0d1451] underline-offset-4 hover:underline"
          >
            View All Operations
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Image cards grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {operations.map((op) => (
            <article
              key={op.title}
              className="group relative overflow-hidden rounded-2xl border border-[#0d1451]/12 shadow-[0_16px_36px_rgba(13,20,81,0.10)]"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1451]/82 via-[#0d1451]/28 to-transparent" />

                {/* Tag badge */}
                <span className="absolute left-4 top-4 rounded-full border border-[#00bcff]/40 bg-[#0d1451]/70 px-3 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-[#00bcff] backdrop-blur-sm">
                  {op.tag}
                </span>

                {/* Title on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className={`${playfairDisplay.className} text-2xl font-medium text-white`}>{op.title}</h3>
                </div>
              </div>

              {/* Description panel */}
              <div className="bg-white p-5">
                <p className="text-sm leading-relaxed text-[#0d1451]/70">{op.description}</p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d1451] underline-offset-4 hover:underline"
                >
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom metrics bar */}
        <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-[#0d1451]/10 bg-[#f8faff] p-6 sm:grid-cols-4 sm:p-8">
          {[
            { value: "500+", label: "Tonnes/Day Capacity" },
            { value: "180+", label: "Global Destinations" },
            { value: "48hr", label: "Express Turnaround" },
            { value: "100%", label: "Compliance Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-semibold text-[#0d1451] sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#0d1451]/54">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

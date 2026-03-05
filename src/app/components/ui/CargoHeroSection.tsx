import Image from "next/image";
import { playfairDisplay } from "@/lib/fonts";
import { Package, ArrowRight } from "lucide-react";

export default function CargoHeroSection() {
  return (
    <section className="relative isolate h-[calc(100svh-72px)] w-full overflow-hidden md:h-[calc(100svh-84px)]">
      <Image
        src="/assets/images/Midlien_cargo_final.png"
        alt="Cargo aircraft ready for global freight operations"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      <div className="relative mx-auto flex h-full w-full max-w-[1400px] items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-[40rem] text-left text-white">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00bcff]/38 bg-[#00bcff]/14 px-3.5 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#00bcff] backdrop-blur-xl">
            <Package className="h-3 w-3" />
            Global Logistics Experts
          </span>

          {/* Heading */}
          <h1
            className={`${playfairDisplay.className} mt-5 text-4xl font-medium leading-[1.06] tracking-[-0.02em] sm:text-5xl md:text-[3.6rem]`}
          >
            Reliable Air Cargo
            <br />
            <span className="text-[#00bcff]">Solutions</span> For Business
          </h1>

          {/* Body */}
          <p className="mt-5 max-w-[34rem] text-sm leading-relaxed text-white/78 sm:text-base">
            Experience seamless global logistics with Midline Aviation&rsquo;s end-to-end cargo network. Precision
            handling, real-time tracking, and guaranteed delivery windows for every shipment.
          </p>

          {/* Stats row */}
          <div className="mt-7 flex flex-wrap items-center gap-6 border-t border-white/14 pt-6">
            {[
              { value: "180+", label: "Destinations" },
              { value: "99.4%", label: "On-Time Rate" },
              { value: "24/7", label: "Operations" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold text-[#00bcff]">{stat.value}</p>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#00bcff] px-6 py-3 text-sm font-semibold text-[#111a5a] transition-colors hover:bg-[#33cbff]"
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/26 bg-black/28 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-black/44"
            >
              Track Shipment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

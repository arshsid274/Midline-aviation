import Image from "next/image";
import { playfairDisplay } from "@/lib/fonts";

export default function MROHeroSection() {
  return (
    <section className="relative isolate h-[calc(100svh-72px)] w-full overflow-hidden md:h-[calc(100svh-84px)]">
      <Image
        src="/assets/images/fleet/fleet-hero.jpg"
        alt="Aircraft prepared for maintenance inside hangar environment"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-black/44" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/48 to-black/16" />
      <div
        className="absolute inset-0 opacity-18"
        style={{
          backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.08) 1px, transparent 1px, transparent 48px)",
        }}
      />

      <div className="relative mx-auto flex h-full w-full max-w-[1400px] items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-[36rem] text-left text-white">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#00bcff]/45 bg-[#00bcff]/18 px-3 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-[#00bcff] backdrop-blur-xl">
            Century of Excellence
          </p>

          <h1
            className={`${playfairDisplay.className} mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.02em] sm:text-5xl md:text-6xl`}
          >
            Maintenance,
            <br />
            <span className="text-[#00bcff]">Repair &amp; Overhaul</span>
          </h1>

          <p className="mt-4 max-w-[32rem] text-sm leading-relaxed text-white/82 sm:text-base">
            The gold standard in aviation excellence. Experience the perfect blend of technical precision and luxury
            service in our state-of-the-art facilities.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#00bcff] px-6 py-3 text-sm font-semibold text-[#111a5a] transition-colors hover:bg-[#33cbff]"
            >
              View Capabilities
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/26 bg-black/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-black/45"
            >
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

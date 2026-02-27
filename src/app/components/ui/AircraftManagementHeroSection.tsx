import Image from "next/image";
import { playfairDisplay } from "@/lib/fonts";

export default function AircraftManagementHeroSection() {
  return (
    <section className="bg-white pb-12 pt-8 sm:pb-14 sm:pt-10 lg:pb-16 lg:pt-12">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl border border-[#0d1451]/12 shadow-[0_28px_70px_rgba(13,20,81,0.16)]">
          <Image
            src="/assets/images/fleet/fleet-cta.jpg"
            alt="Private aircraft at sunset"
            fill
            sizes="(max-width: 1024px) 100vw, 1400px"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1451]/44 via-[#0d1451]/58 to-[#0d1451]/76" />

          <div className="relative mx-auto flex min-h-[62svh] max-w-4xl flex-col items-center justify-center px-6 py-14 text-center sm:min-h-[66svh] sm:py-16">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/12 px-4 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl">
              Elite Aircraft Management
            </p>

            <h1
              className={`${playfairDisplay.className} mt-5 text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl`}
            >
              Expert Care for Your Aircraft,{" "}
              <span className="rounded-md bg-white px-2 py-0.5 text-[#0d1451]">Peace of Mind</span> for You
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/88 sm:text-base md:text-lg">
              Comprehensive aircraft management services tailored to operational excellence, safety, and your schedule.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0d1451] transition-colors hover:bg-[#f4f7ff]"
              >
                Explore Our Fleet
              </button>
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/18"
              >
                Review Safety Protocols
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

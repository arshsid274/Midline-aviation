import Image from "next/image";
import Reveal from "@/app/components/motion/Reveal";
import SplitHeading from "@/app/components/motion/SplitHeading";

export default function AircraftManagementHeroSection() {
  return (
    <section className="relative isolate h-[calc(100svh-72px)] w-full overflow-hidden md:h-[calc(100svh-84px)]">
      <Image
        src="/assets/images/aircraft/management-hero.webp"
        alt="Gulfstream G200 T7-MIDA under management, seen from the Midline FBO lounge"
        fill
        sizes="100vw"
        className="object-cover object-center hero-kenburns"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      <Reveal
        as="div"
        className="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center"
        on="load"
        variant="stagger"
        stagger={0.12}
        delay={0.1}
      >
        <p
          data-reveal-item
          className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/12 px-4 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl"
        >
          Elite Aircraft Management
        </p>

        <SplitHeading
          as="h1"
          mode="lcp"
          on="load"
          delay={0.25}
          className="font-display mt-5 text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl"
        >
          Expert Care for Your Aircraft,{" "}
          <span className="rounded-md bg-white px-2 py-0.5 text-[#111a5a]">Peace of Mind</span> for You
        </SplitHeading>

        <p
          data-reveal-item
          className="mt-5 max-w-3xl text-sm leading-relaxed text-white/88 sm:text-base md:text-lg"
        >
          Comprehensive aircraft management services tailored to operational excellence, safety, and your schedule.
        </p>

        <div data-reveal-item className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#111a5a] transition-colors hover:bg-[#f4f7ff]"
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
      </Reveal>
    </section>
  );
}

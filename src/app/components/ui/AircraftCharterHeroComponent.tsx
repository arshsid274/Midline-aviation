import Image from "next/image";
import Link from "next/link";
import Reveal from "@/app/components/motion/Reveal";
import SplitHeading from "@/app/components/motion/SplitHeading";

export default function AircraftCharterHeroComponent() {
  return (
    <section className="relative flex min-h-[88svh] items-center justify-center overflow-hidden">
      <Image
        src="/assets/images/aircraft/g200-cabin.webp"
        alt="Gulfstream G200 private jet cabin prepared for charter"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/45" />

      <Reveal
        as="div"
        className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-6"
        on="load"
        variant="stagger"
        stagger={0.12}
        delay={0.1}
      >
        <span data-reveal-item className="mb-6 inline-block rounded-full border border-[#00bcff]/45 bg-[#00bcff]/12 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#00bcff] backdrop-blur-md">
          Premium Charter Experience
        </span>
        <SplitHeading as="h1" mode="lcp" on="load" delay={0.25} className="mb-6 text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">Aircraft Charter</SplitHeading>
        <p data-reveal-item className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-slate-200/90 md:text-2xl">
          We value your time and redefine the quality of travel with bespoke aviation solutions.
        </p>
        <div data-reveal-item className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/fleet" className="midline-btn-primary w-full rounded-xl px-10 py-4 text-center text-sm sm:w-auto">
            Explore Our Fleet
          </Link>
          <Link href="/contact" className="midline-btn-secondary w-full rounded-xl px-10 py-4 text-center text-sm sm:w-auto">
            Virtual Tour
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

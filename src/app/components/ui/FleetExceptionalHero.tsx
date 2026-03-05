import Image from "next/image";
import { playfairDisplay } from "@/lib/fonts";

export default function FleetExceptionalHero() {
  return (
    <section className="relative isolate h-[calc(100svh-72px)] w-full overflow-hidden md:h-[calc(100svh-84px)]">
      <div className="relative h-full w-full">
        <Image
          src="/assets/images/gulfstream,g800.png"
          alt="Gulfstream G800 in flight"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/16 to-black/34" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1
            className={`${playfairDisplay.className} text-4xl font-medium tracking-[-0.02em] text-white sm:text-5xl md:text-6xl`}
          >
            Our Exceptional Fleet
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-blue-50/92 sm:text-base md:text-lg">
            Experience a new era of aviation excellence with our fully modernized range of aircraft.
          </p>
          <span aria-hidden className="mt-4 h-[2px] w-16 rounded-full bg-[#c8a85d]" />
        </div>
      </div>
    </section>
  );
}

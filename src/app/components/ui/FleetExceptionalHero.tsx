import Reveal from "@/app/components/motion/Reveal";
import SplitHeading from "@/app/components/motion/SplitHeading";

export default function FleetExceptionalHero() {
  return (
    <section className="relative isolate h-[calc(100svh-72px)] w-full overflow-hidden md:h-[calc(100svh-84px)]">
      <div className="relative h-full w-full">
        {/* Real Midline G200 showcase reel. The poster (a small WebP still) paints
            instantly for a fast LCP; the muted looping video streams in behind it. */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/assets/images/aircraft/g200-exterior.webp"
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src="/assets/videos/g200-showcase.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/16 to-black/34" />

        <Reveal
          as="div"
          on="load"
          variant="stagger"
          stagger={0.12}
          delay={0.1}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <SplitHeading
            as="h1"
            mode="lcp"
            on="load"
            delay={0.25}
            className="font-display text-4xl font-medium tracking-[-0.02em] text-white sm:text-5xl md:text-6xl"
          >
            Our Exceptional Fleet
          </SplitHeading>
          <p data-reveal-item className="mt-3 max-w-2xl text-sm leading-relaxed text-blue-50/92 sm:text-base md:text-lg">
            Experience a new era of aviation excellence with our fully modernized range of aircraft.
          </p>
          <span aria-hidden data-reveal-item className="mt-4 h-[2px] w-16 rounded-full bg-[#c8a85d]" />
        </Reveal>
      </div>
    </section>
  );
}

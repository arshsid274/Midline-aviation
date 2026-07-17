import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Cog, ShieldAlert } from "lucide-react";
import Reveal from "@/app/components/motion/Reveal";
import SplitHeading from "@/app/components/motion/SplitHeading";

const capabilities = [
  {
    title: "Maintenance",
    description: "Scheduled line and base programs by certified teams.",
    icon: ClipboardCheck,
  },
  {
    title: "Repair",
    description: "Component and systems repair with full traceability.",
    icon: Cog,
  },
  {
    title: "Overhaul",
    description: "Lifecycle programs focused on value and reliability.",
    icon: ShieldAlert,
  },
];

const TICKER_ITEMS = Array.from({ length: 8 });

export default function MROComingSoon() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-72px)] w-full flex-col overflow-hidden md:min-h-[calc(100svh-84px)]">
      {/* Real T7-MID ground-handling photography, slow Ken-Burns drift */}
      <Image
        src="/assets/images/aircraft/g450-nose.webp"
        alt="Gulfstream G450 head-on during ground handling at the Midline facility"
        fill
        sizes="100vw"
        className="object-cover object-center hero-kenburns"
        priority
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,42,0.82)_0%,rgba(17,26,90,0.72)_55%,rgba(7,12,42,0.90)_100%)]" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <Reveal as="div" on="load" variant="fade-up" delay={0.05}>
          <p className="inline-flex items-center gap-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-[#00bcff] sm:text-[0.7rem]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#00bcff] opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00bcff]" />
            </span>
            Aircraft MRO · Maintenance, Repair &amp; Overhaul
          </p>
        </Reveal>

        {/* The statement — the largest element on the page by far */}
        <SplitHeading
          as="h1"
          mode="lcp"
          on="load"
          delay={0.2}
          className="font-display mt-7 text-6xl font-medium leading-[0.98] tracking-[-0.03em] text-white sm:text-8xl lg:text-9xl"
        >
          Coming <span className="italic text-[#00bcff]">Soon</span>
        </SplitHeading>

        <Reveal as="div" on="load" variant="fade-up" delay={0.6}>
          <p className="font-display mx-auto mt-6 max-w-2xl text-xl font-medium leading-snug text-white/85 sm:text-2xl">
            Our certified Maintenance, Repair &amp; Overhaul facility is in final preparation.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/68 sm:text-base">
            The same precision that flies the Midline fleet — OEM-aligned procedures, full
            traceability, and a 24/7 AOG desk — arriving at Dubai World Central.
          </p>
        </Reveal>

        <Reveal
          as="ul"
          variant="stagger"
          stagger={0.12}
          on="load"
          delay={0.85}
          className="mx-auto mt-10 grid w-full max-w-[42rem] gap-3 sm:grid-cols-3"
        >
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <li
                key={capability.title}
                data-reveal-item
                className="rounded-xl border border-white/16 bg-white/8 p-4 text-left backdrop-blur-xl"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#00bcff]/16 text-[#00bcff]">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <h2 className="mt-3 text-sm font-semibold text-white">{capability.title}</h2>
                <p className="mt-1 text-[0.72rem] leading-relaxed text-[#dfe8ff]/70">{capability.description}</p>
              </li>
            );
          })}
        </Reveal>

        <Reveal as="div" on="load" variant="fade-up" delay={1.2} className="mt-10">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#00bcff] px-6 py-3 text-sm font-semibold text-[#111a5a] transition-colors hover:bg-[#33cbff] active:scale-[0.98]"
            >
              Get Notified at Launch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/fleet"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/28 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/18 active:scale-[0.98]"
            >
              Explore the Fleet
            </Link>
          </div>
          <p className="mt-6 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/45">
            Certified engineers · OEM-aligned procedures · Dubai World Central
          </p>
        </Reveal>
      </div>

      {/* Unmissable status ticker — outlined type, seamless compositor-only loop */}
      <div aria-hidden className="relative border-t border-white/10 bg-[#070c2a]/60 py-4 backdrop-blur-sm">
        <div className="overflow-hidden">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {TICKER_ITEMS.map((_, index) => (
                  <span
                    key={index}
                    className="mx-6 whitespace-nowrap text-2xl font-semibold uppercase tracking-[0.3em] text-transparent sm:text-3xl"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.22)" }}
                  >
                    Coming Soon <span className="mx-4 text-[#00bcff]/40" style={{ WebkitTextStroke: "0" }}>•</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

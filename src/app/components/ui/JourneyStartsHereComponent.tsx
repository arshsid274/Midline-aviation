import Link from "next/link";
import { ArrowUpRight, PlaneTakeoff } from "lucide-react";

const journeySteps = [
  {
    title: "Request",
    description: "Fill out the short form (or call us) with your requirements.",
  },
  {
    title: "Quote",
    description: "Receive a comprehensive, competitive quote from your dedicated specialist.",
  },
  {
    title: "Fly",
    description: "Confirm and fly with guaranteed support and execution.",
  },
];

export default function JourneyStartsHereComponent() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] py-20 sm:py-24">
      <div className="relative mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-balance text-[2rem] font-medium leading-[1.04] tracking-[-0.02em] text-white sm:text-[2.7rem] lg:text-[4rem]">
            Chartering your flight in 3 simple steps
          </h2>
          <Link
            href="/contact"
            className="inline-flex h-14 shrink-0 items-center gap-2 rounded-full border border-white/75 px-9 text-[2rem] font-semibold text-white transition-colors hover:border-[#00bcff] hover:text-[#00bcff]"
          >
            <span className="text-[2rem] leading-none">Talk To Us</span>
            <ArrowUpRight className="h-6 w-6 text-[#00bcff]" />
          </Link>
        </div>

        <div className="mt-12 h-px w-full bg-white/12" />

        <div className="relative mt-20">
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 border-t border-dashed border-[#00bcff]/75 lg:block" />
          <div className="journey-plane pointer-events-none absolute top-1/2 z-20 hidden -translate-y-1/2 text-[#00bcff] lg:block">
            <PlaneTakeoff className="h-10 w-10 -rotate-2 drop-shadow-[0_0_10px_rgba(0,188,255,0.6)]" />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-14">
            {journeySteps.map((item) => (
              <article
                key={item.title}
                className="relative isolate min-h-[290px] overflow-hidden border border-dashed border-[#00bcff]/70 bg-[#0b1a5f] px-10 py-12"
              >
                <div className="absolute -bottom-16 right-6 z-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(0,188,255,0.2)_0%,rgba(0,188,255,0.08)_42%,rgba(3,4,14,0)_74%)]" />
                <div className="absolute -bottom-6 right-14 z-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(1,98,145,0.42)_0%,rgba(1,98,145,0.16)_44%,rgba(3,4,14,0)_75%)]" />
                <div className="relative z-10">
                  <h3 className="text-5xl font-semibold leading-none tracking-[-0.01em] text-[#00bcff]">{item.title}</h3>
                  <p className="mt-8 max-w-[28ch] text-[2rem] leading-[1.45] text-white">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/app/components/motion/Reveal";

export default function MROOptimizeFleetSection() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-[#111a5a]/12 bg-gradient-to-r from-[#111a5a] to-[#016291] p-8 text-white shadow-[0_24px_50px_rgba(17,26,90,0.28)] sm:p-10 lg:p-12">
          <Reveal as="div" variant="fade-up" className="mx-auto max-w-3xl text-center">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#00bcff]">Next Step</p>
            <h2 className="font-display mt-3 text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
              Ready to Optimize Your Fleet?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#dfe8ff]/88 sm:text-base">
              Let our engineering and operations teams design a maintenance strategy aligned to your aircraft,
              schedule, and cost goals.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#111a5a] transition-colors hover:bg-[#f4f7ff]"
              >
                Request MRO Consultation
              </Link>
              <Link
                href="/fleet"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/18"
              >
                Explore Fleet
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

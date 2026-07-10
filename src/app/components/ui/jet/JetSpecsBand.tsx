import type { Jet } from "@/lib/fleet";
import Reveal from "@/app/components/motion/Reveal";
import CountUp from "@/app/components/motion/CountUp";

export default function JetSpecsBand({ jet }: { jet: Jet }) {
  return (
    <section
      aria-label={`${jet.name} performance`}
      className="bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] py-14 sm:py-16"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal as="div" variant="fade-up" className="mb-10 max-w-3xl">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#00bcff]">Performance</p>
          <h2 className="font-display mt-3 text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl">
            {jet.name} at a glance
          </h2>
        </Reveal>

        <Reveal
          as="dl"
          variant="stagger"
          stagger={0.08}
          className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5"
        >
          {jet.specs.map((spec) => (
            <div key={spec.label} data-reveal-item>
              <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#dfe8ff]/64">
                {spec.label}
              </dt>
              <dd className="mt-2">
                <span className="text-3xl font-semibold leading-none text-white sm:text-4xl">
                  {spec.displayValue ?? <CountUp value={spec.value} />}
                  {spec.unit && !spec.displayValue && (
                    <span className="ml-1.5 text-base font-medium text-[#00bcff]">{spec.unit}</span>
                  )}
                </span>
                <p className="mt-2 text-[0.72rem] text-[#dfe8ff]/72">{spec.note}</p>
              </dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

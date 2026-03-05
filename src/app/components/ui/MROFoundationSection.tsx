import Image from "next/image";
import { ShieldCheck, Wrench, TimerReset } from "lucide-react";
import { playfairDisplay } from "@/lib/fonts";

const pillars = [
  {
    title: "Certified Procedures",
    description: "Maintenance actions aligned with OEM documentation and authority-approved programs.",
    icon: ShieldCheck,
  },
  {
    title: "Rapid Turnaround",
    description: "Planning and execution designed to reduce downtime and return aircraft to service faster.",
    icon: TimerReset,
  },
  {
    title: "Predictive Oversight",
    description: "Technical forecasting and lifecycle monitoring to prevent costly unscheduled interruptions.",
    icon: Wrench,
  },
];

export default function MROFoundationSection() {
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14 lg:px-8">
        <div className="space-y-7">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#111a5a]/72">
              Operational Integrity
            </p>
            <h2
              className={`${playfairDisplay.className} mt-3 text-3xl font-medium leading-[1.12] tracking-[-0.02em] text-[#111a5a] sm:text-4xl lg:text-[2.8rem]`}
            >
              The Foundation of Safe Travel
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-[#111a5a]/74">
            Our MRO framework is built on strict process control, transparent reporting, and engineering precision.
            Every check, repair, and overhaul is executed to elevate safety and long-term reliability.
          </p>

          <div className="space-y-3">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-xl border border-[#111a5a]/12 bg-[#f8faff] p-4 shadow-[0_10px_22px_rgba(17,26,90,0.08)]"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[linear-gradient(90deg,rgba(17,26,90,0.10)_0%,rgba(10,110,164,0.10)_100%)] text-[#111a5a]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-[#111a5a]">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#111a5a]/70">{item.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <figure className="relative isolate mx-auto w-full max-w-[32rem] overflow-hidden rounded-2xl border border-[#111a5a]/14 shadow-[0_22px_46px_rgba(17,26,90,0.14)]">
          <div className="relative aspect-[4/5] min-h-[420px]">
            <Image
              src="/assets/images/Mro_Portraid_final.png"
              alt="Aircraft interior inspected for safety standards"
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/56 via-black/10 to-transparent" />
          </div>
          <figcaption className="absolute bottom-4 right-4 rounded-lg border border-white/32 bg-white/14 px-4 py-3 text-white shadow-[0_10px_30px_rgba(0,0,0,0.32)] backdrop-blur-xl">
            <p className="text-3xl font-semibold leading-none text-[#00bcff]">99.6%</p>
            <p className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/84">
              On-Time Completion
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

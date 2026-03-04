import Image from "next/image";
import { ShieldCheck, LineChart } from "lucide-react";
import { playfairDisplay } from "@/lib/fonts";

const standards = [
  {
    title: "Global Regulatory Compliance",
    description: "Navigating international airspace regulations and audit standards with complete operational clarity.",
    icon: ShieldCheck,
  },
  {
    title: "Real-time Financial Reporting",
    description: "Transparent accounting with structured monthly reporting and cost-control visibility for owners.",
    icon: LineChart,
  },
];

export default function AircraftManagementStandardsSection() {
  return (
    <section className="bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] lg:gap-16 lg:px-8">
        <div className="max-w-[38rem] space-y-7">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#00bcff]">
              The Midline Advantage
            </p>
            <h2
              className={`${playfairDisplay.className} mt-3 max-w-[30rem] text-4xl font-medium leading-[1.02] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.15rem]`}
            >
              Setting New Standards in{" "}
              <span className="font-light italic text-[#c8d7ff]">Operational Excellence</span>
            </h2>
          </div>

          <p className="max-w-[33rem] text-base leading-relaxed text-[#dfe8ff]/74">
            We provide industry-leading management solutions focused on safety, compliance, and efficiency. Your
            aircraft is managed by veteran aviation professionals who treat your asset with precision at every step.
          </p>

          <div className="space-y-4">
            {standards.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="max-w-[32rem] rounded-xl border border-white/16 bg-white/8 p-4 shadow-[0_14px_28px_rgba(0,0,0,0.2)] backdrop-blur-xl"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#00bcff]/14 text-[#00bcff]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-[0.82rem] leading-relaxed text-[#dfe8ff]/68">{item.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <figure className="relative isolate mx-auto w-full max-w-[30rem] overflow-hidden rounded-2xl border border-[#00bcff]/26 shadow-[0_24px_46px_rgba(0,0,0,0.35)]">
          <div className="relative aspect-[4/5] min-h-[420px]">
            <Image
              src="/assets/images/fleet/fleet-hero.jpg"
              alt="Managed business jet on the runway"
              fill
              sizes="(max-width: 1024px) 100vw, 460px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/18 to-transparent" />
          </div>
          <figcaption className="absolute bottom-4 right-4 rounded-lg border border-white/26 bg-white/12 px-4 py-3 text-white shadow-[0_10px_30px_rgba(0,0,0,0.32)] backdrop-blur-xl">
            <p className="text-3xl font-semibold leading-none text-[#00bcff]">99.8%</p>
            <p className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/85">
              Dispatch Reliability
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

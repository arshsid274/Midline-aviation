import { Globe, ShieldCheck, SlidersHorizontal } from "lucide-react";
import Reveal from "@/app/components/motion/Reveal";

const advantages = [
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "An interconnected logistics network spanning over 180 destinations across six continents — ensuring your cargo moves without borders.",
    points: ["Multi-hub routing", "Regional partner network", "Customs clearance support"],
    featured: false,
  },
  {
    icon: ShieldCheck,
    title: "Unmatched Security",
    description:
      "Industry-leading cargo security protocols from point of origin to final delivery. Full chain-of-custody tracking and tamper-evident packaging.",
    points: ["End-to-end chain of custody", "24/7 real-time tracking", "Certified secure handling"],
    featured: true,
  },
  {
    icon: SlidersHorizontal,
    title: "Customized Solutions",
    description:
      "Bespoke logistics configurations designed around your cargo type, timeline, and compliance requirements. No two shipments are the same.",
    points: ["Temperature-sensitive cargo", "Oversized & heavy lift", "Hazmat certified handling"],
    featured: false,
  },
];

export default function CargoWhyChooseSection() {
  return (
    <section className="bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal as="div" variant="fade-up" className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#00bcff]">Core Advantages</p>
          <h2
            className="font-display mt-3 text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.6rem]"
          >
            Why Choose Midline Cargo?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#dfe8ff]/74 sm:text-base">
            Built on decades of aviation expertise, our cargo division delivers reliability, security, and precision on
            every route we operate.
          </p>
        </Reveal>

        {/* Cards grid */}
        <Reveal as="div" variant="stagger" stagger={0.12} className="grid gap-5 md:grid-cols-3">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                data-reveal-item
                className={`relative overflow-hidden rounded-2xl border p-6 shadow-[0_18px_34px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-colors ${
                  item.featured
                    ? "border-[#00bcff]/38 bg-[#00bcff]/12 hover:bg-[#00bcff]/18"
                    : "border-white/14 bg-white/7 hover:bg-white/12"
                }`}
              >
                {item.featured && (
                  <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: "radial-gradient(ellipse at 50% 0%, #00bcff 0%, transparent 70%)"
                  }} />
                )}

                <span
                  className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                    item.featured ? "bg-[#00bcff]/22 text-[#00bcff]" : "bg-white/10 text-[#00bcff]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="relative mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-[#dfe8ff]/72">{item.description}</p>

                <ul className="relative mt-5 space-y-2.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#e8efff]/86">
                      <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00bcff]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {item.featured && (
                  <div className="relative mt-6 border-t border-[#00bcff]/22 pt-4">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#00bcff]/80">
                      Industry-leading standard
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

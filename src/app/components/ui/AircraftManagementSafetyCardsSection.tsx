import { Shield, Wallet, Wrench, CheckCircle2 } from "lucide-react";
import { playfairDisplay } from "@/lib/fonts";

interface SafetyCard {
  title: string;
  description: string;
  points: string[];
  icon: typeof Shield;
}

const cards: SafetyCard[] = [
  {
    title: "Safety & Compliance",
    description:
      "Rigorous adherence to international standards with active monitoring and systems that exceed baseline requirements.",
    points: ["24/7 safety hotline", "Fatigue risk management", "Annual third-party audits"],
    icon: Shield,
  },
  {
    title: "Cost Efficiency",
    description:
      "Optimized operating costs through strategic vendor relationships and fleet-level programs across markets.",
    points: ["Global fuel program", "Group insurance rates", "Vendor audit services"],
    icon: Wallet,
  },
  {
    title: "Technical Oversight",
    description:
      "Round-the-clock technical support and maintenance planning to keep every aircraft mission-ready and value-protected.",
    points: ["CAMP/CMP management", "Pre-buy inspections", "Engine program oversight"],
    icon: Wrench,
  },
];

export default function AircraftManagementSafetyCardsSection() {
  return (
    <section className="bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#00bcff]">Operational Core</p>
          <h2
            className={`${playfairDisplay.className} mt-3 text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl`}
          >
            Safety, Performance, and Technical Control
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#dfe8ff]/82 sm:text-base">
            Our management team is structured to protect every mission, every cycle, and every aircraft decision.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-[0_18px_34px_rgba(0,0,0,0.26)] backdrop-blur-xl transition-colors hover:bg-white/14"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#ecab13] text-[#016d9d]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#dfe8ff]/78">{card.description}</p>

                <ul className="mt-5 space-y-2.5">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#e8efff]/88">
                      <CheckCircle2 className="mt-[0.1rem] h-4 w-4 shrink-0 text-[#ecab13]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { ClipboardCheck, Cog, ShieldAlert } from "lucide-react";
import { playfairDisplay } from "@/lib/fonts";

const serviceCards = [
  {
    title: "Maintenance",
    description:
      "Scheduled line and base maintenance programs delivered by certified teams with strict quality controls.",
    points: ["A-check and scheduled inspections", "Defect rectification workflows", "24/7 technical coordination"],
    icon: ClipboardCheck,
  },
  {
    title: "Repair",
    description:
      "Component and systems repair with detailed traceability, approved parts sourcing, and engineering review.",
    points: ["Avionics and cabin systems", "Structural and component repairs", "Rapid AOG response planning"],
    icon: Cog,
  },
  {
    title: "Overhaul",
    description:
      "Comprehensive overhaul programs focused on lifecycle extension, performance consistency, and resale value.",
    points: ["Major periodic inspections", "Program compliance records", "Post-overhaul verification flights"],
    icon: ShieldAlert,
  },
];

export default function MROServiceCardsSection() {
  return (
    <section className="bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#00bcff]">MRO Capabilities</p>
          <h2
            className={`${playfairDisplay.className} mt-3 text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl`}
          >
            Integrated Technical Coverage
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#dfe8ff]/82 sm:text-base">
            One coordinated system for maintenance, repair, and overhaul, managed with operational precision.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-[0_18px_34px_rgba(0,0,0,0.26)] backdrop-blur-xl transition-colors hover:bg-white/14"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#00bcff]/18 text-[#00bcff]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#dfe8ff]/78">{card.description}</p>

                <ul className="mt-5 space-y-2.5">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#e8efff]/88">
                      <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-[#00bcff]" />
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

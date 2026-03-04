import { CalendarClock, ConciergeBell, Globe2, ShieldCheck, Sofa } from "lucide-react";

const reasons = [
  {
    title: "Absolute Flexibility",
    description: "Fly on your schedule, to any airport worldwide.",
    Icon: CalendarClock,
  },
  {
    title: "Refined Comfort",
    description: "Luxury interiors designed for peak relaxation.",
    Icon: Sofa,
  },
  {
    title: "Total Privacy",
    description: "Discreet handling and confidential flight manifests.",
    Icon: ShieldCheck,
  },
  {
    title: "Personalized Attention",
    description: "Your dedicated concierge for every detail.",
    Icon: ConciergeBell,
  },
  {
    title: "Global Access",
    description: "Global network of operators and crew.",
    Icon: Globe2,
  },
];

export default function WhyChooseUsComponent() {
  return (
    <section className="bg-[#f5f8ff] py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#111a5a] md:text-4xl">Why Choose Us</h2>
          <div className="mx-auto h-1 w-20 bg-[#00bcff]" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {reasons.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="group rounded-2xl border border-[#111a5a]/12 bg-white p-8 text-center shadow-[0_10px_22px_rgba(17,26,90,0.08)] transition-colors hover:border-[#00bcff]/45"
            >
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#00bcff]/14 text-[#016291] transition-transform group-hover:scale-110">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-base font-bold text-[#111a5a]">{title}</h3>
              <p className="text-sm leading-relaxed text-[#111a5a]/72">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

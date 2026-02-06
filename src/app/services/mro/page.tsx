export const dynamic = "force-static";

export const metadata = {
  title: "Aircraft MRO Services",
  description:
    "Comprehensive aircraft maintenance, repair, and overhaul services ensuring safety and compliance.",
};

export default function MROPage() {
  return (
    <main className="py-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Aircraft MRO Services
      </h1>

      <p className="text-lg mb-10">
        Our MRO services deliver high-quality aircraft maintenance,
        repair, and overhaul solutions to keep your fleet operating
        safely, efficiently, and in full regulatory compliance.
      </p>

      <section className="grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Line & Base Maintenance
          </h2>
          <p>
            Scheduled and unscheduled maintenance services performed
            by certified technicians using approved procedures.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Component Repair
          </h2>
          <p>
            Specialized repair and overhaul of aircraft components
            to ensure performance, safety, and longevity.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Regulatory Compliance
          </h2>
          <p>
            Full compliance with aviation authority requirements,
            documentation, audits, and safety management systems.
          </p>
        </div>
      </section>
    </main>
  );
}

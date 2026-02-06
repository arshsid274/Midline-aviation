export const dynamic = "force-static";

export const metadata = {
  title: "Aircraft Management Services",
  description:
    "Professional aircraft management services ensuring safety, compliance, and operational efficiency.",
};

export default function AircraftManagementPage() {
  return (
    <main className="py-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Aircraft Management Services
      </h1>

      <p className="text-lg mb-10">
        Our aircraft management services provide complete operational,
        technical, and regulatory support to ensure your aircraft
        operates at the highest standards of safety and efficiency.
      </p>

      <section className="grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Operational Management
          </h2>
          <p>
            Crew management, flight planning, and daily operations
            handled by experienced aviation professionals.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Regulatory Compliance
          </h2>
          <p>
            Full compliance with international aviation regulations,
            audits, and safety management systems.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Maintenance Oversight
          </h2>
          <p>
            Scheduled and unscheduled maintenance coordination to
            preserve aircraft value and reliability.
          </p>
        </div>
      </section>
    </main>
  );
}

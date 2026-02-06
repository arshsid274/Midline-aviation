export const dynamic = "force-static";

export const metadata = {
  title: "Air Cargo Transport Services",
  description:
    "Reliable and efficient air cargo transport solutions for time-critical and high-value shipments.",
};

export default function CargoTransportPage() {
  return (
    <main className="py-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Air Cargo Transport Services
      </h1>

      <p className="text-lg mb-10">
        Our air cargo transport services are designed to handle
        time-sensitive, oversized, and high-value shipments with
        precision, safety, and global reach.
      </p>

      <section className="grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            General & Express Cargo
          </h2>
          <p>
            Fast and dependable air freight solutions for commercial
            goods, urgent deliveries, and express shipments.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Special Cargo Handling
          </h2>
          <p>
            Expertise in transporting oversized, hazardous,
            temperature-sensitive, and valuable cargo.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Global Logistics Network
          </h2>
          <p>
            Worldwide cargo coverage supported by trusted partners
            and efficient ground handling coordination.
          </p>
        </div>
      </section>
    </main>
  );
}

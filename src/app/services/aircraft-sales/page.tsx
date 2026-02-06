export const dynamic = "force-static";

export const metadata = {
  title: "Aircraft Sales & Acquisition",
  description:
    "Expert aircraft sales and acquisition services for private and business aviation.",
};

export default function AircraftSalesPage() {
  return (
    <main className="py-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Aircraft Sales & Acquisition
      </h1>

      <p className="text-lg mb-10">
        We provide end-to-end aircraft sales and acquisition services,
        guiding clients through every stage of the buying and selling
        process with transparency and expertise.
      </p>

      <section className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Aircraft Acquisition
          </h2>
          <p>
            From market analysis to negotiations and delivery,
            we help clients acquire the right aircraft that
            meets their mission requirements.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Aircraft Sales
          </h2>
          <p>
            Comprehensive marketing, valuation, and sales strategies
            to ensure maximum value and a smooth transaction.
          </p>
        </div>
      </section>
    </main>
  );
}

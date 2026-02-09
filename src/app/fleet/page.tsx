export const dynamic = "force-static";

export const metadata = {
  title: "Our Fleet",
  description: "Explore our modern fleet of private jets designed for luxury and performance.",
};

const fleetClasses = [
  {
    title: "Long-Range Jets",
    description: "Perfect for intercontinental flights with spacious cabins and premium comfort.",
  },
  {
    title: "Super-Mid Jets",
    description: "Balanced performance and luxury for regional and medium-haul journeys.",
  },
  {
    title: "Light Jets",
    description: "Agile and efficient aircraft for short business trips and quick turnarounds.",
  },
];

export default function FleetPage() {
  return (
    <main className="bg-slate-950/35 py-10 sm:py-12 md:py-16">
      <div className="page-shell">
        <section className="page-hero">
          <h1 className="page-title">Our Fleet</h1>
          <p className="page-lead">
            Our fleet features state-of-the-art aircraft curated for safety, comfort, and mission flexibility.
          </p>
        </section>

        <section className="feature-grid md:grid-cols-3">
          {fleetClasses.map((item) => (
            <article key={item.title} className="feature-card">
              <h2 className="text-lg font-semibold sm:text-xl">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">{item.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

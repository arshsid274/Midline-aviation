interface ServiceFeature {
  title: string;
  description: string;
}

interface ServicePageShellProps {
  title: string;
  description: string;
  features: ServiceFeature[];
  columns?: 2 | 3;
}

const gridClassByColumnCount = {
  2: "feature-grid md:grid-cols-2",
  3: "feature-grid md:grid-cols-2 xl:grid-cols-3",
} as const;

export default function ServicePageShell({
  title,
  description,
  features,
  columns = 3,
}: ServicePageShellProps) {
  return (
    <main className="bg-slate-950/35 py-10 sm:py-12 md:py-16">
      <div className="page-shell">
        <section className="page-hero">
          <h1 className="page-title">{title}</h1>
          <p className="page-lead">{description}</p>
        </section>

        <section className={gridClassByColumnCount[columns]}>
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <h2 className="text-lg font-semibold sm:text-xl">{feature.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">{feature.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

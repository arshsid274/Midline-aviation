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
    <main className="midline-page">
      <section className="midline-section">
        <div className="midline-shell">
          <div className="rounded-3xl border border-[#111a5a]/20 bg-gradient-to-br from-[#111a5a] via-[#111f72] to-[#0a6ea4] px-6 py-10 text-white shadow-[0_20px_56px_rgba(17,26,90,0.3)] sm:px-8 md:px-10 md:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">Aviation Services</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">{title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-blue-100/90 sm:text-lg">{description}</p>
          </div>

          <section className={`${gridClassByColumnCount[columns]} mt-8 sm:mt-10`}>
            {features.map((feature) => (
              <article
                key={feature.title}
                className="midline-card h-full rounded-2xl border border-[#111a5a]/10 bg-white p-5 sm:p-6"
              >
                <h2 className="text-lg font-semibold text-[#111a5a] sm:text-xl">{feature.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#111a5a]/78 sm:text-base">{feature.description}</p>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}

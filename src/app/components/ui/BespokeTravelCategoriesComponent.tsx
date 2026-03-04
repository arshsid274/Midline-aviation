import Link from "next/link";

const categories = [
  {
    title: "Corporate Travel",
    description: "Enable your executive team to maximize productivity while traveling between international hubs.",
    image: "/assets/images/charter/charter-corporate-travel.png",
  },
  {
    title: "Leisure Journeys",
    description: "Vacation starts at the hangar. Skip the lines and arrive refreshed at your private paradise.",
    image: "/assets/images/charter/charter-leisure-journeys.png",
  },
  {
    title: "Special Occasions",
    description: "Celebrate life milestones with a personalized inflight experience that exceeds expectations.",
    image: "/assets/images/charter/charter-special-occasions.png",
  },
];

export default function BespokeTravelCategoriesComponent() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
      <h2 className="mb-12 text-center text-3xl font-bold text-[#111a5a]">Bespoke Travel Categories</h2>
      <div className="grid gap-8 lg:grid-cols-3">
        {categories.map((category) => (
          <article
            key={category.title}
            className="group relative h-[500px] overflow-hidden rounded-2xl border border-[#111a5a]/12 bg-white shadow-[0_14px_30px_rgba(17,26,90,0.1)]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url("${category.image}")` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/34 to-transparent" />
            <div className="absolute bottom-0 left-0 p-10">
              <h3 className="mb-4 text-2xl font-bold text-white">{category.title}</h3>
              <p className="mb-6 text-slate-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {category.description}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-bold text-[#00bcff] transition-colors hover:text-[#8edfff]"
              >
                Learn More
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

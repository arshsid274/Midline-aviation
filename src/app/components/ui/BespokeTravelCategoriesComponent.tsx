import Image from "next/image";
import Link from "next/link";
import Reveal from "@/app/components/motion/Reveal";

const categories = [
  {
    title: "Corporate Travel",
    description: "Enable your executive team to maximize productivity while traveling between international hubs.",
    image: "/assets/images/aircraft/g200-lifestyle.webp",
    alt: "Executives working aboard the Gulfstream G200 cabin",
  },
  {
    title: "Leisure Journeys",
    description: "Vacation starts at the hangar. Skip the lines and arrive refreshed at your private paradise.",
    image: "/assets/images/aircraft/g450-family-dining.webp",
    alt: "Family dining aboard the Gulfstream G450",
  },
  {
    title: "Special Occasions",
    description: "Celebrate life milestones with a personalized inflight experience that exceeds expectations.",
    image: "/assets/images/aircraft/g450-celebration.webp",
    alt: "Champagne celebration aboard the Gulfstream G450",
  },
];

export default function BespokeTravelCategoriesComponent() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
      <Reveal as="h2" variant="fade-up" className="mb-12 text-center text-3xl font-bold text-[#111a5a]">Bespoke Travel Categories</Reveal>
      <Reveal as="div" variant="stagger" stagger={0.1} className="grid gap-8 lg:grid-cols-3">
        {categories.map((category) => (
          <article
            key={category.title}
            data-reveal-item
            className="group relative h-[500px] overflow-hidden rounded-2xl border border-[#111a5a]/12 bg-white shadow-[0_14px_30px_rgba(17,26,90,0.1)]"
          >
            <Image
              src={category.image}
              alt={category.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
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
      </Reveal>
    </section>
  );
}

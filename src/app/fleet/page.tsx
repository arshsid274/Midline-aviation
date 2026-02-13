import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Fleet",
  description:
    "Explore Midline Aviation fleet featuring Embraer Legacy 650, Gulfstream G450, and Gulfstream G200 aircraft for luxury, safety, and performance.",
  path: "/fleet",
  keywords: ["midline fleet", "embraer legacy 650", "gulfstream g450", "gulfstream g200"],
});

const fleetClasses = [
  {
    title: "Embraer Legacy 650",
    description:
      "The flagship of luxury aviation delivers ultra-long-range performance, cutting-edge design, and unmatched speed.",
  },
  {
    title: "Gulfstream G450",
    description:
      "A long-range business jet known for advanced technology, quiet cabin comfort, and superior reliability.",
  },
  {
    title: "Gulfstream G200",
    description:
      "A versatile midsize jet offering exceptional comfort and performance for regional and medium-haul flights.",
  },
];

export default function FleetPage() {
  return (
    <main className="bg-slate-950/35 py-10 sm:py-12 md:py-16">
      <div className="page-shell">
        <section className="page-hero">
          <h1 className="page-title">Our Fleet</h1>
          <p className="page-lead">
            Excellence Above the Clouds with a curated fleet built for comfort, range, and performance.
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

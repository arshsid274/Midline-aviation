import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Midline Aviation, headquartered in Dubai, delivers award-winning private aviation services with operational precision, luxury, and global safety standards.",
  path: "/about",
  keywords: ["about midline aviation", "private aviation dubai", "luxury executive air travel"],
});

export default function AboutPage() {
  return (
    <main className="bg-slate-950/35 py-10 sm:py-12 md:py-16">
      <div className="page-shell">
        <section className="page-hero">
          <h1 className="page-title">Your Comfort, Perfected In Every Flight</h1>
          <p className="page-lead">
            Midline Aviation, headquartered in Dubai, is an award-winning private aviation provider redefining
            executive air travel. We combine meticulous operational control with personalized luxury, offering
            best-in-class trip support and unmatched reliability. Built on expert maintenance and strict global safety
            standards, we ensure every journey is seamless, efficient, and tailored to the world&apos;s most discerning
            travelers.
          </p>
        </section>

        <section className="feature-grid md:grid-cols-3">
          <article className="feature-card">
            <h2 className="text-lg font-semibold sm:text-xl">Award-Winning Service</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              We deliver private aviation experiences designed around comfort, discretion, and personalized support at
              every stage of your trip.
            </p>
          </article>

          <article className="feature-card">
            <h2 className="text-lg font-semibold sm:text-xl">Operational Precision</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              From dispatch to onboard standards, every flight is managed with strict oversight to ensure reliability,
              efficiency, and peace of mind.
            </p>
          </article>

          <article className="feature-card">
            <h2 className="text-lg font-semibold sm:text-xl">Global Safety Standards</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Expert maintenance and internationally aligned safety protocols keep every mission secure and consistently
              mission-ready.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}

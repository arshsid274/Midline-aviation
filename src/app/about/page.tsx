import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "About Midline Airlines",
  description:
    "Learn about Midline Airlines, our aviation expertise, safety culture, and commitment to premium global flight services.",
  path: "/about",
  keywords: ["about midline airlines", "aviation company", "airline safety standards"],
});

export default function AboutPage() {
  return (
    <main className="bg-slate-950/35 py-10 sm:py-12 md:py-16">
      <div className="page-shell">
        <section className="page-hero">
          <h1 className="page-title">About Midline Aviation</h1>
          <p className="page-lead">
            We deliver premium charter and aviation support with a focus on safety, reliability, and refined onboard
            service.
          </p>
        </section>

        <section className="feature-grid md:grid-cols-3">
          <article className="feature-card">
            <h2 className="text-lg font-semibold sm:text-xl">Safety First</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Our flight operations follow strict standards and continuous crew training for dependable mission
              outcomes.
            </p>
          </article>

          <article className="feature-card">
            <h2 className="text-lg font-semibold sm:text-xl">Global Reach</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              We coordinate seamless travel worldwide with tailored routing, permits, and concierge-level ground
              handling.
            </p>
          </article>

          <article className="feature-card">
            <h2 className="text-lg font-semibold sm:text-xl">Personal Service</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Every journey is designed around passenger preferences, from aircraft selection to onboard experience.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}

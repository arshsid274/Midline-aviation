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
    <main className="midline-page">
      <section className="midline-section">
        <div className="midline-shell">
          <section className="rounded-3xl border border-[#0d1451]/20 bg-gradient-to-br from-[#0d1451] via-[#111f72] to-[#0d1451] px-6 py-10 text-white shadow-[0_20px_56px_rgba(13,20,81,0.3)] sm:px-8 md:px-10 md:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">About Midline Aviation</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Your Comfort, Perfected in Every Flight
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-blue-100/90 sm:text-lg">
              Midline Aviation, headquartered in Dubai, is an award-winning private aviation provider redefining
              executive air travel. We combine meticulous operational control with personalized luxury, offering
              best-in-class trip support and unmatched reliability. Built on expert maintenance and strict global safety
              standards, we ensure every journey is seamless, efficient, and tailored to the world&apos;s most
              discerning travelers.
            </p>
          </section>

          <section className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            <article className="midline-card rounded-2xl p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-[#0d1451] sm:text-xl">Award-Winning Service</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#0d1451]/78 sm:text-base">
                We deliver private aviation experiences designed around comfort, discretion, and personalized support at
                every stage of your trip.
              </p>
            </article>

            <article className="midline-card rounded-2xl p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-[#0d1451] sm:text-xl">Operational Precision</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#0d1451]/78 sm:text-base">
                From dispatch to onboard standards, every flight is managed with strict oversight to ensure reliability,
                efficiency, and peace of mind.
              </p>
            </article>

            <article className="midline-card rounded-2xl p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-[#0d1451] sm:text-xl">Global Safety Standards</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#0d1451]/78 sm:text-base">
                Expert maintenance and internationally aligned safety protocols keep every mission secure and
                consistently mission-ready.
              </p>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}

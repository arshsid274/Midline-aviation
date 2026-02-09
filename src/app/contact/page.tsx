import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Midline Airlines",
  description:
    "Contact Midline Airlines for private jet charter, aircraft management, sales, and operational support inquiries.",
  path: "/contact",
  keywords: ["contact midline airlines", "aviation inquiries", "charter support"],
});

export default function ContactPage() {
  return (
    <main className="bg-slate-950/35 py-10 sm:py-12 md:py-16">
      <div className="page-shell">
        <section className="page-hero">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-lead">
            Speak directly with our charter and operations team. We will respond quickly with a tailored solution.
          </p>
        </section>

        <section className="feature-grid md:grid-cols-2">
          <article className="feature-card">
            <h2 className="text-lg font-semibold sm:text-xl">General Inquiries</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Email:{" "}
              <a className="text-foreground underline-offset-4 hover:underline" href="mailto:info@midline-aviation.com">
                info@midline-aviation.com
              </a>
            </p>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Phone:{" "}
              <a className="text-foreground underline-offset-4 hover:underline" href="tel:+97140000000">
                +971 4 000 0000
              </a>
            </p>
          </article>

          <article className="feature-card">
            <h2 className="text-lg font-semibold sm:text-xl">Operations Desk</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Available 24/7 for schedule requests, route support, and urgent mission coordination.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}

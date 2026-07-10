import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo";
import MROComingSoon from "@/app/components/ui/MROComingSoon";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Aircraft MRO Services — Coming Soon",
  description:
    "Midline Aviation's certified MRO facility is launching soon — world-class maintenance, repair, and overhaul under strict aviation safety standards. Get notified at launch.",
  path: "/services/mro",
  keywords: ["aircraft MRO services", "aircraft maintenance", "aviation repair and overhaul"],
  ogImage: "/assets/og/og-mro.jpg",
});

const serviceSchema = buildServiceSchema({
  name: "Aircraft MRO Services",
  serviceType: "Aircraft Maintenance, Repair & Overhaul",
  description:
    "Certified MRO services launching soon — world-class maintenance, repair, and overhaul under strict aviation safety standards.",
  path: "/services/mro",
  images: ["/assets/og/og-mro.jpg"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "MRO Services", path: "/services/mro" },
]);

export default function MROPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="midline-page">
        <MROComingSoon />
      </main>
    </>
  );
}

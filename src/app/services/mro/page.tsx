import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo";
import MROHeroSection from "@/app/components/ui/MROHeroSection";
import MROFoundationSection from "@/app/components/ui/MROFoundationSection";
import MROServiceCardsSection from "@/app/components/ui/MROServiceCardsSection";
import MROOptimizeFleetSection from "@/app/components/ui/MROOptimizeFleetSection";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Aircraft MRO Services",
  description:
    "Certified MRO services delivering world-class maintenance solutions under strict aviation safety standards.",
  path: "/services/mro",
  keywords: ["aircraft MRO services", "aircraft maintenance", "aviation repair and overhaul"],
  ogImage: "/assets/og/og-mro.jpg",
});

const serviceSchema = buildServiceSchema({
  name: "Aircraft MRO Services",
  serviceType: "Aircraft Maintenance, Repair & Overhaul",
  description:
    "Certified MRO services delivering world-class maintenance solutions under strict aviation safety standards.",
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
        <MROHeroSection />
        <MROFoundationSection />
        <MROServiceCardsSection />
        <MROOptimizeFleetSection />
      </main>
    </>
  );
}

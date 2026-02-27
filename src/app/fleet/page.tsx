import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import FleetAircraftComparisonSection from "@/app/components/ui/FleetAircraftComparisonSection";
import FleetExceptionalHero from "@/app/components/ui/FleetExceptionalHero";
import FleetInteriorGallerySection from "@/app/components/ui/FleetInteriorGallerySection";
import ServicesMissionShowcase from "@/app/components/ui/ServicesMissionShowcase";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Fleet",
  description:
    "Explore Midline Aviation fleet featuring Embraer Legacy 650, Gulfstream G450, and Gulfstream G200 aircraft for luxury, safety, and performance.",
  path: "/fleet",
  keywords: ["midline fleet", "embraer legacy 650", "gulfstream g450", "gulfstream g200"],
});

export default function FleetPage() {
  return (
    <main className="midline-page">
      <FleetExceptionalHero />

      <FleetAircraftComparisonSection />

      <ServicesMissionShowcase />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <FleetInteriorGallerySection />
      </div>
    </main>
  );
}

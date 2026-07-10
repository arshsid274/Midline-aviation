import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo";
import AircraftManagementHeroSection from "@/app/components/ui/AircraftManagementHeroSection";
import AircraftManagementStandardsSection from "@/app/components/ui/AircraftManagementStandardsSection";
import AircraftManagementSafetyCardsSection from "@/app/components/ui/AircraftManagementSafetyCardsSection";
import AircraftManagementFleetSection from "@/app/components/ui/AircraftManagementFleetSection";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Aircraft Management Services",
  description:
    "Comprehensive aircraft management covering operations, crew, maintenance, and scheduling for safe and efficient performance.",
  path: "/services/aircraft-management",
  keywords: ["aircraft management services", "fleet operations support", "aviation compliance"],
  ogImage: "/assets/og/og-management.jpg",
});

const serviceSchema = buildServiceSchema({
  name: "Aircraft Management Services",
  serviceType: "Aircraft Management",
  description:
    "Comprehensive aircraft management covering operations, crew, maintenance, and scheduling for safe and efficient performance.",
  path: "/services/aircraft-management",
  images: ["/assets/og/og-management.jpg"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Aircraft Management", path: "/services/aircraft-management" },
]);

export default function AircraftManagementPage() {
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
        <AircraftManagementHeroSection />
        <AircraftManagementStandardsSection />
        <AircraftManagementSafetyCardsSection />
        <AircraftManagementFleetSection />
      </main>
    </>
  );
}

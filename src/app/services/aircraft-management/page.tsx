import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
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
});

export default function AircraftManagementPage() {
  return (
    <main className="midline-page">
      <AircraftManagementHeroSection />
      <AircraftManagementStandardsSection />
      <AircraftManagementSafetyCardsSection />
      <AircraftManagementFleetSection />
    </main>
  );
}

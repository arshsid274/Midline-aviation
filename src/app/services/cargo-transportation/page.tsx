import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import CargoHeroSection from "@/app/components/ui/CargoHeroSection";
import CargoWhyChooseSection from "@/app/components/ui/CargoWhyChooseSection";
import CargoCapabilitiesSection from "@/app/components/ui/CargoCapabilitiesSection";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Air Cargo Transportation Services",
  description:
    "Reliable and secure cargo transportation services with rapid delivery, tracking, and global coverage.",
  path: "/services/cargo-transportation",
  keywords: ["air cargo transportation", "express air freight", "special cargo handling"],
});

export default function CargoTransportPage() {
  return (
    <main>
      <CargoHeroSection />
      <CargoWhyChooseSection />
      <CargoCapabilitiesSection />
    </main>
  );
}

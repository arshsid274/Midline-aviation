import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo";
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
  ogImage: "/assets/og/og-cargo.jpg",
});

const serviceSchema = buildServiceSchema({
  name: "Air Cargo Transportation Services",
  serviceType: "Air Cargo Transportation",
  description:
    "Reliable and secure cargo transportation services with rapid delivery, tracking, and global coverage.",
  path: "/services/cargo-transportation",
  images: ["/assets/og/og-cargo.jpg"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Cargo Transportation", path: "/services/cargo-transportation" },
]);

export default function CargoTransportPage() {
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
      <main>
        <CargoHeroSection />
        <CargoWhyChooseSection />
        <CargoCapabilitiesSection />
      </main>
    </>
  );
}

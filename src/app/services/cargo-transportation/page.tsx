import ServicePageShell from "@/app/components/ui/ServicePageShell";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

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
    <ServicePageShell
      title="Air Cargo Transport Services"
      description="Midline Aviation provides secure air cargo transportation for time-critical and high-value goods."
      columns={3}
      features={[
        {
          title: "General & Express Cargo",
          description: "Reliable air freight options for commercial shipments and urgent time-sensitive deliveries.",
        },
        {
          title: "Special Cargo Handling",
          description:
            "Support for hazardous, oversized, and temperature-sensitive cargo with strict handling protocols.",
        },
        {
          title: "Global Logistics Network",
          description: "Worldwide coverage through trusted partners and coordinated end-to-end ground operations.",
        },
      ]}
    />
  );
}

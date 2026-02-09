import ServicePageShell from "@/app/components/ui/ServicePageShell";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Air Cargo Transportation Services",
  description:
    "Reliable and efficient air cargo transportation services from Midline Airlines for urgent and high-value shipments.",
  path: "/services/cargo-transportation",
  keywords: ["air cargo transportation", "express air freight", "special cargo handling"],
});

export default function CargoTransportPage() {
  return (
    <ServicePageShell
      title="Air Cargo Transport Services"
      description="Purpose-built cargo operations for urgent, oversized, and high-value shipments across global lanes."
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

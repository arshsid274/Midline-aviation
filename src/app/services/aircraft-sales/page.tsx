import ServicePageShell from "@/app/components/ui/ServicePageShell";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Aircraft Sales and Acquisition",
  description:
    "Expert aircraft sales and acquisition services by Midline Airlines for private and business aviation clients.",
  path: "/services/aircraft-sales",
  keywords: ["aircraft sales", "aircraft acquisition", "business aviation brokerage"],
});

export default function AircraftSalesPage() {
  return (
    <ServicePageShell
      title="Aircraft Sales & Acquisition"
      description="End-to-end advisory for buying and selling aircraft with transparent strategy and deal execution."
      columns={2}
      features={[
        {
          title: "Aircraft Acquisition",
          description:
            "From market evaluation to negotiations and delivery, we secure aircraft aligned to your mission profile.",
        },
        {
          title: "Aircraft Sales",
          description:
            "Targeted marketing, valuation guidance, and transaction support designed to maximize asset value.",
        },
      ]}
    />
  );
}

import ServicePageShell from "@/app/components/ui/ServicePageShell";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Aircraft Sales and Acquisition",
  description:
    "Expert aircraft sales and acquisition guidance with transparent advisory and global market insight.",
  path: "/services/aircraft-sales",
  keywords: ["aircraft sales", "aircraft acquisition", "business aviation brokerage"],
});

export default function AircraftSalesPage() {
  return (
    <ServicePageShell
      title="Aircraft Sales & Acquisition"
      description="Whether you are acquiring or selling an aircraft, our team secures the best value and outcome."
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

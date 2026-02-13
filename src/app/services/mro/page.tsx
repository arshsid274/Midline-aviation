import ServicePageShell from "@/app/components/ui/ServicePageShell";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Aircraft MRO Services",
  description:
    "Certified MRO services delivering world-class maintenance solutions under strict aviation safety standards.",
  path: "/services/mro",
  keywords: ["aircraft MRO services", "aircraft maintenance", "aviation repair and overhaul"],
});

export default function MROPage() {
  return (
    <ServicePageShell
      title="Aircraft MRO Services"
      description="Our certified engineers keep your aircraft in optimal condition and ready to fly anytime."
      columns={3}
      features={[
        {
          title: "Line & Base Maintenance",
          description: "Certified technicians deliver scheduled and unscheduled maintenance using approved procedures.",
        },
        {
          title: "Component Repair",
          description: "Specialized repair and overhaul programs designed for long-term reliability and performance.",
        },
        {
          title: "Regulatory Compliance",
          description: "Structured documentation and audit readiness aligned with aviation authority requirements.",
        },
      ]}
    />
  );
}

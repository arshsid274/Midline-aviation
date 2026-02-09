import ServicePageShell from "@/app/components/ui/ServicePageShell";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Aircraft Management Services",
  description:
    "Professional aircraft management services from Midline Airlines ensuring safety, compliance, and operational efficiency.",
  path: "/services/aircraft-management",
  keywords: ["aircraft management services", "fleet operations support", "aviation compliance"],
});

export default function AircraftManagementPage() {
  return (
    <ServicePageShell
      title="Aircraft Management Services"
      description="Comprehensive operational, technical, and regulatory support to keep your aircraft mission-ready."
      columns={3}
      features={[
        {
          title: "Operational Management",
          description: "Crew planning, dispatch support, and mission control delivered by experienced aviation teams.",
        },
        {
          title: "Regulatory Compliance",
          description: "End-to-end oversight of audits, documentation, and international aviation requirements.",
        },
        {
          title: "Maintenance Oversight",
          description: "Proactive planning for scheduled and unscheduled maintenance to preserve aircraft value.",
        },
      ]}
    />
  );
}

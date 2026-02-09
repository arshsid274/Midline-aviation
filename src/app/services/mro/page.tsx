import ServicePageShell from "@/app/components/ui/ServicePageShell";

export const dynamic = "force-static";

export const metadata = {
  title: "Aircraft MRO Services",
  description: "Comprehensive aircraft maintenance, repair, and overhaul services ensuring safety and compliance.",
};

export default function MROPage() {
  return (
    <ServicePageShell
      title="Aircraft MRO Services"
      description="High-quality maintenance, repair, and overhaul programs to keep your fleet compliant and efficient."
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

import ServicePageShell from "@/app/components/ui/ServicePageShell";

export const dynamic = "force-static";

export const metadata = {
  title: "Private Jet Charter",
  description: "Flexible private jet charter services with worldwide coverage.",
};

export default function CharterPage() {
  return (
    <ServicePageShell
      title="Private Jet Charter"
      description="On-demand private jet charter tailored for business leaders, families, and time-critical travel."
      columns={3}
      features={[
        {
          title: "On-Demand Scheduling",
          description: "Fly when you need with flexible departure windows and rapid trip planning support.",
        },
        {
          title: "Global Route Access",
          description: "Reach major and secondary airports worldwide through trusted operational partnerships.",
        },
        {
          title: "Cabin Personalization",
          description: "Enjoy customized catering, comfort preferences, and concierge-grade in-flight service.",
        },
      ]}
    />
  );
}

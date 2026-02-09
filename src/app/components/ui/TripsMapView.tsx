"use client";

import FlightMarketplaceHero from "@/app/components/ui/FlightMarketplaceHero";
import ServicesMissionShowcase from "@/app/components/ui/ServicesMissionShowcase";

export default function TripsMapView() {
  return (
    <section className="overflow-hidden">
      <FlightMarketplaceHero />
      <ServicesMissionShowcase />
    </section>
  );
}

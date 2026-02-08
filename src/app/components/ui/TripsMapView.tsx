"use client";
import { useState, useEffect } from "react";
import FlightMarketplaceHero from "@/app/components/ui/FlightMarketplaceHero";
import { WorldMap } from "@/app/components/ui/WorldMap";
import { JET_DATA } from "@/app/components/ui/FlightMarketplaceHero";

export default function TripsMapView() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentRoute = [{
    start: { lat: JET_DATA[currentIndex].lat1, lng: JET_DATA[currentIndex].lng1 },
    end: { lat: JET_DATA[currentIndex].lat2, lng: JET_DATA[currentIndex].lng2 }
  }];

  return (
    <section className="bg-blue  overflow-hidden">
      <FlightMarketplaceHero  />
      
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import TripsMapView from "@/app/components/ui/TripsMapView";
import MidlineAirlinesLoader from "@/app/components/ui/MidlineAirlinesLoader";
import HeroScrollVideo from "@/app/components/ui/HeroScrollVideo";
import { VideoProvider } from "@/app/components/ui/VideoContext";
import ServicesShowcase from "@/app/components/ui/ServiceShowcase";
import ServiceMissionShowcase from "@/app/components/ui/ServicesMissionShowcase";
import LogoLoopSection from "@/app/components/ui/LogoLoopSection";
import PopularDestinationsCarousel from "@/app/components/ui/PopularDestinationsCarousel";
import HomeAircraftCards from "@/app/components/ui/HomeAircraftCards";

export default function HomePageClient() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const body = document.body;

    if (loadingComplete) {
      body.classList.remove("home-loader-active");
      body.classList.add("home-loader-complete");
    } else {
      body.classList.add("home-loader-active");
      body.classList.remove("home-loader-complete");
    }

    return () => {
      body.classList.remove("home-loader-active");
      body.classList.remove("home-loader-complete");
    };
  }, [loadingComplete]);

  return (
    <VideoProvider>
      <main aria-busy={!loadingComplete} className="relative z-[1] bg-black">
        <HeroScrollVideo revealText={loadingComplete} />
        <ServicesShowcase />
        
        <PopularDestinationsCarousel />
        <TripsMapView />
        <LogoLoopSection />
        <HomeAircraftCards />
        <ServiceMissionShowcase />
      </main>

      <noscript>
        <style>{`[data-home-loader="true"] { display: none !important; }`}</style>
      </noscript>

      {!loadingComplete && (
        <MidlineAirlinesLoader onLoadingComplete={() => setLoadingComplete(true)} />
      )}
    </VideoProvider>
  );
}

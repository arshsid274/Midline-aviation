"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import MidlineAirlinesLoader from "@/app/components/ui/MidlineAirlinesLoader";
import HeroScrollVideo from "@/app/components/ui/HeroScrollVideo";
import HeroBookingForm from "@/app/components/ui/HeroBookingForm";
import { VideoProvider } from "@/app/components/ui/VideoContext";
import HomeFooter from "@/app/components/ui/HomeFooter";

const ServicesShowcase = dynamic(() => import("@/app/components/ui/ServiceShowcase"), {
  loading: () => null,
});
const PopularDestinationsCarousel = dynamic(
  () => import("@/app/components/ui/PopularDestinationsCarousel"),
  {
    loading: () => null,
  }
);
const TripsMapView = dynamic(() => import("@/app/components/ui/TripsMapView"), {
  loading: () => null,
});
const LogoLoopSection = dynamic(() => import("@/app/components/ui/LogoLoopSection"), {
  loading: () => null,
});
const HomeAircraftCards = dynamic(() => import("@/app/components/ui/HomeAircraftCards"), {
  loading: () => null,
});
const ServiceMissionShowcase = dynamic(() => import("@/app/components/ui/ServicesMissionShowcase"), {
  loading: () => null,
});

export default function HomePageClient() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const body = document.body;
    body.classList.add("home-page-active");

    return () => {
      body.classList.remove("home-page-active");
    };
  }, []);

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
      <main aria-busy={!loadingComplete} className="relative z-[1] bg-white">
        <HeroScrollVideo revealText={loadingComplete} />
        <HeroBookingForm />
        <ServicesShowcase />
        <PopularDestinationsCarousel />
        <TripsMapView />
        <LogoLoopSection />
        <HomeAircraftCards />
        <ServiceMissionShowcase />
        <HomeFooter />
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

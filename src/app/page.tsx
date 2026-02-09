"use client";
import { useEffect, useState } from "react";
import TripsMapView from "@/app/components/ui/TripsMapView";
import MidlineAirlinesLoader from "@/app/components/ui/MidlineAirlinesLoader";
import HeroScrollVideo from "@/app/components/ui/HeroScrollVideo";
import { VideoProvider } from "@/app/components/ui/VideoContext";

export default function HomePage() {
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
      <main className="relative z-[1] bg-black">
        <HeroScrollVideo revealText={loadingComplete} />
        {loadingComplete && <TripsMapView />}
      </main>

      {!loadingComplete && (
        <MidlineAirlinesLoader onLoadingComplete={() => setLoadingComplete(true)} />
      )}
    </VideoProvider>
  );
}

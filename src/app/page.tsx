// src/app/page.tsx
import HeroScrollVideo from "@/app/components/ui/HeroScrollVideo";
import { Metadata } from "next";
import FlightMarketplaceHero from "@/app/components/ui/FlightMarketplaceHero";



export const metadata: Metadata = {
  title: "Elite Aviation Services | Private Jet Charter & Management",
  description: "Experience the pinnacle of aviation. From aircraft management to global charters, we define luxury travel.",
};



const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};
export default function HomePage() {
  return (
    <main>
      {/* This component handles the GSAP magic */}
      <HeroScrollVideo />
      
      {/* Content below to allow for scrolling */}
      <div> </div>
      <FlightMarketplaceHero/>
    </main>
  );
}
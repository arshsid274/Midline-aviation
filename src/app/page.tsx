// src/app/page.tsx
import HeroScrollVideo from "@/app/components/ui/HeroScrollVideo";
import { Metadata } from "next";


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
      <section className="h-screen bg-white p-20">
        <h2 className="text-4xl font-bold text-black">Our Fleet</h2>
        <p className="mt-4 text-gray-600">Discover our range of luxury aircraft...</p>
      </section>
    </main>
  );
}
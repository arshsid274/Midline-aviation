import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import AircraftCharterHeroComponent from "@/app/components/ui/AircraftCharterHeroComponent";
import OurPhilosophyComponent from "@/app/components/ui/OurPhilosophyComponent";
import CharterStepsComponent from "@/app/components/ui/CharterStepsComponent";
import WhyChooseUsComponent from "@/app/components/ui/WhyChooseUsComponent";
import BespokeTravelCategoriesComponent from "@/app/components/ui/BespokeTravelCategoriesComponent";
import JourneyStartsHereComponent from "@/app/components/ui/JourneyStartsHereComponent";
import ClientTestimonialsComponent from "@/app/components/ui/ClientTestimonialsComponent";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Private Jet Charter Services",
  description:
    "Experience personalized private jet charter designed for comfort, flexibility, and privacy with Midline Aviation.",
  path: "/services/aircraft-charter",
  keywords: ["private jet charter services", "on-demand charter flights", "business jet charter"],
});

export default function CharterPage() {
  return (
    <main className="midline-page bg-white">
      <AircraftCharterHeroComponent />
      <OurPhilosophyComponent />
      <CharterStepsComponent />
      <WhyChooseUsComponent />
      <BespokeTravelCategoriesComponent />
      
      <ClientTestimonialsComponent />
    </main>
  );
}

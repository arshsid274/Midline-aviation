import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import MROHeroSection from "@/app/components/ui/MROHeroSection";
import MROFoundationSection from "@/app/components/ui/MROFoundationSection";
import MROServiceCardsSection from "@/app/components/ui/MROServiceCardsSection";
import MROOptimizeFleetSection from "@/app/components/ui/MROOptimizeFleetSection";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Aircraft MRO Services",
  description:
    "Certified MRO services delivering world-class maintenance solutions under strict aviation safety standards.",
  path: "/services/mro",
  keywords: ["aircraft MRO services", "aircraft maintenance", "aviation repair and overhaul"],
});

export default function MROPage() {
  return (
    <main className="midline-page">
      <MROHeroSection />
      <MROFoundationSection />
      <MROServiceCardsSection />
      <MROOptimizeFleetSection />
    </main>
  );
}

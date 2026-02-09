import type { Metadata } from "next";
import HomePageClient from "@/app/components/HomePageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Private Jet Charter, Fleet Management & Aviation Services",
  description:
    "Midline Airlines offers private jet charter, aircraft management, aircraft sales, MRO, and global cargo transportation solutions.",
  path: "/",
  keywords: ["private aviation", "charter flights", "fleet management", "aviation services"],
});

export default function HomePage() {
  return <HomePageClient />;
}

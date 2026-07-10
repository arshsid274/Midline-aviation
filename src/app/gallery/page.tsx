import type { Metadata } from "next";
import { absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import GalleryClient from "./GalleryClient";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Fleet Gallery",
  description:
    "Explore the Midline Aviation fleet in pictures — Gulfstream G450, Gulfstream G200, and Embraer Legacy 650 exteriors, cabins, and in-flight photography.",
  path: "/gallery",
  ogImage: "/assets/og/og-gallery.jpg",
  keywords: ["private jet photos", "Gulfstream G450 photos", "Gulfstream G200 cabin", "Embraer Legacy 650 interior"],
});

const gallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Midline Aviation Fleet Gallery",
  url: absoluteUrl("/gallery"),
  description:
    "Photography of the Midline Aviation private jet fleet: exteriors, cabin interiors, and in-flight moments.",
  image: [
    absoluteUrl("/assets/images/aircraft/g450-exterior.webp"),
    absoluteUrl("/assets/images/aircraft/g200-exterior.webp"),
    absoluteUrl("/assets/images/aircraft/legacy650-exterior.webp"),
  ],
};

const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Gallery", path: "/gallery" }]);

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GalleryClient />
    </>
  );
}

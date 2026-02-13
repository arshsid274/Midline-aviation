import type { Metadata } from "next";
import HomePageClient from "@/app/components/HomePageClient";
import { SITE_NAME, SITE_URL, absoluteUrl, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Private Jet Charter, Fleet Management & Aviation Services",
  description:
    "Midline Airlines offers private jet charter, aircraft management, aircraft sales, MRO, and global cargo transportation solutions.",
  path: "/",
  keywords: ["private aviation", "charter flights", "fleet management", "aviation services"],
});

const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${SITE_NAME} Home`,
  url: absoluteUrl("/"),
  description:
    "Midline Airlines offers private jet charter, aircraft management, aircraft sales, MRO, and global cargo transportation solutions.",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  about: [
    {
      "@type": "Service",
      name: "Private Jet Charter",
      url: absoluteUrl("/services/aircraft-charter"),
    },
    {
      "@type": "Service",
      name: "Aircraft Management",
      url: absoluteUrl("/services/aircraft-management"),
    },
    {
      "@type": "Service",
      name: "Aircraft Sales",
      url: absoluteUrl("/services/aircraft-sales"),
    },
    {
      "@type": "Service",
      name: "Air Cargo Transportation",
      url: absoluteUrl("/services/cargo-transportation"),
    },
    {
      "@type": "Service",
      name: "Aircraft MRO",
      url: absoluteUrl("/services/mro"),
    },
  ],
};

const servicesShowcaseSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Featured Aviation Services",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: 2,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Private Charter",
        serviceType: "Elite travel management",
        url: absoluteUrl("/services/aircraft-charter"),
        provider: {
          "@type": "Airline",
          name: SITE_NAME,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Concierge Service",
        serviceType: "VIP luxury and prestigious experience",
        url: absoluteUrl("/contact"),
        provider: {
          "@type": "Airline",
          name: SITE_NAME,
        },
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesShowcaseSchema) }}
      />
      <HomePageClient />
    </>
  );
}

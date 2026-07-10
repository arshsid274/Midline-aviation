import type { Metadata } from "next";

export const SITE_NAME = "Midline Aviation";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://midline-aviation.com";
export const DEFAULT_OG_IMAGE = "/assets/images/Midline_Airlines.png";
export const BRAND_THEME_COLOR = "#0c2450";
export const CONTACT_EMAIL = "info@midlineaviation.com";
export const CONTACT_PHONE = "+97145533430";
export const DEFAULT_LOCALE = "en_US";

export const DEFAULT_DESCRIPTION =
  "Midline Aviation is a Dubai-based private aviation provider delivering aircraft charter, management, sales, MRO, and cargo transportation with luxury, safety, and reliability.";

export const DEFAULT_KEYWORDS = [
  "Midline Aviation",
  "private jet charter",
  "aircraft management",
  "aircraft sales",
  "MRO services",
  "air cargo transportation",
  "business aviation",
  "luxury air travel",
  "Dubai private aviation",
  "executive air travel",
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

const uniqueKeywords = (keywords: string[]) =>
  Array.from(
    new Set(
      keywords
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    )
  );

type BuildPageMetadataArgs = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  /** Page-specific 1200x630 social banner (path under /public). Falls back to the brand logo. */
  ogImage?: string;
  ogImageAlt?: string;
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
}: BuildPageMetadataArgs): Metadata {
  const canonical = absoluteUrl(path);
  const mergedKeywords = uniqueKeywords([...DEFAULT_KEYWORDS, ...keywords]);
  const imageAlt = ogImageAlt ?? (ogImage === DEFAULT_OG_IMAGE ? `${SITE_NAME} logo` : title);

  return {
    title,
    description,
    category: "Aviation",
    keywords: mergedKeywords,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      images: [
        {
          url: absoluteUrl(ogImage),
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
  };
}

/** BreadcrumbList JSON-LD for nested routes (Home is prepended automatically). */
export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Service JSON-LD shared by the service pages and the per-jet charter pages. */
export function buildServiceSchema({
  name,
  serviceType,
  description,
  path,
  images = [],
  additionalProperty,
}: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  images?: string[];
  additionalProperty?: { name: string; value: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: absoluteUrl(path),
    areaServed: "Worldwide",
    provider: {
      "@type": "Airline",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(images.length ? { image: images.map((src) => absoluteUrl(src)) } : {}),
    ...(additionalProperty?.length
      ? {
          additionalProperty: additionalProperty.map((property) => ({
            "@type": "PropertyValue",
            name: property.name,
            value: property.value,
          })),
        }
      : {}),
  };
}

import type { Metadata } from "next";

export const SITE_NAME = "Midline Airlines";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://midline-aviation.com";
export const DEFAULT_OG_IMAGE = "/assets/images/Midline_Airlines.png";

export const DEFAULT_DESCRIPTION =
  "Midline Airlines provides private jet charter, aircraft management, aircraft sales, MRO, and air cargo transportation services worldwide.";

export const DEFAULT_KEYWORDS = [
  "Midline Airlines",
  "private jet charter",
  "aircraft management",
  "aircraft sales",
  "MRO services",
  "air cargo transportation",
  "business aviation",
  "luxury air travel",
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

type BuildPageMetadataArgs = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: BuildPageMetadataArgs): Metadata {
  const canonical = absoluteUrl(path);
  const mergedKeywords = [...DEFAULT_KEYWORDS, ...keywords];

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        {
          url: absoluteUrl(DEFAULT_OG_IMAGE),
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
  };
}

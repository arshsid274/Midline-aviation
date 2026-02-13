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
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: BuildPageMetadataArgs): Metadata {
  const canonical = absoluteUrl(path);
  const mergedKeywords = uniqueKeywords([...DEFAULT_KEYWORDS, ...keywords]);

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

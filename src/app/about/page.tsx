import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import ContactLeadershipSection from "@/app/components/ui/ContactLeadershipSection";
import ContactLegacyStorySection from "@/app/components/ui/ContactLegacyStorySection";
import ContactSustainabilityInnovationSection from "@/app/components/ui/ContactSustainabilityInnovationSection";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Midline Aviation, headquartered in Dubai, delivers award-winning private aviation services with operational precision, luxury, and global safety standards.",
  path: "/about",
  keywords: ["about midline aviation", "private aviation dubai", "luxury executive air travel"],
  ogImage: "/assets/og/og-about.jpg",
});

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Midline Aviation",
  url: absoluteUrl("/about"),
  mainEntity: {
    "@type": "Airline",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([{ name: "About Us", path: "/about" }]);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="midline-page py-10 sm:py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <ContactLegacyStorySection />
          <ContactSustainabilityInnovationSection />
          <ContactLeadershipSection />
        </div>
      </main>
    </>
  );
}

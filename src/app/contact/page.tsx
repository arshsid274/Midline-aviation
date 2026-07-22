import type { Metadata } from "next";
import { absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import ContactInquiryForm from "@/app/components/ui/ContactInquiryForm";
import Reveal from "@/app/components/motion/Reveal";
import SplitHeading from "@/app/components/motion/SplitHeading";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Midline Aviation",
  description:
    "Contact Midline Aviation customer service in Dubai for charter, management, sales, MRO, and cargo transportation support.",
  path: "/contact",
  keywords: ["contact midline aviation", "dubai aviation office", "private charter support"],
  ogImage: "/assets/og/og-contact.jpg",
});

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Midline Aviation",
  url: absoluteUrl("/contact"),
};

const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Contact", path: "/contact" }]);

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="relative isolate -mt-[72px] min-h-[100svh] overflow-hidden md:-mt-[84px]">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/assets/images/aircraft/contact-poster.webp"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/assets/videos/contact.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/22" />
      <div className="absolute inset-0 bg-gradient-to-l from-black/72 via-black/40 to-black/18" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-7xl px-4 pb-8 pt-[96px] sm:px-6 md:pb-10 md:pt-[114px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:px-8">
        <Reveal
          as="section"
          on="load"
          variant="stagger"
          stagger={0.12}
          delay={0.1}
          className="flex flex-col justify-center text-white"
        >
          <p data-reveal-item className="text-xs font-semibold uppercase tracking-[0.26em] text-[#c5a059]">Midline Aviation</p>
          <SplitHeading as="h1" mode="lcp" on="load" delay={0.25} className="font-display mt-4 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            Let&apos;s Plan Your Next Journey
          </SplitHeading>
          <p data-reveal-item className="mt-5 max-w-xl text-sm leading-relaxed text-white/78 sm:text-base">
            Connect with our concierge team for private charter, aircraft management, and bespoke aviation support
            tailored to your itinerary.
          </p>

          <div data-reveal-item className="mt-8 space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-white/16 bg-white/6 px-4 py-3 backdrop-blur-xl">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c5a059]" />
              <p className="text-sm text-white/86">Office 213, Building A5, Business Park, Dubai South, UAE</p>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/16 bg-white/6 px-4 py-3 backdrop-blur-xl">
              <Mail className="h-4 w-4 shrink-0 text-[#c5a059]" />
              <a className="text-sm text-white/86 transition-colors hover:text-white" href="mailto:info@midlineaviation.com">
                info@midlineaviation.com
              </a>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/16 bg-white/6 px-4 py-3 backdrop-blur-xl">
              <Phone className="h-4 w-4 shrink-0 text-[#c5a059]" />
              <a className="text-sm text-white/86 transition-colors hover:text-white" href="tel:+97145533430">
                +971 455 334 30
              </a>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/16 bg-white/6 px-4 py-3 backdrop-blur-xl">
              <Clock3 className="h-4 w-4 shrink-0 text-[#c5a059]" />
              <p className="text-sm text-white/86">24/7 Client Support and Flight Coordination</p>
            </div>
          </div>
        </Reveal>

        <Reveal
          as="section"
          on="load"
          variant="fade-up"
          delay={0.25}
          className="mt-8 flex items-center lg:mt-0"
        >
          <div className="w-full rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_18px_46px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
            <div className="mb-8 text-center">
              <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                Inquire About Your Journey
              </h2>
              <p className="mt-2 text-sm text-white/75">Confidential inquiry for private aviation services.</p>
            </div>

            <ContactInquiryForm />
          </div>
        </Reveal>
      </div>
      </main>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  ClipboardCheck,
  FileSearch,
  Handshake,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { buildBreadcrumbSchema, buildPageMetadata, buildServiceSchema } from "@/lib/seo";
import Reveal from "@/app/components/motion/Reveal";
import SplitHeading from "@/app/components/motion/SplitHeading";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Aircraft Sales and Acquisition",
  description:
    "Expert aircraft sales and acquisition guidance with transparent advisory and global market insight.",
  path: "/services/aircraft-sales",
  keywords: ["aircraft sales", "aircraft acquisition", "business aviation brokerage"],
  ogImage: "/assets/og/og-sales.jpg",
});

const serviceSchema = buildServiceSchema({
  name: "Aircraft Sales and Acquisition",
  serviceType: "Aircraft Sales & Acquisition",
  description:
    "Expert aircraft sales and acquisition guidance with transparent advisory and global market insight.",
  path: "/services/aircraft-sales",
  images: ["/assets/og/og-sales.jpg"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Aircraft Sales", path: "/services/aircraft-sales" },
]);

const advisorySections = [
  {
    title: "Buying an Aircraft",
    kicker: "Acquisition Advisory",
    image: "/assets/images/aircraft/g450-nose.webp",
    alt: "Gulfstream G450 head-on, prepared for a client aircraft acquisition",
    body: [
      "Midline Aviation combines trusted global market access with hands-on technical guidance to source aircraft aligned with your mission profile, budget, and operating expectations.",
      "Our team supports shortlisting, valuation, negotiation, pre-purchase inspection coordination, closing, delivery, and post-acquisition readiness.",
    ],
    icon: Search,
    reverse: false,
  },
  {
    title: "Selling an Aircraft",
    kicker: "Disposition Strategy",
    image: "/assets/images/aircraft/g450-exterior.webp",
    alt: "Gulfstream G450 on the ramp, positioned for a premium sales campaign",
    body: [
      "Selling an aircraft requires more than a listing. We shape the market story, qualify serious buyers, protect confidentiality, and manage the process through negotiation and final handover.",
      "From valuation guidance to targeted exposure, Midline Aviation helps position your aircraft for a confident, transparent transaction.",
    ],
    icon: Handshake,
    reverse: true,
  },
  {
    title: "Commercial Aircraft & Leasing",
    kicker: "Flexible Ownership",
    image: "/assets/images/aircraft/g200-exterior.webp",
    alt: "Gulfstream G200 supporting commercial aircraft and leasing services",
    body: [
      "For commercial and corporate operators, we assist with aircraft purchase, sale, lease placement, and market representation across a global network.",
      "Our advisory model is built for flexibility, helping clients evaluate operational needs, ownership structure, aircraft availability, and long-term value.",
    ],
    icon: Plane,
    reverse: false,
  },
] as const;

const services = [
  { label: "Aircraft sales and acquisitions", icon: BadgeCheck },
  { label: "Aircraft leasing services", icon: Plane },
  { label: "Aircraft marketing", icon: Sparkles },
  { label: "Aircraft financing", icon: Banknote },
  { label: "Ownership structuring", icon: ShieldCheck },
  { label: "Pre-purchase inspections", icon: ClipboardCheck },
  { label: "Market research and valuation", icon: FileSearch },
  { label: "Negotiation and closing support", icon: Handshake },
  { label: "Post-sale transition planning", icon: BadgeCheck },
] as const;

export default function AircraftSalesPage() {
  return (
    <main className="midline-page bg-[#f9f9ff] text-[#111c2c]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="relative min-h-[calc(100svh-72px)] overflow-hidden md:min-h-[calc(100svh-84px)]">
        <Image
          src="/assets/images/gulfstream,g800.png"
          alt="Premium private jet in flight for aircraft sales and acquisition advisory"
          fill
          sizes="100vw"
          className="object-cover hero-kenburns"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/38 via-black/24 to-black/70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,28,44,0.64)_0%,rgba(17,28,44,0.28)_48%,rgba(17,28,44,0.62)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] w-full max-w-[1440px] flex-col justify-end px-4 pb-12 pt-32 sm:px-6 md:min-h-[calc(100svh-84px)] lg:px-16 lg:pb-16">
          <Reveal
            as="div"
            on="load"
            variant="stagger"
            stagger={0.12}
            delay={0.1}
            className="max-w-4xl"
          >
            <p data-reveal-item className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffdea5]">Aircraft Sales</p>
            <SplitHeading
              as="h1"
              mode="lcp"
              on="load"
              delay={0.25}
              className="font-display mt-4 text-4xl font-medium leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Aircraft Sales & Acquisition
            </SplitHeading>
            <p data-reveal-item className="mt-5 max-w-2xl text-base leading-8 text-white/86 sm:text-lg">
              In-house brokerage and acquisition advisory for clients looking to buy, sell, lease, or reposition premium
              business and commercial aircraft.
            </p>
            <div data-reveal-item className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0d1c32] transition-[background-color,transform] duration-150 ease-out hover:bg-[#e7eeff] active:scale-[0.98]"
              >
                Start a Confidential Inquiry
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/fleet"
                className="inline-flex items-center justify-center rounded-lg border border-white/45 px-5 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-white/12 active:scale-[0.98]"
              >
                View Fleet
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-16">
        <Reveal
          as="div"
          variant="stagger"
          stagger={0.14}
          className="mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"
        >
          <div data-reveal-item>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#775a19]">Market Guidance</p>
            <h2 className="font-display mt-3 text-3xl font-medium text-[#0d1c32] sm:text-5xl">
              A guided path through every aircraft transaction.
            </h2>
          </div>
          <div data-reveal-item className="space-y-5 text-base leading-8 text-[#44474d] sm:text-lg">
            <p>
              We provide comprehensive support through each phase of the sale and acquisition process, including market
              research, sourcing, valuation, buyer qualification, purchasing support, and delivery coordination.
            </p>
            <p>
              Our aviation specialists bring practical experience across OEMs, cabin classes, ownership models, and
              operating requirements so clients can move with clarity instead of guesswork.
            </p>
          </div>
        </Reveal>
      </section>

      {advisorySections.map((section, index) => {
        const Icon = section.icon;
        return (
          <section
            key={section.title}
            className={`px-4 py-14 sm:px-6 sm:py-20 lg:px-16 ${
              index % 2 === 0 ? "bg-[#f0f3ff]" : "bg-white"
            }`}
          >
            <div
              className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-12 lg:items-center"
            >
              <Reveal
                as="div"
                variant={section.reverse ? "fade-right" : "fade-left"}
                className={`lg:col-span-5 ${section.reverse ? "lg:col-start-8 lg:order-2" : "lg:col-start-2"}`}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#d8e3fa] text-[#0d1c32]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#775a19]">{section.kicker}</p>
                <h2 className="font-display mt-3 text-3xl font-medium text-[#0d1c32] sm:text-4xl">
                  {section.title}
                </h2>
                <div className="mt-6 h-px w-12 bg-[#775a19]" />
                <div className="mt-7 space-y-5 text-base leading-7 text-[#44474d]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>

              <div className={`lg:col-span-6 ${section.reverse ? "lg:order-1" : ""}`}>
                <Reveal
                  as="figure"
                  variant="clip-wipe"
                  duration={0.9}
                  className="relative aspect-[1.55] overflow-hidden rounded-lg border border-[#c5c6cd] bg-[#d8e3fa] shadow-[0_24px_60px_rgba(17,28,44,0.12)]"
                >
                  <Image
                    src={section.image}
                    alt={section.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="object-cover transition-transform duration-500 ease-out hover:scale-[1.035]"
                  />
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-[#f9f9ff] px-4 py-16 sm:px-6 sm:py-20 lg:px-16">
        <div className="mx-auto w-full max-w-[1180px]">
          <Reveal as="div" variant="fade-up" className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#775a19]">Comprehensive Services</p>
            <h2 className="font-display mt-3 text-3xl font-medium text-[#0d1c32] sm:text-5xl">
              One advisory team from first review to final handover.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#44474d]">
              Midline Aviation supports new and current aircraft owners with the specialist services needed for a
              confident transaction.
            </p>
          </Reveal>

          <Reveal
            as="div"
            variant="stagger"
            stagger={0.08}
            className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.label}
                  data-reveal-item
                  className="flex min-h-20 items-center gap-3 rounded-lg border border-[#c5c6cd] bg-white px-4 py-4 shadow-[0_14px_34px_rgba(17,28,44,0.05)]"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0f3ff] text-[#775a19]">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-sm font-semibold text-[#0d1c32]">{service.label}</span>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-16">
        <Reveal
          as="div"
          variant="fade-up"
          className="mx-auto grid w-full max-w-[1180px] gap-10 rounded-lg border border-[#c5c6cd] bg-[#f9f9ff] p-5 shadow-[0_24px_64px_rgba(17,28,44,0.08)] sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#775a19]">Contact Us</p>
            <h2 className="font-display mt-3 text-3xl font-medium text-[#0d1c32] sm:text-4xl">
              Discuss your next aircraft move.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#44474d]">
              Share a few details and our aviation advisory team will help you evaluate the right next step for buying,
              selling, or leasing.
            </p>
            <div className="mt-8 rounded-lg bg-[#0d1c32] p-5 text-white">
              <p className="text-sm font-semibold">Confidential advisory</p>
              <p className="mt-2 text-sm leading-6 text-white/72">
                We handle transaction conversations with discretion, clear documentation, and qualified next actions.
              </p>
            </div>
          </div>

          <form className="grid gap-5" action="/contact">
            <label className="grid gap-2 text-sm font-semibold text-[#0d1c32]">
              Name
              <input
                className="rounded-none border-0 border-b border-[#75777e] bg-transparent px-0 py-3 text-base font-normal text-[#111c2c] outline-none transition-colors focus:border-[#775a19] focus:ring-0"
                name="name"
                placeholder="Your name"
                type="text"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[#0d1c32]">
              Email
              <input
                className="rounded-none border-0 border-b border-[#75777e] bg-transparent px-0 py-3 text-base font-normal text-[#111c2c] outline-none transition-colors focus:border-[#775a19] focus:ring-0"
                name="email"
                placeholder="you@example.com"
                type="email"
              />
            </label>
            <div className="grid gap-5 sm:grid-cols-[0.35fr_0.65fr]">
              <label className="grid gap-2 text-sm font-semibold text-[#0d1c32]">
                Code
                <select
                  className="rounded-none border-0 border-b border-[#75777e] bg-transparent px-0 py-3 text-base font-normal text-[#111c2c] outline-none transition-colors focus:border-[#775a19] focus:ring-0"
                  name="countryCode"
                  defaultValue="+971"
                >
                  <option>+971</option>
                  <option>+1</option>
                  <option>+44</option>
                  <option>+91</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#0d1c32]">
                Phone
                <input
                  className="rounded-none border-0 border-b border-[#75777e] bg-transparent px-0 py-3 text-base font-normal text-[#111c2c] outline-none transition-colors focus:border-[#775a19] focus:ring-0"
                  name="phone"
                  placeholder="Phone number"
                  type="tel"
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-semibold text-[#0d1c32]">
              Message
              <textarea
                className="min-h-28 resize-none rounded-none border-0 border-b border-[#75777e] bg-transparent px-0 py-3 text-base font-normal text-[#111c2c] outline-none transition-colors focus:border-[#775a19] focus:ring-0"
                name="message"
                placeholder="Tell us what you are looking to buy, sell, or lease"
              />
            </label>
            <button
              type="submit"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg border border-[#775a19] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#775a19] transition-[background-color,transform,color] duration-150 ease-out hover:bg-[#775a19] hover:text-white active:scale-[0.98]"
            >
              Submit Inquiry
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </Reveal>
      </section>
    </main>
  );
}

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { playfairDisplay } from "@/lib/fonts";

type FeatureKey = "charters" | "emptyLegs" | "experiences";

interface FeatureSlide {
  key: FeatureKey;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: string;
}

const featureSlides: FeatureSlide[] = [
  {
    key: "charters",
    label: "Charters",
    eyebrow: "Charters",
    title: "Travel the way you want",
    description:
      "With just a few taps, book private charters for business trips, personal travel, or urgent departures. Access thousands of airports closer to your starting point and arrive with less friction, with dependable service designed around your schedule.",
    ctaHref: "/services/aircraft-charter",
    imageSrc: "/assets/images/Sleeping-on-a-Private-Jet.jpg",
    imageAlt: "Passenger boarding a private jet",
    imagePosition: "center 56%",
  },
  {
    key: "emptyLegs",
    label: "Empty legs",
    eyebrow: "Empty legs",
    title: "Luxury flights with smarter pricing",
    description:
      "Empty-leg flights happen when aircraft reposition without passengers. That opens access to private aviation at significantly lower rates, while keeping the same premium cabin experience, safety standards, and service quality.",
    ctaHref: "/fleet",
    imageSrc: "/assets/images/Empty_Legs_Final.png",
    imageAlt: "Private jet parked on runway",
    imagePosition: "center 62%",
  },
  {
    key: "experiences",
    label: "Experiences",
    eyebrow: "Experiences",
    title: "Go beyond traditional itineraries",
    description:
      "Our curated aviation experiences unlock scenic destinations and unique journeys, from coastal escapes to remote luxury retreats. Every route is crafted to blend seamless flight logistics with memorable, destination-first travel.",
    ctaHref: "/contact",
    imageSrc: "/assets/images/Expirence_Final.png",
    imageAlt: "Leisure private aviation experience",
    imagePosition: "center 58%",
  },
];

export default function ContactLegacyStorySection() {
  const [activeFeature, setActiveFeature] = useState<FeatureKey>("charters");

  const activeSlide = useMemo(
    () => featureSlides.find((slide) => slide.key === activeFeature) ?? featureSlides[0],
    [activeFeature],
  );

  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[var(--midline-bg-soft)] py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={`${playfairDisplay.className} text-[2.2rem] font-medium tracking-[-0.025em] text-[var(--midline-navy)] sm:text-[2.6rem]`}>
            What we do
          </h2>
          <p className="mx-auto mt-2 max-w-[34rem] text-[0.77rem] leading-[1.72] text-[color:color-mix(in_srgb,var(--midline-navy)_70%,white_30%)] sm:text-[0.82rem]">
            We are the one-stop-shop you need to book a business flight, plan a relaxing getaway, or discover your
            next adventure.
          </p>
        </div>

        <div className="mt-4 flex justify-center sm:mt-5">
          <div className="inline-flex items-center rounded-full border border-[color:color-mix(in_srgb,var(--midline-navy)_10%,white_90%)] bg-white p-1 shadow-[0_8px_20px_rgba(17,26,90,0.08)]">
            {featureSlides.map((slide) => (
              <button
                key={slide.key}
                type="button"
                onClick={() => setActiveFeature(slide.key)}
                aria-pressed={activeFeature === slide.key}
                className={`rounded-full px-3 py-1.5 text-[0.63rem] font-medium tracking-[0.01em] transition-colors sm:px-4 ${
                  activeFeature === slide.key
                    ? "bg-[var(--midline-navy)] text-white"
                    : "text-[var(--midline-navy)] hover:bg-[color:color-mix(in_srgb,var(--midline-bg-soft)_65%,white_35%)] hover:text-[var(--midline-cyan-strong)]"
                }`}
              >
                {slide.label}
              </button>
            ))}
          </div>
        </div>

        <article className="mt-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10">
            <div>
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[var(--midline-cyan-strong)]">
                {activeSlide.eyebrow}
              </p>
              <h3
                className={`${playfairDisplay.className} mt-2 text-[2rem] font-medium leading-[1.08] tracking-[-0.02em] text-[var(--midline-navy)] sm:text-[2.3rem]`}
              >
                {activeSlide.title}
              </h3>
              <p className="mt-3 text-[0.77rem] leading-[1.72] text-[color:color-mix(in_srgb,var(--midline-navy)_74%,white_26%)] sm:text-[0.82rem]">
                {activeSlide.description}
              </p>
              <Link href={activeSlide.ctaHref} className="midline-btn-primary mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.72rem]">
                Book now
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>

            <figure className="relative h-[340px] overflow-hidden rounded-[1rem] bg-[color:color-mix(in_srgb,var(--midline-navy)_12%,white_88%)] sm:h-[420px] lg:h-[450px]">
              <Image
                key={activeSlide.key}
                src={activeSlide.imageSrc}
                alt={activeSlide.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="object-cover"
                style={{ objectPosition: activeSlide.imagePosition }}
                priority
              />
            </figure>
          </div>
        </article>

        <article className="mt-12 sm:mt-14">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
            <figure className="relative h-[280px] overflow-hidden rounded-[1rem] bg-[color:color-mix(in_srgb,var(--midline-navy)_12%,white_88%)] sm:h-[320px] lg:h-[360px]">
              <Image
                src="/assets/images/charter/charter-runway-jet.png"
                alt="Private jet on a runway"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
                style={{ objectPosition: "center 62%" }}
              />
            </figure>

            <div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:color-mix(in_srgb,var(--midline-cyan)_30%,white_70%)]">
                <span aria-hidden className="h-3.5 w-3.5 rounded-sm bg-[var(--midline-navy)]" />
              </span>
              <h3
                className={`${playfairDisplay.className} mt-3 text-[2.05rem] font-medium leading-[1.08] tracking-[-0.02em] text-[var(--midline-navy)] sm:text-[2.35rem]`}
              >
                Our story
              </h3>
              <div className="mt-3 space-y-3">
                <p className="text-[0.77rem] leading-[1.72] text-[color:color-mix(in_srgb,var(--midline-navy)_74%,white_26%)] sm:text-[0.82rem]">
                  Since 2019, Midline has modernized private aviation by making booking more transparent and efficient,
                  with live aircraft availability, clear pricing, and faster confirmations.
                </p>
                <p className="text-[0.77rem] leading-[1.72] text-[color:color-mix(in_srgb,var(--midline-navy)_74%,white_26%)] sm:text-[0.82rem]">
                  Our journey began by supporting regional operators with advanced aviation tools while improving
                  aircraft utilization through shared opportunities and empty-leg visibility.
                </p>
                <p className="text-[0.77rem] leading-[1.72] text-[color:color-mix(in_srgb,var(--midline-navy)_74%,white_26%)] sm:text-[0.82rem]">
                  Today, we serve clients across multiple markets and continue to scale with a clear mission: seamless,
                  reliable, and experience-first private flight.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

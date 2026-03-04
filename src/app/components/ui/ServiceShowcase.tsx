"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingText from "./RotatingText";

type ShowcaseItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  imageSizes?: string;
  reverse?: boolean;
};

const showcaseItems: ShowcaseItem[] = [
  {
    id: "private-charter",
    title: "Private Charter",
    subtitle: "Elite travel management",
    description:
      "Indulge in seamless luxury with our VIP private charter service, where we manage every detail from A to Z, creating an exclusive journey tailored to perfection just for you.",
    href: "/services/aircraft-charter",
    ctaLabel: "Explore Charter",
    imageSrc: "/assets/images/charter/charter-runway-jet.png",
    imageAlt: "Passengers boarding a private jet on the runway",
    imageSizes: "(max-width: 1024px) 100vw, (max-width: 1536px) 50vw, 980px",
  },
  {
    id: "concierge-service",
    title: "Concierge Service",
    subtitle: "VIP luxury and prestigious experience",
    description:
      "Benefit from the power of access provided by Midline Concierge. From luxury hotel reservations and entertainment to the finest yachts and villas around the globe.",
    href: "/contact",
    ctaLabel: "Contact Concierge",
    imageSrc: "/assets/images/charter/charter-leisure-journeys.png",
    imageAlt: "Luxury concierge arrival with chauffeur and luggage handling",
    imageSizes: "(max-width: 1024px) 100vw, (max-width: 1536px) 50vw, 980px",
    reverse: true,
  },
];

function ShowcaseContent({
  title,
  subtitle,
  description,
  href,
  ctaLabel,
}: {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  ctaLabel: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[360px] text-left">
      <h3 itemProp="name" className="text-3xl font-medium leading-tight text-[#111a5a] sm:text-[2rem]">
        {title}
      </h3>
      <p itemProp="serviceType" className="mt-3 text-sm font-medium tracking-wide text-[#111a5a]/75">
        {subtitle}
      </p>
      <div className="mt-4 h-px w-full bg-[linear-gradient(90deg,rgba(17,26,90,0.30)_0%,rgba(10,110,164,0.30)_100%)]" />
      <p itemProp="description" className="mt-5 text-sm leading-relaxed text-[#111a5a]/75">
        {description}
      </p>
      <Link
        href={href}
        itemProp="url"
        className="mt-6 inline-flex min-h-10 items-center border-b border-[#111a5a]/70 pb-0.5 text-sm text-[#111a5a] transition-opacity hover:opacity-80"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

export default function ServiceShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const xOffset = isMobile ? 64 : 120;
    const yOffset = isMobile ? 44 : 72;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-service-row]");

      rows.forEach((row) => {
        const image = row.querySelector<HTMLElement>("[data-service-image]");
        const text = row.querySelector<HTMLElement>("[data-service-text]");

        if (!image || !text) return;

        const direction = image.dataset.direction === "right" ? xOffset : -xOffset;

        if (prefersReducedMotion) {
          gsap.set([image, text], { clearProps: "all", autoAlpha: 1, x: 0, y: 0 });
          return;
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: row,
              start: isMobile ? "top 90%" : "top 85%",
              toggleActions: "play none none reverse",
            },
          })
          .fromTo(
            image,
            { x: direction, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.95, ease: "power3.out" }
          )
          .fromTo(
            text,
            { y: yOffset, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out" },
            "-=0.45"
          );
      });

    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="service-showcase-heading"
      className="bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <h2
          id="service-showcase-heading"
          className="flex flex-wrap items-center justify-center gap-2 text-center text-3xl font-semibold tracking-tight text-[#111a5a] sm:text-4xl"
        >
          <span>Discover</span>
          <RotatingText
            texts={["Midline", "Private Charter", "Concierge Service"]}
            mainClassName="min-w-[17ch] justify-center rounded-lg bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] px-2 py-0.5 text-white sm:px-2 sm:py-1 md:px-3 md:py-2"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </h2>

        <div className="mt-10 space-y-16 lg:mt-14 lg:space-y-20">
          {showcaseItems.map((item) => {
            const imageBlock = (
              <div
                className="w-full"
                data-service-image
                data-direction={item.reverse ? "right" : "left"}
              >
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={980}
                  height={650}
                  sizes={item.imageSizes}
                  className="h-auto w-full object-cover"
                  itemProp="image"
                  priority={item.id === "private-charter"}
                />
              </div>
            );

            const textBlock = (
              <div data-service-text>
                <ShowcaseContent
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                  href={item.href}
                  ctaLabel={item.ctaLabel}
                />
              </div>
            );

            return (
              <article
                key={item.id}
                data-service-row
                itemScope
                itemType="https://schema.org/Service"
                className={`grid items-center gap-8 lg:gap-10 ${
                  item.reverse ? "lg:grid-cols-[360px_1fr]" : "lg:grid-cols-[1fr_360px]"
                }`}
              >
                {item.reverse ? textBlock : imageBlock}
                {item.reverse ? imageBlock : textBlock}
              </article>
            );
          })}
        </div>

        <div className="sr-only">
          <h3>Midline Aviation Services Overview</h3>
          <p>
            Midline Aviation provides private charter flights and concierge services with global coverage and
            personalized trip planning.
          </p>
        </div>
      </div>
    </section>
  );
}

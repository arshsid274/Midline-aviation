"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardBody, CardContainer, CardItem } from "./ThreeDCard";

type AircraftCard = {
  id: string;
  name: string;
  description: string;
  comingSoon?: boolean;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

const HOME_AIRCRAFT: AircraftCard[] = [
  {
    id: "legacy-650",
    name: "Embraer Legacy 650",
    description:
      "The flagship of luxury aviation delivers ultra-long-range performance, cutting-edge design, and unmatched speed. The Embraer Legacy 650 redefines private air travel with elegance and power.",
    comingSoon: true,
    imageSrc: "/assets/images/privatejet1.jpg",
    imageAlt: "Embraer Legacy 650 parked on runway",
    href: "/fleet",
  },
  {
    id: "g450",
    name: "Gulfstream G450",
    description:
      "A long-range business jet known for its advanced technology, quiet cabin, and superior reliability. Perfect for intercontinental travel with unmatched comfort and safety.",
    imageSrc: "/assets/images/privatejet2.jpg",
    imageAlt: "Gulfstream G450 near terminal",
    href: "/fleet",
  },
  {
    id: "g200",
    name: "Gulfstream G200",
    description:
      "A versatile midsize jet offering exceptional comfort and performance for regional and medium-haul flights. The G200 combines spacious seating with impressive range and efficiency.",
    imageSrc: "/assets/images/privatejet.jpg",
    imageAlt: "Gulfstream G200 in flight line",
    href: "/fleet",
  },
];

export default function HomeAircraftCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-aircraft-card]");
      const headerLines = gsap.utils.toArray<HTMLElement>("[data-aircraft-heading-line]");

      if (prefersReducedMotion) {
        gsap.set([header, ...headerLines, ...cards], { x: 0, y: 0, autoAlpha: 1, clearProps: "all" });
        return;
      }

      if (headerLines.length > 0) {
        gsap.fromTo(
          headerLines,
          { y: isMobile ? 28 : 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.14,
            scrollTrigger: {
              trigger: header,
              start: isMobile ? "top 92%" : "top 84%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      cards.forEach((card, index) => {
        const textBlock = card.querySelector<HTMLElement>("[data-aircraft-text]");
        const fromVars =
          index === 0
            ? { x: isMobile ? -48 : -110, y: 0, autoAlpha: 0 }
            : index === 1
              ? { x: 0, y: isMobile ? 56 : 92, autoAlpha: 0 }
              : { x: isMobile ? 48 : 110, y: 0, autoAlpha: 0 };

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: isMobile ? "top 94%" : "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        timeline.fromTo(
          card,
          fromVars,
          {
            x: 0,
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
          }
        );

        if (textBlock) {
          timeline.fromTo(
            textBlock,
            { y: isMobile ? 26 : 40, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
            "-=0.45"
          );
        }
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-aircraft-heading"
      className="bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <header ref={headerRef} className="mb-8 text-center sm:mb-10 lg:mb-12">
          <p
            data-aircraft-heading-line
            className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0d1451]/70"
          >
            Fleet
          </p>
          <h2
            id="home-aircraft-heading"
            data-aircraft-heading-line
            className="mt-3 text-3xl font-semibold tracking-tight text-[#0d1451] sm:text-4xl"
          >
            Our Fleet
          </h2>
          <p
            data-aircraft-heading-line
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#0d1451]/80 sm:text-base"
          >
            Explore three signature aircraft from the Midline fleet, built for comfort, range, and performance.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {HOME_AIRCRAFT.map((aircraft) => (
            <CardContainer
              key={aircraft.id}
              className="h-full w-full"
              containerClassName="h-full w-full py-0"
            >
              <CardBody
                data-aircraft-card
                className="h-full rounded-2xl border border-white/15 bg-[#0d1451] p-4 sm:p-5"
              >
                <CardItem translateZ={50} className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image
                    src={aircraft.imageSrc}
                    alt={aircraft.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                    priority={aircraft.id === "legacy-650"}
                  />
                </CardItem>

                <div data-aircraft-text className="mt-4 space-y-4">
                  <CardItem translateZ={28}>
                    <h3 className="text-xl font-semibold text-white">{aircraft.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-blue-100/85">{aircraft.description}</p>
                  </CardItem>

                  <CardItem translateZ={24}>
                    <div className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                      {aircraft.comingSoon ? "Coming Soon" : "Available Now"}
                    </div>
                  </CardItem>

                  <CardItem translateZ={20}>
                    <Link
                      href={aircraft.href}
                      className="inline-flex items-center rounded-lg border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                    >
                      More Details
                    </Link>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
}

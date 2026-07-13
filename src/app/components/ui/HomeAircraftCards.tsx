"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardBody, CardContainer, CardItem } from "./ThreeDCard";

type AircraftCard = {
  id: string;
  name: string;
  registration: string;
  description: string;
  comingSoon?: boolean;
  imageSrc: string;
  imageAlt: string;
  href: string;
  videoSrc?: string;
};

const HOME_AIRCRAFT: AircraftCard[] = [
  {
    id: "legacy-650",
    name: "Embraer Legacy 650",
    registration: "T7-MIDB",
    description:
      "The flagship of luxury aviation delivers ultra-long-range performance, cutting-edge design, and unmatched speed. The Embraer Legacy 650 redefines private air travel with elegance and power.",
    comingSoon: true,
    imageSrc: "/assets/images/aircraft/legacy650-exterior-2.webp",
    imageAlt: "Embraer Legacy 650 (T7-MIDB) on the tarmac",
    href: "/fleet/embraer-legacy-650",
  },
  {
    id: "g450",
    name: "Gulfstream G450",
    registration: "T7-MID",
    description:
      "A long-range business jet known for its advanced technology, quiet cabin, and superior reliability. Perfect for intercontinental travel with unmatched comfort and safety.",
    imageSrc: "/assets/images/aircraft/g450-exterior.webp",
    imageAlt: "Gulfstream G450 (T7-MID) on the tarmac",
    href: "/fleet/gulfstream-g450",
  },
  {
    id: "g200",
    name: "Gulfstream G200",
    registration: "T7-MIDA",
    description:
      "A versatile midsize jet offering exceptional comfort and performance for regional and medium-haul flights. The G200 combines spacious seating with impressive range and efficiency.",
    imageSrc: "/assets/images/aircraft/g200-exterior.webp",
    imageAlt: "Gulfstream G200 (T7-MIDA) on the tarmac",
    href: "/fleet/gulfstream-g200",
  },
];

function HoverVideoCard({ aircraft }: { aircraft: AircraftCard }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static image */}
      <Image
        src={aircraft.imageSrc}
        alt={aircraft.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className={`object-cover transition-opacity duration-500 ${hovered ? "opacity-0" : "opacity-100"}`}
        priority
      />

      {/* Video — always mounted, shown on hover */}
      <video
        ref={videoRef}
        src={aircraft.videoSrc}
        muted
        loop
        playsInline
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
        <div className="inline-flex rounded-lg border border-white/22 bg-white/10 px-3.5 py-2 backdrop-blur-md">
          <h3 className="text-[1.05rem] font-semibold tracking-tight text-white">{aircraft.name}</h3>
        </div>
        <div className="inline-flex rounded-lg border border-white/22 bg-white/10 px-3 py-2 backdrop-blur-md">
          <span className="font-mono text-xs font-semibold tracking-widest text-white/90">{aircraft.registration}</span>
        </div>
      </div>
    </div>
  );
}

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

        timeline.fromTo(card, fromVars, { x: 0, y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" });

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

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-aircraft-heading"
      className="overflow-x-clip bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <header ref={headerRef} className="mb-8 text-center sm:mb-10 lg:mb-12">
          <p data-aircraft-heading-line className="text-xs font-semibold uppercase tracking-[0.24em] text-[#111a5a]/70">
            Fleet
          </p>
          <h2
            id="home-aircraft-heading"
            data-aircraft-heading-line
            className="mt-3 text-3xl font-semibold tracking-tight text-[#111a5a] sm:text-4xl"
          >
            Our Fleet
          </h2>
          <p
            data-aircraft-heading-line
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#111a5a]/80 sm:text-base"
          >
            Explore three signature aircraft from the Midline fleet, built for comfort, range, and performance.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {HOME_AIRCRAFT.map((aircraft) => (
            <CardContainer key={aircraft.id} className="h-full w-full" containerClassName="h-full w-full py-0">
              <CardBody
                data-aircraft-card
                className="h-full rounded-2xl border border-white/15 bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] p-4 sm:p-5"
              >
                <CardItem translateZ={50} className="w-full">
                  {aircraft.videoSrc ? (
                    <HoverVideoCard aircraft={aircraft} />
                  ) : (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                      <Image
                        src={aircraft.imageSrc}
                        alt={aircraft.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <div className="inline-flex rounded-lg border border-white/22 bg-white/10 px-3.5 py-2 backdrop-blur-md">
                          <h3 className="text-[1.05rem] font-semibold tracking-tight text-white">{aircraft.name}</h3>
                        </div>
                        <div className="inline-flex rounded-lg border border-white/22 bg-white/10 px-3 py-2 backdrop-blur-md">
                          <span className="font-mono text-xs font-semibold tracking-widest text-white/90">{aircraft.registration}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardItem>

                <div data-aircraft-text className="mt-4 space-y-4">
                  <CardItem translateZ={28}>
                    <p className="text-sm leading-relaxed text-blue-100/85">{aircraft.description}</p>
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

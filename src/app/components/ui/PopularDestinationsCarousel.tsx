"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type DestinationCard = {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

const POPULAR_DESTINATIONS: DestinationCard[] = [
  {
    id: "cape-town",
    name: "Cape Town",
    imageSrc: "/assets/images/popular-destinations/cape-town.jpg",
    imageAlt: "Cape Town coastline viewed from above",
    href: "/contact",
  },
  {
    id: "bora-bora",
    name: "Bora Bora",
    imageSrc: "/assets/images/popular-destinations/bora-bora.jpg",
    imageAlt: "Tropical island waters and villas",
    href: "/contact",
  },
  {
    id: "sydney",
    name: "Sydney",
    imageSrc: "/assets/images/popular-destinations/sydney.jpg",
    imageAlt: "Sydney skyline at dusk",
    href: "/contact",
  },
  {
    id: "dubai",
    name: "Dubai",
    imageSrc: "/assets/images/popular-destinations/dubai.jpg",
    imageAlt: "Dubai skyline at night",
    href: "/contact",
  },
  {
    id: "maldives",
    name: "Maldives",
    imageSrc: "/assets/images/popular-destinations/maldives.jpg",
    imageAlt: "Maldives island view from above",
    href: "/contact",
  },
  {
    id: "london",
    name: "London",
    imageSrc: "/assets/images/popular-destinations/london.jpg",
    imageAlt: "London skyline at twilight",
    href: "/contact",
  },
  {
    id: "paris",
    name: "Paris",
    imageSrc: "/assets/images/popular-destinations/paris.jpg",
    imageAlt: "Paris city lights at night",
    href: "/contact",
  },
  {
    id: "new-york",
    name: "New York",
    imageSrc: "/assets/images/popular-destinations/new-york.jpg",
    imageAlt: "New York skyline aerial view",
    href: "/contact",
  },
  {
    id: "zurich",
    name: "Zurich",
    imageSrc: "/assets/images/popular-destinations/zurich.jpg",
    imageAlt: "Zurich city and lake panorama",
    href: "/contact",
  },
  {
    id: "singapore",
    name: "Singapore",
    imageSrc: "/assets/images/popular-destinations/singapore.jpg",
    imageAlt: "Singapore skyline and waterfront",
    href: "/contact",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    imageSrc: "/assets/images/popular-destinations/tokyo.jpg",
    imageAlt: "Tokyo skyline at night",
    href: "/contact",
  },
  {
    id: "miami",
    name: "Miami",
    imageSrc: "/assets/images/popular-destinations/miami.jpg",
    imageAlt: "Miami beach and coastline view",
    href: "/contact",
  },
];

export default function PopularDestinationsCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const carouselBlockRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const frameId = window.requestAnimationFrame(updateButtons);
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);

    return () => {
      window.cancelAnimationFrame(frameId);
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  useEffect(() => {
    const section = sectionRef.current;
    const textBlock = textBlockRef.current;
    const carouselBlock = carouselBlockRef.current;
    if (!section || !textBlock || !carouselBlock) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([textBlock, carouselBlock], { x: 0, y: 0, autoAlpha: 1 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: isMobile ? "top 90%" : "top 82%",
            toggleActions: "play none none reverse",
          },
        })
        .fromTo(
          textBlock,
          { x: isMobile ? 56 : 96, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" }
        )
        .fromTo(
          carouselBlock,
          { y: isMobile ? 64 : 92, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
          "-=0.4"
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="popular-destinations-heading"
      className="overflow-hidden bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start justify-between gap-5 sm:mb-10 lg:mb-12">
          <div ref={textBlockRef}>
            <h2
              id="popular-destinations-heading"
              className="text-2xl font-medium tracking-tight text-white sm:text-4xl"
            >
              Popular destinations
            </h2>
            <p className="mt-2 text-sm text-white/70 sm:text-xl">Let&apos;s go on an adventure</p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              aria-label="Previous destination"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next destination"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div ref={carouselBlockRef}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div
              role="list"
              aria-label="Popular destinations"
              className="-ml-3 flex cursor-grab active:cursor-grabbing sm:-ml-4"
            >
              {POPULAR_DESTINATIONS.map((destination) => (
                <article
                  key={destination.id}
                  role="listitem"
                  className="flex-[0_0_88%] pl-3 sm:flex-[0_0_62%] sm:pl-4 md:flex-[0_0_48%] lg:flex-[0_0_34%] xl:flex-[0_0_25%]"
                >
                  <div className="group h-full">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                      <Image
                        src={destination.imageSrc}
                        alt={destination.imageAlt}
                        fill
                        sizes="(max-width: 640px) 88vw, (max-width: 768px) 62vw, (max-width: 1024px) 48vw, (max-width: 1280px) 34vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#495d75]/72 via-[#152239]/48 to-[#070e18]/92 opacity-0 transition-opacity duration-500 motion-reduce:transition-none group-hover:opacity-100" />
                      <p className="pointer-events-none absolute left-5 top-1/2 z-[1] -translate-y-1/2 translate-x-3 text-2xl font-medium text-white opacity-0 transition-all duration-500 ease-out motion-reduce:transition-none group-hover:translate-x-0 group-hover:opacity-100 sm:left-7 sm:text-3xl">
                        {destination.name}
                      </p>
                      <span className="pointer-events-none absolute bottom-5 left-5 z-[1] inline-flex translate-y-2 text-white/80 opacity-0 transition-all duration-500 ease-out motion-reduce:transition-none group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-6 sm:left-7">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <p className="text-xl font-semibold text-white sm:text-2xl">{destination.name}</p>
                      <Link
                        href={destination.href}
                        aria-label={`Explore ${destination.name}`}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-white transition hover:border-white hover:bg-white/10"
                      >
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
            <button
              type="button"
              aria-label="Previous destination"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-white transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next destination"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-white transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

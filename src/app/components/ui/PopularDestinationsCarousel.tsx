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
    id: "london",
    name: "London",
    imageSrc: "/assets/images/frequent-travel-destinations/london.webp",
    imageAlt: "London skyline along the Thames",
    href: "/contact",
  },
  {
    id: "paris",
    name: "Paris",
    imageSrc: "/assets/images/frequent-travel-destinations/paris.webp",
    imageAlt: "Paris cityscape with the Eiffel Tower",
    href: "/contact",
  },
  {
    id: "maldives",
    name: "Maldives",
    imageSrc: "/assets/images/frequent-travel-destinations/maldives.webp",
    imageAlt: "Maldives island resort from above",
    href: "/contact",
  },
  {
    id: "singapore",
    name: "Singapore",
    imageSrc: "/assets/images/frequent-travel-destinations/singapore.webp",
    imageAlt: "Singapore skyline and waterfront",
    href: "/contact",
  },
  {
    id: "turkey",
    name: "Turkey",
    imageSrc: "/assets/images/frequent-travel-destinations/turkey.webp",
    imageAlt: "Historic skyline of Istanbul, Turkey",
    href: "/contact",
  },
  {
    id: "madrid",
    name: "Madrid",
    imageSrc: "/assets/images/frequent-travel-destinations/madrid.webp",
    imageAlt: "Madrid city architecture at golden hour",
    href: "/contact",
  },
  {
    id: "uzbekistan",
    name: "Uzbekistan",
    imageSrc: "/assets/images/frequent-travel-destinations/uzbekistan.webp",
    imageAlt: "Historic architecture of Uzbekistan",
    href: "/contact",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    imageSrc: "/assets/images/frequent-travel-destinations/mumbai.webp",
    imageAlt: "Mumbai skyline along Marine Drive",
    href: "/contact",
  },
  {
    id: "chennai",
    name: "Chennai",
    imageSrc: "/assets/images/frequent-travel-destinations/chennai.webp",
    imageAlt: "Chennai cityscape and coastline",
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
      const cards = gsap.utils.toArray<HTMLElement>("[data-dest-card]", section);

      if (prefersReducedMotion) {
        gsap.set([textBlock, carouselBlock], { x: 0, y: 0, autoAlpha: 1 });
        // No filter here — a lingering blur(0px) keeps each card on its own
        // composited layer and paints a ghost band under the cards.
        gsap.set(cards, { autoAlpha: 1, scale: 1, y: 0 });
        return;
      }

      // Set all cards to blurred glass state initially — pushed down
      gsap.set(cards, { filter: "blur(14px)", autoAlpha: 0.35, scale: 0.97, y: 60 });

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
        )
        // Stagger clear: each card rises up and unblurs one by one.
        // clearProps removes the inline filter once each card settles —
        // otherwise blur(0px) pins the card to a composited layer that
        // renders a ghost band beneath it.
        .to(
          cards,
          {
            filter: "blur(0px)",
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.48,
            clearProps: "filter",
          },
          "-=0.3"
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
              Frequent travel destinations
            </h2>
            <p className="mt-2 text-sm text-white/70 sm:text-xl">The routes our clients fly most</p>
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
              aria-label="Frequent travel destinations"
              className="-ml-3 flex cursor-grab active:cursor-grabbing sm:-ml-4"
            >
              {POPULAR_DESTINATIONS.map((destination) => (
                <article
                  key={destination.id}
                  role="listitem"
                  className="flex-[0_0_88%] pl-3 sm:flex-[0_0_62%] sm:pl-4 md:flex-[0_0_48%] lg:flex-[0_0_34%] xl:flex-[0_0_25%]"
                >
                  <div className="group h-full">
                    <div data-dest-card="" className="relative aspect-[16/10] overflow-hidden rounded-3xl">
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

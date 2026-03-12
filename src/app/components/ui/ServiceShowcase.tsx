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
    imageSrc: "/assets/images/Charter_Hero_T7_Gulfstram_Final.png",
    imageAlt: "Passengers boarding a private jet on the runway",
  },
  {
    id: "concierge-service",
    title: "Concierge Service",
    subtitle: "VIP luxury and prestigious experience",
    description:
      "Benefit from the power of access provided by Midline Concierge. From luxury hotel reservations and entertainment to the finest yachts and villas around the globe.",
    href: "/contact",
    ctaLabel: "Contact Concierge",
    imageSrc: "/assets/images/Conciarge_Final.png",
    imageAlt: "Luxury concierge arrival with chauffeur and luggage handling",
    reverse: true,
  },
];

function ShowcasePanel({ item }: { item: ShowcaseItem }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const mask = maskRef.current;
    const imageInner = imageInnerRef.current;
    const text = textRef.current;
    if (!wrapper || !mask || !imageInner || !text) return;

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(mask, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(text, { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Image mask — wipe reveal from left edge to right
      gsap.fromTo(
        mask,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 80%",
            end: "top 15%",
            scrub: 1.4,
          },
        }
      );

      // Parallax on image inner — scrolls up within clipped container
      gsap.fromTo(
        imageInner,
        { y: "10%" },
        {
          y: "-10%",
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Text — fades and slides up
      gsap.fromTo(
        text,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 78%",
            end: "top 28%",
            scrub: 1.1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const imageBlock = (
    <div
      ref={maskRef}
      className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl"
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
    >
      <div
        ref={imageInnerRef}
        className="absolute inset-x-0"
        style={{ top: "-15%", bottom: "-15%", transform: "translateY(10%)" }}
      >
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
          priority={item.id === "private-charter"}
        />
      </div>
    </div>
  );

  const textBlock = (
    <div ref={textRef} className="mx-auto w-full max-w-[360px]" style={{ opacity: 0 }}>
      <h3 className="text-3xl font-medium leading-tight text-[#111a5a] sm:text-[2rem]">{item.title}</h3>
      <p className="mt-3 text-sm font-medium tracking-wide text-[#111a5a]/75">{item.subtitle}</p>
      <div className="mt-4 h-px w-full bg-[linear-gradient(90deg,rgba(17,26,90,0.30)_0%,rgba(10,110,164,0.30)_100%)]" />
      <p className="mt-5 text-sm leading-relaxed text-[#111a5a]/75">{item.description}</p>
      <Link
        href={item.href}
        className="mt-6 inline-flex min-h-10 items-center border-b border-[#111a5a]/70 pb-0.5 text-sm text-[#111a5a] transition-opacity hover:opacity-80"
      >
        {item.ctaLabel}
      </Link>
    </div>
  );

  return (
    <div ref={wrapperRef}>
      <div
        className={`grid items-center gap-8 lg:gap-16 ${
          item.reverse ? "lg:grid-cols-[360px_1fr]" : "lg:grid-cols-[1fr_360px]"
        }`}
      >
        {item.reverse ? textBlock : imageBlock}
        {item.reverse ? imageBlock : textBlock}
      </div>
    </div>
  );
}

export default function ServiceShowcase() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const heading = headingRef.current;
    if (!heading) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const anim = gsap.fromTo(
      heading,
      { y: 56, autoAlpha: 0, scale: 0.97 },
      {
        y: 0, autoAlpha: 1, scale: 1,
        duration: 1.0, ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <section
      aria-labelledby="service-showcase-heading"
      className="bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <h2
          ref={headingRef}
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

        <div className="mt-10 space-y-20 lg:mt-14 lg:space-y-28">
          {showcaseItems.map((item) => (
            <ShowcasePanel key={item.id} item={item} />
          ))}
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

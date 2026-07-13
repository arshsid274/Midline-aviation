"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import "glightbox/dist/css/glightbox.min.css";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gsap, ScrollTrigger, Flip, registerScrollTrigger } from "@/app/components/motion/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type GalleryImage = {
  src: string;
  alt: string;
  category: string;
  caption: string;
};

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/assets/images/aircraft/g450-exterior.webp",
    alt: "Gulfstream G450 on the ramp",
    category: "Gulfstream G450",
    caption: "Gulfstream G450 — On the Ramp",
  },
  {
    src: "/assets/images/aircraft/g450-cabin.webp",
    alt: "Gulfstream G450 cabin",
    category: "Gulfstream G450",
    caption: "Gulfstream G450 — Cabin",
  },
  {
    src: "/assets/images/aircraft/g450-dining.webp",
    alt: "In-flight dining aboard the Gulfstream G450",
    category: "Gulfstream G450",
    caption: "Gulfstream G450 — In-Flight Dining",
  },
  {
    src: "/assets/images/aircraft/g200-exterior.webp",
    alt: "Gulfstream G200 on the tarmac",
    category: "Gulfstream G200",
    caption: "Gulfstream G200 — T7-MIDA",
  },
  {
    src: "/assets/images/aircraft/g200-cabin.webp",
    alt: "Gulfstream G200 bespoke cabin",
    category: "Gulfstream G200",
    caption: "Gulfstream G200 — Cabin",
  },
  {
    src: "/assets/images/aircraft/g200-lifestyle.webp",
    alt: "Guests aboard the Gulfstream G200",
    category: "Gulfstream G200",
    caption: "Gulfstream G200 — Onboard Experience",
  },
  {
    src: "/assets/images/aircraft/legacy650-exterior.webp",
    alt: "Embraer Legacy 650 on the tarmac",
    category: "Embraer Legacy 650",
    caption: "Embraer Legacy 650 — T7-MIDB",
  },
  {
    src: "/assets/images/aircraft/legacy650-cabin-real.webp",
    alt: "Embraer Legacy 650 cabin interior",
    category: "Embraer Legacy 650",
    caption: "Embraer Legacy 650 — Cabin Interior",
  },
  {
    src: "/assets/images/aircraft/legacy650-exterior-rear.webp",
    alt: "Embraer Legacy 650 rear three-quarter view",
    category: "Embraer Legacy 650",
    caption: "Embraer Legacy 650 — At the Hangar",
  },
  {
    src: "/assets/images/aircraft/legacy650-window-view.webp",
    alt: "Embraer Legacy 650 seen through a cabin porthole",
    category: "Embraer Legacy 650",
    caption: "Embraer Legacy 650 — Porthole View",
  },
  {
    src: "/assets/images/aircraft/legacy650-cabin-portrait.webp",
    alt: "Embraer Legacy 650 cabin sideboard",
    category: "Embraer Legacy 650",
    caption: "Embraer Legacy 650 — Cabin Detail",
  },
  {
    src: "/assets/images/aircraft/legacy650-exterior-2.webp",
    alt: "Embraer Legacy 650 side profile on the tarmac",
    category: "Embraer Legacy 650",
    caption: "Embraer Legacy 650 — Runway View",
  },
  {
    src: "/assets/images/aircraft/g450-guest-dining.webp",
    alt: "Guest dining aboard the Gulfstream G450",
    category: "Gulfstream G450",
    caption: "Gulfstream G450 — In-Flight Dining",
  },
  {
    src: "/assets/images/aircraft/g450-cabin-aisle.webp",
    alt: "Gulfstream G450 cabin aisle",
    category: "Gulfstream G450",
    caption: "Gulfstream G450 — Cabin Aisle",
  },
  {
    src: "/assets/images/aircraft/g450-cabin-view.webp",
    alt: "Gulfstream G450 forward cabin",
    category: "Gulfstream G450",
    caption: "Gulfstream G450 — Forward Cabin",
  },
  {
    src: "/assets/images/aircraft/g450-boarding.webp",
    alt: "Boarding the Gulfstream G450",
    category: "Gulfstream G450",
    caption: "Gulfstream G450 — Boarding",
  },
  {
    src: "/assets/images/aircraft/g200-cabin-dining-wide.webp",
    alt: "Gulfstream G200 cabin dressed for dining",
    category: "Gulfstream G200",
    caption: "Gulfstream G200 — Dining Service",
  },
  {
    src: "/assets/images/aircraft/g200-seat-dining.webp",
    alt: "Club seat dining aboard the Gulfstream G200",
    category: "Gulfstream G200",
    caption: "Gulfstream G200 — Club Seat",
  },
  {
    src: "/assets/images/aircraft/g200-guests-cabin.webp",
    alt: "Guests relaxing in the Gulfstream G200 cabin",
    category: "Gulfstream G200",
    caption: "Gulfstream G200 — Onboard",
  },
  {
    src: "/assets/images/aircraft/g200-guests-portrait.webp",
    alt: "Guests aboard the Gulfstream G200",
    category: "Gulfstream G200",
    caption: "Gulfstream G200 — Guest Experience",
  },
  {
    src: "/assets/images/aircraft/charter-family.webp",
    alt: "Family dining aboard a Midline private charter",
    category: "Services",
    caption: "Private Charter — Family Travel",
  },
  {
    src: "/assets/images/aircraft/concierge-service.webp",
    alt: "Onboard concierge service",
    category: "Services",
    caption: "Concierge & VIP Service",
  },
];

const CATEGORIES = ["All", "Embraer Legacy 650", "Gulfstream G450", "Gulfstream G200", "Services"];

export default function GalleryClient() {
  const galleryRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const prefersReducedMotion = useReducedMotion();

  // Reveals the header, filter bar, and the grid CONTAINER once. The grid's
  // children are intentionally not tagged so filter-driven remounts stay visible.
  useScrollReveal(galleryRef, { stagger: 0.1 });

  const filtered =
    activeCategory === "All"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  // Capture positions BEFORE React re-renders the filtered grid…
  const handleCategory = (category: string) => {
    if (category === activeCategory) return;
    if (!prefersReducedMotion && gridRef.current) {
      registerScrollTrigger();
      flipStateRef.current = Flip.getState(gridRef.current.children);
    }
    setActiveCategory(category);
  };

  // …then FLIP the survivors into place and fade the newcomers in.
  useLayoutEffect(() => {
    const state = flipStateRef.current;
    if (!state || !gridRef.current) return;
    flipStateRef.current = null;

    Flip.from(state, {
      duration: 0.5,
      ease: "midline",
      stagger: 0.015,
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(els, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "midline" }),
      onComplete: () => {
        // Grid height changed — every trigger below must recompute.
        ScrollTrigger.refresh();
      },
    });
  }, [activeCategory]);

  useEffect(() => {
    let lightbox: { destroy: () => void } | null = null;

    async function initLightbox() {
      const GLightbox = (await import("glightbox")).default;
      lightbox = GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: true,
        openEffect: "fade",
        closeEffect: "fade",
      });
    }

    initLightbox();
    return () => {
      lightbox?.destroy();
    };
  }, [filtered]);

  return (
    <main ref={galleryRef} className="min-h-screen bg-white pt-[84px]">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <h1 data-reveal-item className="text-3xl font-semibold tracking-tight text-[#111a5a] sm:text-4xl">
          Gallery
        </h1>
        <p data-reveal-item className="mt-2 text-sm text-[#111a5a]/55 sm:text-base">
          Explore our fleet — exterior, interior &amp; in-flight photography.
        </p>

        {/* Filter tabs */}
        <div data-reveal-item className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#111a5a] text-white shadow"
                  : "border border-[#111a5a]/20 text-[#111a5a]/70 hover:border-[#111a5a]/50 hover:text-[#111a5a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-6 h-px w-full bg-[#111a5a]/10" />
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div ref={gridRef} data-reveal-item className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((img) => (
            <a
              key={img.src}
              href={img.src}
              className="glightbox group block overflow-hidden rounded-2xl bg-gray-100"
              data-gallery="midline-gallery"
              data-description={img.caption}
              data-type="image"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Caption overlay on hover */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
                      {img.category}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-white">{img.caption}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

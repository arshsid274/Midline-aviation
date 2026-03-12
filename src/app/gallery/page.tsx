"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "glightbox/dist/css/glightbox.min.css";

type GalleryImage = {
  src: string;
  alt: string;
  category: string;
  caption: string;
};

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/assets/images/gallery/Embrar_Legasy_Final.png",
    alt: "Embraer Legacy 650",
    category: "Embraer Legacy 650",
    caption: "Embraer Legacy 650 — T7-MIDB",
  },
  {
    src: "/assets/images/gallery/Embrar_Legasy_Interior_Final.png",
    alt: "Embraer Legacy 650 Interior",
    category: "Embraer Legacy 650",
    caption: "Embraer Legacy 650 — Cabin Interior",
  },
  {
    src: "/assets/images/gallery/Embrara_Legasy_Exterior_Final.png",
    alt: "Embraer Legacy 650 Exterior",
    category: "Embraer Legacy 650",
    caption: "Embraer Legacy 650 — Exterior",
  },
  {
    src: "/assets/images/gallery/embraer-legacy-650E-in-flight.jpg",
    alt: "Embraer Legacy 650E In Flight",
    category: "Embraer Legacy 650",
    caption: "Embraer Legacy 650E — In Flight",
  },
  {
    src: "/assets/images/gallery/Legasy_650_Exterior_Final.png",
    alt: "Legacy 650 Exterior",
    category: "Embraer Legacy 650",
    caption: "Legacy 650 — Runway View",
  },
  {
    src: "/assets/images/gallery/g450_Final.png",
    alt: "Gulfstream G450",
    category: "Gulfstream G450",
    caption: "Gulfstream G450 — T7-MID",
  },
  {
    src: "/assets/images/gallery/g450_Exterior_Final.png",
    alt: "Gulfstream G450 Exterior",
    category: "Gulfstream G450",
    caption: "Gulfstream G450 — Exterior",
  },
  {
    src: "/assets/images/gallery/g450_Exterior_Final2.png",
    alt: "Gulfstream G450 Runway",
    category: "Gulfstream G450",
    caption: "Gulfstream G450 — Runway View",
  },
  {
    src: "/assets/images/gallery/g450_Interior_Final.png",
    alt: "Gulfstream G450 Interior",
    category: "Gulfstream G450",
    caption: "Gulfstream G450 — Cabin Interior",
  },
  {
    src: "/assets/images/gallery/g200_Final.png",
    alt: "Gulfstream G200",
    category: "Gulfstream G200",
    caption: "Gulfstream G200 — T7-MIDA",
  },
  {
    src: "/assets/images/gallery/g200_Final_Exterior.png",
    alt: "Gulfstream G200 Exterior",
    category: "Gulfstream G200",
    caption: "Gulfstream G200 — Exterior",
  },
  {
    src: "/assets/images/gallery/G200_Exterior_final.png",
    alt: "Gulfstream G200 Side View",
    category: "Gulfstream G200",
    caption: "Gulfstream G200 — Side View",
  },
  {
    src: "/assets/images/gallery/g200_Interior.png",
    alt: "Gulfstream G200 Interior",
    category: "Gulfstream G200",
    caption: "Gulfstream G200 — Cabin Interior",
  },
  {
    src: "/assets/images/gallery/Charter_Hero_T7_Gulfstram_Final.png",
    alt: "Private Charter",
    category: "Services",
    caption: "Private Charter — T7 Gulfstream",
  },
  {
    src: "/assets/images/gallery/Conciarge_Final.png",
    alt: "Concierge Service",
    category: "Services",
    caption: "Concierge & VIP Service",
  },
];

const CATEGORIES = ["All", "Embraer Legacy 650", "Gulfstream G450", "Gulfstream G200", "Services"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

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
    <main className="min-h-screen bg-white pt-[84px]">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <h1 className="text-3xl font-semibold tracking-tight text-[#111a5a] sm:text-4xl">
          Gallery
        </h1>
        <p className="mt-2 text-sm text-[#111a5a]/55 sm:text-base">
          Explore our fleet — exterior, interior &amp; in-flight photography.
        </p>

        {/* Filter tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((img, i) => (
            <a
              key={`${img.src}-${i}`}
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

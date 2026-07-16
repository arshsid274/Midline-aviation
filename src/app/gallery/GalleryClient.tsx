"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import "glightbox/dist/css/glightbox.min.css";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gsap, ScrollTrigger, Flip, registerScrollTrigger } from "@/app/components/motion/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import AutoplayVideo from "@/app/components/motion/AutoplayVideo";

type GalleryItem = {
  src: string;
  alt: string;
  category: string;
  caption: string;
  orientation: "landscape" | "portrait";
  /** Present on video items — src is then an MP4 and poster the preview frame. */
  poster?: string;
};

const IMG = "/assets/images/aircraft";
const VID = "/assets/videos/gallery";
const POS = "/assets/images/gallery-posters";

const GALLERY_ITEMS: GalleryItem[] = [
  // ── Gulfstream G450 — photography ──
  { src: `${IMG}/g450-exterior.webp`, alt: "Gulfstream G450 on the ramp", category: "Gulfstream G450", caption: "Gulfstream G450 — On the Ramp", orientation: "landscape" },
  { src: `${IMG}/g450-cabin.webp`, alt: "Gulfstream G450 cabin", category: "Gulfstream G450", caption: "Gulfstream G450 — Cabin", orientation: "portrait" },
  { src: `${IMG}/g450-dining.webp`, alt: "In-flight dining aboard the Gulfstream G450", category: "Gulfstream G450", caption: "Gulfstream G450 — In-Flight Dining", orientation: "portrait" },
  { src: `${IMG}/g450-guest-dining.webp`, alt: "Guest dining aboard the Gulfstream G450", category: "Gulfstream G450", caption: "Gulfstream G450 — In-Flight Dining", orientation: "landscape" },
  { src: `${IMG}/g450-cabin-aisle.webp`, alt: "Gulfstream G450 cabin aisle", category: "Gulfstream G450", caption: "Gulfstream G450 — Cabin Aisle", orientation: "landscape" },
  { src: `${IMG}/g450-cabin-view.webp`, alt: "Gulfstream G450 forward cabin", category: "Gulfstream G450", caption: "Gulfstream G450 — Forward Cabin", orientation: "landscape" },
  { src: `${IMG}/g450-boarding.webp`, alt: "Boarding the Gulfstream G450", category: "Gulfstream G450", caption: "Gulfstream G450 — Boarding", orientation: "portrait" },
  { src: `${IMG}/g450-dining-guest.webp`, alt: "Guest enjoying a plated meal aboard the Gulfstream G450", category: "Gulfstream G450", caption: "Gulfstream G450 — Dining Service", orientation: "portrait" },
  { src: `${IMG}/g450-dining-service.webp`, alt: "Table service aboard the Gulfstream G450", category: "Gulfstream G450", caption: "Gulfstream G450 — Table Service", orientation: "landscape" },
  { src: `${IMG}/g450-table-setting.webp`, alt: "Dressed dining table aboard the Gulfstream G450", category: "Gulfstream G450", caption: "Gulfstream G450 — Table Setting", orientation: "portrait" },
  { src: `${IMG}/g450-aisle-portrait.webp`, alt: "Gulfstream G450 cabin aisle looking aft", category: "Gulfstream G450", caption: "Gulfstream G450 — Three Living Zones", orientation: "portrait" },
  { src: `${IMG}/g450-conference-table.webp`, alt: "Conference table with fresh fruit aboard the G450", category: "Gulfstream G450", caption: "Gulfstream G450 — Conference Zone", orientation: "landscape" },
  { src: `${IMG}/g450-media-lounge.webp`, alt: "Media lounge sofa aboard the Gulfstream G450", category: "Gulfstream G450", caption: "Gulfstream G450 — Media Lounge", orientation: "landscape" },
  { src: `${IMG}/g450-dining-flowers.webp`, alt: "Dining table dressed with fresh flowers", category: "Gulfstream G450", caption: "Gulfstream G450 — Fresh Flower Service", orientation: "portrait" },
  { src: `${IMG}/g450-breakfast-window.webp`, alt: "Breakfast service by the cabin window", category: "Gulfstream G450", caption: "Gulfstream G450 — Breakfast Aloft", orientation: "portrait" },
  { src: `${IMG}/g450-crew-night.webp`, alt: "Crew member on the airstair at night", category: "Gulfstream G450", caption: "Gulfstream G450 — Night Departure", orientation: "portrait" },
  { src: `${IMG}/g450-guest-reading.webp`, alt: "Guest reading in the Gulfstream G450 cabin", category: "Gulfstream G450", caption: "Gulfstream G450 — At Ease Onboard", orientation: "portrait" },
  { src: `${IMG}/g450-tail-portrait.webp`, alt: "Gulfstream G450 tail on the ramp", category: "Gulfstream G450", caption: "Gulfstream G450 — T7-MID", orientation: "portrait" },
  { src: `${IMG}/g450-tea-service.webp`, alt: "Tea service aboard the Gulfstream G450", category: "Gulfstream G450", caption: "Gulfstream G450 — Tea Service", orientation: "portrait" },
  { src: `${IMG}/g450-lavatory.webp`, alt: "Gulfstream G450 lavatory", category: "Gulfstream G450", caption: "Gulfstream G450 — Lavatory", orientation: "portrait" },
  { src: `${IMG}/g450-cabin-flowers.webp`, alt: "Cabin dressed with flowers and fruit", category: "Gulfstream G450", caption: "Gulfstream G450 — Cabin Styling", orientation: "portrait" },
  { src: `${IMG}/g450-business-onboard.webp`, alt: "Working on a laptop aboard the Gulfstream G450", category: "Gulfstream G450", caption: "Gulfstream G450 — Office in the Sky", orientation: "portrait" },

  // ── Gulfstream G200 — photography ──
  { src: `${IMG}/g200-exterior.webp`, alt: "Gulfstream G200 on the tarmac", category: "Gulfstream G200", caption: "Gulfstream G200 — T7-MIDA", orientation: "landscape" },
  { src: `${IMG}/g200-cabin.webp`, alt: "Gulfstream G200 bespoke cabin", category: "Gulfstream G200", caption: "Gulfstream G200 — Cabin", orientation: "landscape" },
  { src: `${IMG}/g200-lifestyle.webp`, alt: "Guests aboard the Gulfstream G200", category: "Gulfstream G200", caption: "Gulfstream G200 — Onboard Experience", orientation: "landscape" },
  { src: `${IMG}/g200-cabin-dining-wide.webp`, alt: "Gulfstream G200 cabin dressed for dining", category: "Gulfstream G200", caption: "Gulfstream G200 — Dining Service", orientation: "landscape" },
  { src: `${IMG}/g200-seat-dining.webp`, alt: "Club seat dining aboard the Gulfstream G200", category: "Gulfstream G200", caption: "Gulfstream G200 — Club Seat", orientation: "portrait" },
  { src: `${IMG}/g200-guests-cabin.webp`, alt: "Guests relaxing in the Gulfstream G200 cabin", category: "Gulfstream G200", caption: "Gulfstream G200 — Onboard", orientation: "landscape" },
  { src: `${IMG}/g200-guests-portrait.webp`, alt: "Guests aboard the Gulfstream G200", category: "Gulfstream G200", caption: "Gulfstream G200 — Guest Experience", orientation: "portrait" },
  { src: `${IMG}/g200-dining-tables.webp`, alt: "Twin dining tables aboard the Gulfstream G200", category: "Gulfstream G200", caption: "Gulfstream G200 — Dining for Four", orientation: "portrait" },
  { src: `${IMG}/g200-aft-lounge.webp`, alt: "Aft lounge with fruit service aboard the G200", category: "Gulfstream G200", caption: "Gulfstream G200 — Aft Lounge", orientation: "portrait" },

  // ── Embraer Legacy 650 — photography ──
  { src: `${IMG}/legacy650-exterior.webp`, alt: "Embraer Legacy 650 on the tarmac", category: "Embraer Legacy 650", caption: "Embraer Legacy 650 — T7-MIDB", orientation: "portrait" },
  { src: `${IMG}/legacy650-cabin-real.webp`, alt: "Embraer Legacy 650 cabin interior", category: "Embraer Legacy 650", caption: "Embraer Legacy 650 — Cabin Interior", orientation: "portrait" },
  { src: `${IMG}/legacy650-exterior-rear.webp`, alt: "Embraer Legacy 650 rear three-quarter view", category: "Embraer Legacy 650", caption: "Embraer Legacy 650 — At the Hangar", orientation: "portrait" },
  { src: `${IMG}/legacy650-window-view.webp`, alt: "Embraer Legacy 650 seen through a cabin porthole", category: "Embraer Legacy 650", caption: "Embraer Legacy 650 — Porthole View", orientation: "portrait" },
  { src: `${IMG}/legacy650-cabin-portrait.webp`, alt: "Embraer Legacy 650 cabin sideboard", category: "Embraer Legacy 650", caption: "Embraer Legacy 650 — Cabin Detail", orientation: "portrait" },
  { src: `${IMG}/legacy650-exterior-2.webp`, alt: "Embraer Legacy 650 side profile on the tarmac", category: "Embraer Legacy 650", caption: "Embraer Legacy 650 — Runway View", orientation: "portrait" },

  // ── Services ──
  { src: `${IMG}/charter-family.webp`, alt: "Family dining aboard a Midline private charter", category: "Services", caption: "Private Charter — Family Travel", orientation: "portrait" },
  { src: `${IMG}/concierge-service.webp`, alt: "Onboard concierge service", category: "Services", caption: "Concierge & VIP Service", orientation: "portrait" },

  // ── Gulfstream G450 — film ──
  { src: `${VID}/g450-arrival-rolls-royce.mp4`, poster: `${POS}/g450-arrival-rolls-royce.webp`, alt: "Arriving to the Gulfstream G450 by Rolls-Royce", category: "Gulfstream G450", caption: "G450 — Kerbside to Cabin", orientation: "portrait" },
  { src: `${VID}/g450-dwc-parked.mp4`, poster: `${POS}/g450-dwc-parked.webp`, alt: "Gulfstream G450 parked at Dubai World Central", category: "Gulfstream G450", caption: "G450 — On Stand at DWC", orientation: "portrait" },
  { src: `${VID}/g450-dubai-charter.mp4`, poster: `${POS}/g450-dubai-charter.webp`, alt: "Gulfstream G450 Dubai charter film", category: "Gulfstream G450", caption: "G450 — Dubai Charter", orientation: "portrait" },
  { src: `${VID}/g450-showcase-reel.mp4`, poster: `${POS}/g450-showcase-reel.webp`, alt: "Gulfstream G450 showcase film", category: "Gulfstream G450", caption: "G450 — Showcase", orientation: "portrait" },
  { src: `${VID}/g450-reel-feb.mp4`, poster: `${POS}/g450-reel-feb.webp`, alt: "Gulfstream G450 cabin film", category: "Gulfstream G450", caption: "G450 — Cabin Film", orientation: "portrait" },
  { src: `${VID}/g450-executive-reel-1.mp4`, poster: `${POS}/g450-executive-reel-1.webp`, alt: "Executive boarding the Gulfstream G450", category: "Gulfstream G450", caption: "G450 — Executive Arrival", orientation: "portrait" },
  { src: `${VID}/g450-executive-reel-2.mp4`, poster: `${POS}/g450-executive-reel-2.webp`, alt: "Executive working aboard the Gulfstream G450", category: "Gulfstream G450", caption: "G450 — Working Onboard", orientation: "portrait" },
  { src: `${VID}/g450-owners-seat.mp4`, poster: `${POS}/g450-owners-seat.webp`, alt: "Owner's seat aboard the Gulfstream G450", category: "Gulfstream G450", caption: "G450 — The Owner's Seat", orientation: "portrait" },
  { src: `${VID}/g450-dinner-setup.mp4`, poster: `${POS}/g450-dinner-setup.webp`, alt: "Dinner service being set aboard the G450", category: "Gulfstream G450", caption: "G450 — Dinner for Four", orientation: "portrait" },
  { src: `${VID}/g450-table-timelapse.mp4`, poster: `${POS}/g450-table-timelapse.webp`, alt: "Table setting timelapse aboard the G450", category: "Gulfstream G450", caption: "G450 — Table Setting", orientation: "portrait" },
  { src: `${VID}/g450-night-service.mp4`, poster: `${POS}/g450-night-service.webp`, alt: "Evening service aboard the Gulfstream G450", category: "Gulfstream G450", caption: "G450 — Evening Service", orientation: "portrait" },
  { src: `${VID}/g450-night-window.mp4`, poster: `${POS}/g450-night-window.webp`, alt: "Night flight aboard the Gulfstream G450", category: "Gulfstream G450", caption: "G450 — Night Flight", orientation: "portrait" },
  { src: `${VID}/g450-rest-onboard.mp4`, poster: `${POS}/g450-rest-onboard.webp`, alt: "Resting in the aft stateroom of the G450", category: "Gulfstream G450", caption: "G450 — Rest En Route", orientation: "portrait" },
  { src: `${VID}/g450-night-landing.mp4`, poster: `${POS}/g450-night-landing.webp`, alt: "Night landing seen from the cockpit", category: "Gulfstream G450", caption: "G450 — Night Landing", orientation: "portrait" },
  { src: `${VID}/g450-takeoff-cockpit.mp4`, poster: `${POS}/g450-takeoff-cockpit.webp`, alt: "T7-MID departing, seen from another cockpit", category: "Gulfstream G450", caption: "G450 — Departure", orientation: "portrait" },
  { src: `${VID}/g450-maldives.mp4`, poster: `${POS}/g450-maldives.webp`, alt: "Flying to the Maldives with Midline", category: "Gulfstream G450", caption: "G450 — Maldives Bound", orientation: "portrait" },
  { src: `${VID}/g450-welcome-aboard.mp4`, poster: `${POS}/g450-welcome-aboard.webp`, alt: "Welcome aboard the Gulfstream G450", category: "Gulfstream G450", caption: "G450 — Welcome Aboard", orientation: "portrait" },

  // ── Gulfstream G200 — film ──
  { src: `${VID}/g200-interior-tour.mp4`, poster: `${POS}/g200-interior-tour.webp`, alt: "Gulfstream G200 interior tour", category: "Gulfstream G200", caption: "G200 — Interior Tour", orientation: "portrait" },
  { src: `${VID}/g200-runway.mp4`, poster: `${POS}/g200-runway.webp`, alt: "Gulfstream G200 on the runway", category: "Gulfstream G200", caption: "G200 — Runway", orientation: "portrait" },
  { src: `${VID}/g200-night-arrival.mp4`, poster: `${POS}/g200-night-arrival.webp`, alt: "Gulfstream G200 night arrival at DWC", category: "Gulfstream G200", caption: "G200 — Night Arrival at DWC", orientation: "portrait" },
  { src: `${VID}/g200-reel-1.mp4`, poster: `${POS}/g200-reel-1.webp`, alt: "Gulfstream G200 film", category: "Gulfstream G200", caption: "G200 — Fleet Film", orientation: "portrait" },
  { src: `${VID}/g200-reel-5.mp4`, poster: `${POS}/g200-reel-5.webp`, alt: "Guest aboard the Gulfstream G200", category: "Gulfstream G200", caption: "G200 — Onboard", orientation: "portrait" },
  { src: `${VID}/g200-lifestyle-reel.mp4`, poster: `${POS}/g200-lifestyle-reel.webp`, alt: "Lifestyle film aboard the Gulfstream G200", category: "Gulfstream G200", caption: "G200 — The Experience", orientation: "portrait" },

  // ── Embraer Legacy 650 — film ──
  { src: `${VID}/legacy650-showcase-1.mp4`, poster: `${POS}/legacy650-showcase-1.webp`, alt: "Embraer Legacy 650 showcase film", category: "Embraer Legacy 650", caption: "Legacy 650 — Showcase", orientation: "portrait" },
  { src: `${VID}/legacy650-showcase-2.mp4`, poster: `${POS}/legacy650-showcase-2.webp`, alt: "Embraer Legacy 650 in flight", category: "Embraer Legacy 650", caption: "Legacy 650 — In Flight", orientation: "portrait" },
  { src: `${VID}/legacy650-carousel-1.mp4`, poster: `${POS}/legacy650-carousel-1.webp`, alt: "Embraer Legacy 650 exterior film", category: "Embraer Legacy 650", caption: "Legacy 650 — T7-MIDB", orientation: "portrait" },
  { src: `${VID}/legacy650-carousel-2.mp4`, poster: `${POS}/legacy650-carousel-2.webp`, alt: "Embraer Legacy 650 with ground transport", category: "Embraer Legacy 650", caption: "Legacy 650 — Ramp Side", orientation: "portrait" },
  { src: `${VID}/legacy650-carousel-3.mp4`, poster: `${POS}/legacy650-carousel-3.webp`, alt: "Embraer Legacy 650 under Dubai skies", category: "Embraer Legacy 650", caption: "Legacy 650 — Dubai Skies", orientation: "portrait" },
  { src: `${VID}/legacy650-clip-1.mp4`, poster: `${POS}/legacy650-clip-1.webp`, alt: "Embraer Legacy 650 on the ramp", category: "Embraer Legacy 650", caption: "Legacy 650 — On the Ramp", orientation: "portrait" },
  { src: `${VID}/legacy650-clip-2.mp4`, poster: `${POS}/legacy650-clip-2.webp`, alt: "Embraer Legacy 650 taxiing", category: "Embraer Legacy 650", caption: "Legacy 650 — Taxi Out", orientation: "portrait" },
  { src: `${VID}/legacy650-clip-3.mp4`, poster: `${POS}/legacy650-clip-3.webp`, alt: "Embraer Legacy 650 with chauffeur service", category: "Embraer Legacy 650", caption: "Legacy 650 — Chauffeur Service", orientation: "portrait" },
  { src: `${VID}/legacy650-dwc-reel.mp4`, poster: `${POS}/legacy650-dwc-reel.webp`, alt: "Embraer Legacy 650 at Dubai World Central", category: "Embraer Legacy 650", caption: "Legacy 650 — At DWC", orientation: "portrait" },
  { src: `${VID}/legacy650-window-view.mp4`, poster: `${POS}/legacy650-window-view.webp`, alt: "Legacy 650 seen from the T7-MID cabin window", category: "Embraer Legacy 650", caption: "Legacy 650 — Fleet Rendezvous", orientation: "portrait" },

  // ── Midline moments ──
  { src: `${VID}/midline-airshow-2025.mp4`, poster: `${POS}/midline-airshow-2025.webp`, alt: "Midline team at the Dubai Airshow 2025", category: "Services", caption: "Midline — Dubai Airshow 2025", orientation: "portrait" },
  { src: `${VID}/midline-festive-2025.mp4`, poster: `${POS}/midline-festive-2025.webp`, alt: "Midline festive season film", category: "Services", caption: "Midline — Festive Season", orientation: "portrait" },
  { src: `${VID}/midline-national-day.mp4`, poster: `${POS}/midline-national-day.webp`, alt: "Midline celebrating UAE National Day", category: "Services", caption: "Midline — UAE National Day", orientation: "portrait" },
];

const CATEGORIES = ["All", "Embraer Legacy 650", "Gulfstream G450", "Gulfstream G200", "Services", "Videos"];

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
      ? GALLERY_ITEMS
      : activeCategory === "Videos"
        ? GALLERY_ITEMS.filter((item) => item.poster)
        : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

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
      // Cast: Plyr accepts `autoplay` at runtime; glightbox's Config type doesn't declare it.
      lightbox = GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: true,
        openEffect: "fade",
        closeEffect: "fade",
        // Our gallery films are all portrait 9:16 — a narrower player plus a
        // matching ratio keeps them inside the viewport without letterboxing.
        videosWidth: "min(380px, 88vw)",
        plyr: {
          config: { autoplay: true, ratio: "9:16" },
        },
      } as Parameters<typeof GLightbox>[0]);
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
          Explore our fleet — exterior, interior, in-flight photography &amp; film.
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

      {/* Masonry grid — CSS columns so portrait and landscape cells pack tightly */}
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div ref={gridRef} data-reveal-item className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {filtered.map((item) => {
            const aspect = item.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]";
            const overlay = (
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">{item.category}</p>
                  <p className="mt-0.5 text-sm font-medium text-white">{item.caption}</p>
                </div>
              </div>
            );

            if (item.poster) {
              return (
                <a
                  key={item.src}
                  href={item.src}
                  aria-label={`Play video: ${item.alt}`}
                  className={`glightbox group relative mb-5 block break-inside-avoid overflow-hidden rounded-2xl bg-gray-100 ${aspect}`}
                  data-gallery="midline-gallery"
                  data-description={item.caption}
                  data-type="video"
                  data-source="local"
                >
                  <AutoplayVideo
                    src={item.src}
                    poster={item.poster}
                    aria-hidden
                    tabIndex={-1}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                  <span
                    aria-hidden
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                  >
                    <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                  </span>
                  {overlay}
                </a>
              );
            }

            return (
              <a
                key={item.src}
                href={item.src}
                className={`glightbox group relative mb-5 block break-inside-avoid overflow-hidden rounded-2xl bg-gray-100 ${aspect}`}
                data-gallery="midline-gallery"
                data-description={item.caption}
                data-type="image"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {overlay}
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}

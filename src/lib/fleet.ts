/**
 * Single source of truth for the Midline fleet. Consumed by the /fleet/[slug]
 * pages, sitemap, footer, home fleet cards, and the comparison section links.
 */

export interface JetSpec {
  label: string;
  /** Numeric portion for the CountUp animation. */
  value: number;
  decimals?: number;
  unit: string;
  note: string;
  /** Render as-is (no count-up) — used for non-numeric values like cabin height. */
  displayValue?: string;
}

export interface JetImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait";
  /** Editorial grid hint. */
  span?: "wide" | "tall" | "standard";
}

export interface Jet {
  slug: "gulfstream-g450" | "gulfstream-g200" | "embraer-legacy-650";
  name: string;
  tail: string;
  category: string;
  tagline: string;
  description: string[];
  specs: JetSpec[];
  hero: {
    video?: { src: string; poster: string };
    image: JetImage;
  };
  gallery: JetImage[];
  verticalVideo?: { src: string; poster: string; heading: string; caption: string };
  ogImage: string;
  seo: { title: string; description: string; keywords: string[] };
}

export const JETS: Jet[] = [
  {
    slug: "gulfstream-g450",
    name: "Gulfstream G450",
    tail: "T7-MID",
    category: "Large Jet",
    tagline: "Intercontinental range, a hand-finished cabin, and the quietest way to cross continents.",
    description: [
      "The Gulfstream G450 is the flagship of the Midline fleet — a long-range business jet renowned for its advanced avionics, whisper-quiet cabin, and uncompromising reliability. T7-MID's interior has been finished to a bespoke standard, from hand-stitched seating to a full in-flight dining service.",
      "With transoceanic reach and seating for fourteen, the G450 is equally at home on a Dubai–London business day or a multi-leg family itinerary. Every charter is supported by Midline's own flight operations and concierge teams.",
    ],
    specs: [
      { label: "Max Range", value: 4350, unit: "nm", note: "Transoceanic" },
      { label: "Cruising Speed", value: 476, unit: "kts", note: "Mach 0.88" },
      { label: "Passengers", value: 14, unit: "", note: "Three living zones" },
      { label: "Cabin Height", value: 0, unit: "", note: "Stand-up cabin", displayValue: "6'2\"" },
      { label: "Baggage", value: 169, unit: "cu ft", note: "Full wardrobe hold" },
    ],
    hero: {
      image: {
        src: "/assets/images/aircraft/g450-hero.webp",
        alt: "Gulfstream G450 T7-MID head-on on the Dubai ramp",
        width: 1920,
        height: 1440,
        orientation: "landscape",
      },
    },
    gallery: [
      { src: "/assets/images/aircraft/g450-cabin-wide.webp", alt: "Gulfstream G450 cabin aisle with hand-stitched seating", width: 1920, height: 1283, orientation: "landscape", span: "wide" },
      { src: "/assets/images/aircraft/g450-cabin-seat.webp", alt: "Signature cushioned armchair aboard the G450", width: 1280, height: 1707, orientation: "portrait", span: "tall" },
      { src: "/assets/images/aircraft/g450-cabin-lounge.webp", alt: "Aft lounge sofa and entertainment suite", width: 1600, height: 1069, orientation: "landscape" },
      { src: "/assets/images/aircraft/g450-cockpit.webp", alt: "G450 flight deck with Midline crew at cruise", width: 1280, height: 1707, orientation: "portrait", span: "tall" },
      { src: "/assets/images/aircraft/g450-cabin-dining.webp", alt: "In-flight dining table dressed with fresh flowers", width: 1600, height: 1069, orientation: "landscape" },
      { src: "/assets/images/aircraft/g450-lifestyle-dining.webp", alt: "Guest enjoying full-service dining aboard the G450", width: 1600, height: 1069, orientation: "landscape" },
      { src: "/assets/images/aircraft/g450-detail-macarons.webp", alt: "Patisserie service detail by the cabin window", width: 1080, height: 1618, orientation: "portrait", span: "tall" },
      { src: "/assets/images/aircraft/g450-cabin-forward.webp", alt: "Forward club seating with Hermès cushions", width: 1600, height: 1069, orientation: "landscape" },
      { src: "/assets/images/aircraft/g450-night.webp", alt: "Boarding the G450 under night floodlights", width: 1280, height: 1707, orientation: "portrait", span: "tall" },
      { src: "/assets/images/aircraft/g450-lavatory.webp", alt: "Marble-finished lavatory aboard the G450", width: 1080, height: 1920, orientation: "portrait", span: "tall" },
      { src: "/assets/images/aircraft/g450-cabin-club.webp", alt: "Club seating with fresh fruit service", width: 1600, height: 1069, orientation: "landscape" },
      { src: "/assets/images/aircraft/g450-detail.webp", alt: "Rolls-Royce Tay engine nacelle detail", width: 1280, height: 1707, orientation: "portrait", span: "tall" },
    ],
    verticalVideo: {
      src: "/assets/videos/g450-walkthrough-9x16.mp4",
      poster: "/assets/images/aircraft/g450-walkthrough-poster.webp",
      heading: "Step aboard T7-MID",
      caption: "A full cabin walkthrough — three living zones, dining for four, and a private aft stateroom.",
    },
    ogImage: "/assets/og/og-gulfstream-g450.jpg",
    seo: {
      title: "Gulfstream G450 Private Jet Charter (T7-MID)",
      description:
        "Charter the Gulfstream G450 T7-MID with Midline Aviation — 4,350 nm range, 14 passengers, hand-finished cabin, and full concierge service from Dubai.",
      keywords: ["Gulfstream G450 charter", "G450 private jet", "T7-MID", "large jet charter Dubai"],
    },
  },
  {
    slug: "gulfstream-g200",
    name: "Gulfstream G200",
    tail: "T7-MIDA",
    category: "Super Midsize",
    tagline: "Super-midsize efficiency with a couture cabin — the connoisseur's regional jet.",
    description: [
      "The Gulfstream G200 pairs super-midsize economics with a cabin finished like a private salon. T7-MIDA's interior was photographed for our brand campaigns for good reason: hand-appointed seating, a curated galley, and detailing that rivals jets twice its size.",
      "Ideal for regional missions across the Gulf, Europe, and the subcontinent, the G200 delivers quick turnarounds and disciplined operating costs without compromising the Midline standard of service.",
    ],
    specs: [
      { label: "Max Range", value: 3400, unit: "nm", note: "Cross-country" },
      { label: "Cruising Speed", value: 459, unit: "kts", note: "Mach 0.80" },
      { label: "Passengers", value: 9, unit: "", note: "Club configuration" },
      { label: "Cabin Height", value: 0, unit: "", note: "Stand-up cabin", displayValue: "6'3\"" },
      { label: "Baggage", value: 150, unit: "cu ft", note: "Ski-length hold" },
    ],
    hero: {
      video: { src: "/assets/videos/g200-showcase.mp4", poster: "/assets/images/aircraft/g200-exterior.webp" },
      image: {
        src: "/assets/images/aircraft/g200-exterior.webp",
        alt: "Gulfstream G200 T7-MIDA in front of the Midline hangar",
        width: 1920,
        height: 1012,
        orientation: "landscape",
      },
    },
    gallery: [
      { src: "/assets/images/aircraft/g200-cabin.webp", alt: "G200 cabin lounge with bespoke cushions", width: 1600, height: 843, orientation: "landscape", span: "wide" },
      { src: "/assets/images/aircraft/g200-cabin-portrait.webp", alt: "Cabin aisle with hand-appointed seating", width: 1280, height: 1920, orientation: "portrait", span: "tall" },
      { src: "/assets/images/aircraft/g200-lounge-lifestyle.webp", alt: "Guest lounge before boarding T7-MIDA", width: 1920, height: 1281, orientation: "landscape" },
      { src: "/assets/images/aircraft/g200-dining-detail.webp", alt: "Window-side dining with cocktails and fruit", width: 1080, height: 1620, orientation: "portrait", span: "tall" },
      { src: "/assets/images/aircraft/g200-galley-detail.webp", alt: "Curated galley detail with gold fixtures", width: 1600, height: 1068, orientation: "landscape" },
      { src: "/assets/images/aircraft/g200-cabin-seats.webp", alt: "Leather club seats with fruit service", width: 1280, height: 1919, orientation: "portrait", span: "tall" },
      { src: "/assets/images/aircraft/g200-lifestyle-couple.webp", alt: "Guests at ease in the G200 cabin", width: 1600, height: 1068, orientation: "landscape" },
      { src: "/assets/images/aircraft/g200-window-sunset.webp", alt: "Wing over the horizon at sunset", width: 1080, height: 721, orientation: "landscape" },
      { src: "/assets/images/aircraft/g200-lifestyle-dining.webp", alt: "Dinner service aboard the G200", width: 1280, height: 1920, orientation: "portrait", span: "tall" },
      { src: "/assets/images/aircraft/g200-cabin-2.webp", alt: "Forward cabin in warm evening light", width: 1600, height: 843, orientation: "landscape" },
      { src: "/assets/images/aircraft/g200-lifestyle-toast.webp", alt: "A toast between guests mid-flight", width: 1280, height: 1600, orientation: "portrait", span: "tall" },
    ],
    verticalVideo: {
      src: "/assets/videos/g200-interior-9x16.mp4",
      poster: "/assets/images/aircraft/g200-interior-poster.webp",
      heading: "Inside T7-MIDA",
      caption: "A slow pass through the salon cabin — couture seating, curated galley, warm light.",
    },
    ogImage: "/assets/og/og-gulfstream-g200.jpg",
    seo: {
      title: "Gulfstream G200 Private Jet Charter (T7-MIDA)",
      description:
        "Charter the Gulfstream G200 T7-MIDA with Midline Aviation — super-midsize performance, 3,400 nm range, and a couture cabin for nine.",
      keywords: ["Gulfstream G200 charter", "super midsize jet", "T7-MIDA", "regional jet charter Dubai"],
    },
  },
  {
    slug: "embraer-legacy-650",
    name: "Embraer Legacy 650",
    tail: "T7-MIDB",
    category: "Heavy Jet",
    tagline: "Three cabin zones, a 240 cu ft hold, and heavy-jet comfort for thirteen.",
    description: [
      "The Embraer Legacy 650 is Midline's heavy-jet workhorse: three distinct cabin zones, a full galley, and the largest baggage hold in its class. T7-MIDB flies extended business and diplomatic missions with the composure only a heavy jet provides.",
      "From Dubai, the Legacy 650 comfortably reaches London, Singapore, or Cape Town — with a cabin that lets a full delegation work, dine, and rest en route.",
    ],
    specs: [
      { label: "Max Range", value: 3900, unit: "nm", note: "Intercontinental" },
      { label: "Cruising Speed", value: 459, unit: "kts", note: "Mach 0.80" },
      { label: "Passengers", value: 13, unit: "", note: "Three cabin zones" },
      { label: "Cabin Height", value: 0, unit: "", note: "Stand-up cabin", displayValue: "6'0\"" },
      { label: "Baggage", value: 240, unit: "cu ft", note: "Largest in class" },
    ],
    hero: {
      // Photo hero by design — the only landscape Legacy video is a render, not T7-MIDB.
      image: {
        src: "/assets/images/aircraft/legacy650-exterior.webp",
        alt: "Embraer Legacy 650 T7-MIDB on the tarmac at Dubai World Central",
        width: 1920,
        height: 2561,
        orientation: "portrait",
      },
    },
    gallery: [
      { src: "/assets/images/aircraft/legacy650-cabin-wide.webp", alt: "Legacy 650 principal cabin zone", width: 1920, height: 1098, orientation: "landscape", span: "wide" },
      { src: "/assets/images/aircraft/legacy650-cabin-portrait.webp", alt: "Cabin sideboard dressed with sunflowers", width: 1280, height: 1707, orientation: "portrait", span: "tall" },
      { src: "/assets/images/aircraft/legacy650-window-view.webp", alt: "T7-MIDB seen through a cabin porthole", width: 1280, height: 1707, orientation: "portrait", span: "tall" },
      { src: "/assets/images/aircraft/legacy650-exterior-rear.webp", alt: "Rear three-quarter view at the hangar", width: 1280, height: 1707, orientation: "portrait", span: "tall" },
      { src: "/assets/images/aircraft/legacy650-cabin-collage.webp", alt: "Cabin zones of the Legacy 650", width: 1280, height: 1707, orientation: "portrait", span: "tall" },
      { src: "/assets/images/aircraft/legacy650-exterior-2.webp", alt: "Legacy 650 side profile under dramatic sky", width: 1280, height: 1600, orientation: "portrait", span: "tall" },
    ],
    verticalVideo: {
      src: "/assets/videos/legacy650-walk-9x16.mp4",
      poster: "/assets/images/aircraft/legacy650-walk-poster.webp",
      heading: "Walk through T7-MIDB",
      caption: "From the airstair to the aft suite — three zones of heavy-jet calm.",
    },
    ogImage: "/assets/og/og-embraer-legacy-650.jpg",
    seo: {
      title: "Embraer Legacy 650 Private Jet Charter (T7-MIDB)",
      description:
        "Charter the Embraer Legacy 650 T7-MIDB with Midline Aviation — heavy-jet comfort for 13, three cabin zones, 3,900 nm range, 240 cu ft baggage hold.",
      keywords: ["Embraer Legacy 650 charter", "heavy jet charter", "T7-MIDB", "long range private jet Dubai"],
    },
  },
];

export function getJet(slug: string): Jet | undefined {
  return JETS.find((jet) => jet.slug === slug);
}

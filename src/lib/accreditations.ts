export type Accreditation = {
  id: string;
  src: string;
  /** Full organisation name — used for alt text and accessibility. */
  name: string;
  shortName: string;
  kind: "rating" | "membership" | "authority";
  /**
   * Launch toggle. Unverified credentials ship disabled and are enabled here
   * once ops provides the certificate — no component changes needed.
   */
  enabled: boolean;
};

export const ACCREDITATIONS: Accreditation[] = [
  {
    id: "is-bao",
    src: "/assets/images/accreditations/is-bao.webp",
    name: "IS-BAO — International Standard for Business Aircraft Operations",
    shortName: "IS-BAO",
    kind: "rating",
    enabled: true,
  },
  {
    id: "nbaa",
    src: "/assets/images/accreditations/nbaa.webp",
    name: "NBAA — National Business Aviation Association",
    shortName: "NBAA",
    kind: "membership",
    enabled: true,
  },
  {
    id: "aopa",
    src: "/assets/images/accreditations/aopa.webp",
    name: "AOPA — Aircraft Owners and Pilots Association",
    shortName: "AOPA",
    kind: "membership",
    enabled: true,
  },
  {
    // Pending: confirm whether the membership is BACA or MEBAA before labelling.
    id: "air-charter-association",
    src: "/assets/images/accreditations/air-charter-association.webp",
    name: "The Air Charter Association",
    shortName: "The Air Charter Association",
    kind: "membership",
    enabled: false,
  },
  {
    // Pending: certificate and level (Wingman vs Registered) not yet verified.
    id: "wyvern",
    src: "/assets/images/accreditations/wyvern.webp",
    name: "WYVERN",
    shortName: "WYVERN",
    kind: "rating",
    enabled: false,
  },
  {
    // Not in the ops brief; fleet operates under the San Marino registry.
    id: "caa-cayman",
    src: "/assets/images/accreditations/caa-cayman.webp",
    name: "Civil Aviation Authority of the Cayman Islands",
    shortName: "CAA Cayman Islands",
    kind: "authority",
    enabled: false,
  },
];

export const enabledAccreditations = ACCREDITATIONS.filter((a) => a.enabled);

export const enabledMemberships = enabledAccreditations.filter((a) => a.kind === "membership");

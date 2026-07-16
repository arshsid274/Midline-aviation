import type { Metadata } from "next";
import { BadgeCheck, FileCheck2, ShieldCheck, Users, Wrench } from "lucide-react";
import { buildBreadcrumbSchema, buildPageMetadata, CONTACT_EMAIL } from "@/lib/seo";
import { enabledMemberships } from "@/lib/accreditations";
import Reveal from "@/app/components/motion/Reveal";
import SplitHeading from "@/app/components/motion/SplitHeading";

// Copy sourced from the ops information-request workbook (Jul 2026).
// Fields the workbook marks [PENDING] (AOC number/dates, insurance limit,
// Part 145 standard, pilot minimums, WYVERN level) are intentionally omitted —
// add them here once ops confirms; do not scaffold empty labels.

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Safety & Certifications",
  description:
    "How Midline Aviation flights are operated: Titan Aviation AOC (San Marino registry), IS-BAO standard operations, comprehensive liability insurance, and maintained, current-CofA aircraft.",
  path: "/safety",
  keywords: [
    "private jet safety Dubai",
    "IS-BAO charter operator",
    "Titan Aviation AOC",
    "private charter certifications",
  ],
});

const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Safety & Certifications", path: "/safety" }]);

const operatorFacts = [
  { label: "Registered operator on AOC", value: "Titan Aviation" },
  { label: "Issuing authority", value: "Civil Aviation Authority of San Marino" },
  { label: "Authorisation", value: "Private charter operations" },
];

const maintenanceFacts = [
  { icon: Wrench, label: "Maintenance", value: "Carried out by Titan Aviation" },
  { icon: FileCheck2, label: "Airworthiness", value: "Current Certificates of Airworthiness across the fleet" },
  { icon: Users, label: "Flight crew", value: "Recurrent training programmes" },
];

export default function SafetyPage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Hero ── */}
      <section className="bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:px-16">
        <div className="mx-auto w-full max-w-[1180px]">
          <Reveal as="div" on="load" variant="stagger" stagger={0.12}>
            <p data-reveal-item className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00bcff]">
              Safety &amp; Certifications
            </p>
            <SplitHeading
              as="h1"
              mode="lcp"
              on="load"
              className="font-display mt-4 max-w-3xl text-4xl font-medium leading-[1.1] text-white sm:text-5xl"
            >
              Safety is the standard, not the amenity.
            </SplitHeading>
            <p data-reveal-item className="mt-5 max-w-2xl text-base leading-8 text-white/75">
              Every Midline Aviation charter is flown under a certificated operator, audited operating
              standards, and comprehensive insurance — here is exactly how our flights are run.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Operator status ── */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-16">
        <Reveal
          as="div"
          variant="stagger"
          stagger={0.14}
          className="mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
        >
          <div data-reveal-item>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a6ea4]">Operator Status</p>
            <h2 className="font-display mt-3 text-3xl font-medium text-[#0d1c32] sm:text-4xl">
              Flown under a certificated operator.
            </h2>
          </div>
          <div data-reveal-item>
            <p className="text-base leading-8 text-[#44474d] sm:text-lg">
              Midline Aviation arranges and manages private charter flights operated under the Air
              Operator Certificate (AOC) of Titan Aviation, registered with the Civil Aviation Authority
              of San Marino. The AOC authorises private charter operations.
            </p>
            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              {operatorFacts.map((fact) => (
                <div key={fact.label} className="rounded-lg border border-[#d8e3fa] bg-[#f9f9ff] p-4">
                  <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#0a6ea4]">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold leading-snug text-[#0d1c32]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      {/* ── Safety ratings & audits ── */}
      <section className="bg-[#f9f9ff] px-4 py-16 sm:px-6 sm:py-20 lg:px-16">
        <div className="mx-auto w-full max-w-[1180px]">
          <Reveal as="div" variant="fade-up" className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a6ea4]">
              Safety Ratings &amp; Audits
            </p>
            <h2 className="font-display mt-3 text-3xl font-medium text-[#0d1c32] sm:text-4xl">
              Audited operating standards.
            </h2>
          </Reveal>
          <Reveal
            as="div"
            variant="fade-up"
            className="mt-8 flex flex-col items-start gap-6 rounded-lg border border-[#d8e3fa] bg-white p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8"
          >
            <span className="inline-flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-[#0a6ea4] text-white">
              <ShieldCheck className="h-7 w-7" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-[#0d1c32]">IS-BAO</h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-7 text-[#44474d] sm:text-base">
                Our operations are conducted to the International Standard for Business Aircraft
                Operations (IS-BAO) — the global benchmark for business aviation safety management.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Memberships & affiliations — kept separate from ratings ── */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-16">
        <div className="mx-auto w-full max-w-[1180px]">
          <Reveal as="div" variant="fade-up" className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a6ea4]">
              Memberships &amp; Affiliations
            </p>
            <h2 className="font-display mt-3 text-3xl font-medium text-[#0d1c32] sm:text-4xl">
              Part of the business aviation community.
            </h2>
          </Reveal>
          <Reveal as="div" variant="stagger" stagger={0.1} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enabledMemberships.map((m) => (
              <div
                key={m.id}
                data-reveal-item
                className="flex items-center gap-5 rounded-lg border border-[#d8e3fa] bg-[#f9f9ff] p-5"
              >
                <span className="flex h-16 w-24 flex-none items-center justify-center rounded-lg bg-white px-2 shadow-[0_6px_16px_rgba(13,28,50,0.08)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.src} alt={m.name} loading="lazy" className="h-10 w-20 object-contain" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0d1c32]">{m.shortName}</p>
                  <p className="mt-0.5 text-xs leading-5 text-[#44474d]">{m.name}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Insurance ── */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-16">
        <Reveal
          as="div"
          variant="fade-up"
          className="mx-auto flex w-full max-w-[1180px] flex-col items-start gap-6 rounded-lg bg-[#0d1c32] p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-10"
        >
          <span className="inline-flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-[#00bcff] text-[#111a5a]">
            <BadgeCheck className="h-7 w-7" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00bcff]">Insurance</p>
            <p className="mt-2 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
              All flights are covered by comprehensive liability insurance arranged through Gallagher.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Maintenance & crew ── */}
      <section className="bg-[#f9f9ff] px-4 py-16 sm:px-6 sm:py-20 lg:px-16">
        <div className="mx-auto w-full max-w-[1180px]">
          <Reveal as="div" variant="fade-up" className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a6ea4]">
              Maintenance &amp; Crew
            </p>
            <h2 className="font-display mt-3 text-3xl font-medium text-[#0d1c32] sm:text-4xl">
              Maintained aircraft, current crews.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#44474d]">
              Aircraft maintenance is carried out by Titan Aviation. All aircraft hold current
              Certificates of Airworthiness, and flight crew complete recurrent training programmes.
            </p>
          </Reveal>
          <Reveal as="div" variant="stagger" stagger={0.1} className="mt-8 grid gap-4 sm:grid-cols-3">
            {maintenanceFacts.map(({ icon: Icon, label, value }) => (
              <div key={label} data-reveal-item className="rounded-lg border border-[#d8e3fa] bg-white p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0a6ea4]/10 text-[#0a6ea4]">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#0a6ea4]">
                  {label}
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug text-[#0d1c32]">{value}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Contact band ── */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-16">
        <Reveal as="div" variant="fade-up" className="mx-auto w-full max-w-[1180px] text-center">
          <h2 className="font-display text-2xl font-medium text-[#0d1c32] sm:text-3xl">
            Questions about how we operate?
          </h2>
          <p className="mt-3 text-base leading-8 text-[#44474d]">
            Write to <a className="font-semibold text-[#0a6ea4]" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{" "}
            — we are happy to walk you through our operating arrangements before you fly.
          </p>
        </Reveal>
      </section>
    </main>
  );
}

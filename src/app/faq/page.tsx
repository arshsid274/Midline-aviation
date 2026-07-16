import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildPageMetadata, CONTACT_EMAIL, SITE_URL } from "@/lib/seo";
import Reveal from "@/app/components/motion/Reveal";
import SplitHeading from "@/app/components/motion/SplitHeading";

// Q&A copy sourced from the ops information-request workbook (Jul 2026).
// The "what if Midline cancels / flight disruption" answer is marked
// NEEDS REWRITE by ops and is intentionally not published yet.

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers on booking lead times, payment methods, all-inclusive pricing, cancellation tiers, pets and smoking policies, catering, transfers, and the Dubai FBOs Midline Aviation uses.",
  path: "/faq",
  keywords: [
    "private jet charter FAQ",
    "private jet Dubai questions",
    "charter cancellation policy",
    "private jet payment methods",
  ],
});

const breadcrumbSchema = buildBreadcrumbSchema([{ name: "FAQ", path: "/faq" }]);

type QA = { q: string; a: string };
type FaqGroup = { heading: string; items: QA[] };

const FAQ_GROUPS: FaqGroup[] = [
  {
    heading: "Booking & Payment",
    items: [
      {
        q: "What is the minimum booking lead time?",
        a: "Flights can be arranged at extremely short notice — in some cases from as little as 30 minutes, subject to aircraft availability, routing, and permits.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfer, credit card, cash, and cryptocurrency.",
      },
      {
        q: "Which currencies can I pay in?",
        a: "AED, USD, and EUR.",
      },
      {
        q: "Is a deposit required to confirm a booking?",
        a: "Full payment is required upon confirmation of the booking.",
      },
      {
        q: "Are quoted prices all-inclusive?",
        a: "Yes — our quotes are fully all-inclusive, with no additional fees or taxes on top.",
      },
    ],
  },
  {
    heading: "Cancellation & Refunds",
    items: [
      {
        q: "What is your cancellation policy?",
        a: "Cancellation fees apply against the total charter price (invoice plus any non-refundable costs): 10% from signing of the contract; 50% within 7 days (168 hours) but more than 48 hours before scheduled departure; 75% within 48 hours but more than 24 hours before departure; and 100% within 24 hours of departure or in case of a no-show.",
      },
      {
        q: "How are refunds handled and how long do they take?",
        a: "Refunds are issued via the original payment method and are typically processed within 2–3 working days.",
      },
    ],
  },
  {
    heading: "Onboard & Policies",
    items: [
      {
        q: "Are pets allowed on board?",
        a: "Yes — pets are welcome in the cabin. A fee of USD 1,500 applies per pet. Please advise us at booking.",
      },
      {
        q: "What is your smoking policy?",
        a: "Smoking is permitted on board, subject to a USD 2,000 cleaning fee.",
      },
      {
        q: "What catering options do you offer?",
        a: "We offer both standard and VIP catering options, tailored to your preferences.",
      },
    ],
  },
  {
    heading: "Travel Logistics",
    items: [
      {
        q: "Do you arrange ground transport and airport transfers?",
        a: "Yes — ground transportation and airport transfers can be arranged on request.",
      },
      {
        q: "Do you provide passport and visa support?",
        a: "Passports and visas are the passenger's responsibility. We recommend confirming entry requirements for your destination before travel.",
      },
      {
        q: "Which airports and FBOs do you use in key hubs?",
        a: "In Dubai we operate from DWC (Falcon Aviation and ExecuJet FBOs) and DXB (Jet Aviation FBO).",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/faq#faq`,
  mainEntity: FAQ_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

export default function FaqPage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ── */}
      <section className="bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] px-4 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:px-16">
        <div className="mx-auto w-full max-w-[900px]">
          <Reveal as="div" on="load" variant="stagger" stagger={0.12}>
            <p data-reveal-item className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00bcff]">
              FAQ
            </p>
            <SplitHeading
              as="h1"
              mode="lcp"
              on="load"
              className="font-display mt-4 text-4xl font-medium leading-[1.1] text-white sm:text-5xl"
            >
              Frequently asked questions.
            </SplitHeading>
            <p data-reveal-item className="mt-5 max-w-2xl text-base leading-8 text-white/75">
              Booking, payment, policies, and logistics — the answers our clients ask for most. Anything
              else, we are one message away.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Q&A groups ── */}
      <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-16">
        <div className="mx-auto w-full max-w-[900px]">
          {FAQ_GROUPS.map((group, gi) => (
            <Reveal as="div" variant="fade-up" key={group.heading} className={gi === 0 ? "" : "mt-12 sm:mt-14"}>
              <h2 className="font-display text-2xl font-medium text-[#0d1c32] sm:text-3xl">{group.heading}</h2>
              <div className="mt-5 divide-y divide-[#e3e9f7] border-y border-[#e3e9f7]">
                {group.items.map((item) => (
                  <details key={item.q} className="group py-1">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
                      <span className="text-base font-semibold text-[#0d1c32] sm:text-lg">{item.q}</span>
                      <span
                        aria-hidden
                        className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#d8e3fa] text-[#0a6ea4] transition-transform duration-300 group-open:rotate-45"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </span>
                    </summary>
                    <p className="pb-5 pr-12 text-sm leading-7 text-[#44474d] sm:text-base sm:leading-8">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal as="div" variant="fade-up" className="mt-12 rounded-lg bg-[#0d1c32] p-7 text-center sm:mt-14 sm:p-9">
            <h2 className="font-display text-2xl font-medium text-white">Still have a question?</h2>
            <p className="mt-2 text-sm leading-7 text-white/72 sm:text-base">
              Our team answers around the clock at{" "}
              <a className="font-semibold text-[#00bcff]" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>{" "}
              — or use the booking form and we will come back with a tailored quote.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

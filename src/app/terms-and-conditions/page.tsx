import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildPageMetadata, CONTACT_EMAIL } from "@/lib/seo";
import LegalPage from "@/app/components/ui/LegalPage";

// ⚠️ DRAFT — requires management/legal sign-off before launch.

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms & Conditions",
  description: "Terms governing the use of the Midline Aviation website and enquiry services.",
  path: "/terms-and-conditions",
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Terms & Conditions", path: "/terms-and-conditions" },
]);

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LegalPage title="Terms & Conditions" updated="July 2026">
        <section>
          <h2>1. About these terms</h2>
          <p>
            These terms govern your use of the Midline Aviation website. By using the site you accept
            them. The website is operated by Midline Aviation [CONFIRM: legal entity name], Office 213,
            Building A5, Business Park, Dubai South, United Arab Emirates.
          </p>
        </section>

        <section>
          <h2>2. Website is informational — enquiries are not bookings</h2>
          <p>
            Content on this site (including fleet specifications, indicative route pricing shown in the
            marketplace, availability, and imagery) is provided for general information and marketing
            purposes only. Submitting a flight request or contact form is an enquiry, not a binding
            booking or offer capable of acceptance. All charters are subject to aircraft and crew
            availability, operational and regulatory approval, and a separately concluded charter
            agreement whose terms prevail over this website.
          </p>
        </section>

        <section>
          <h2>3. Pricing and specifications</h2>
          <p>
            Any prices displayed (for example, indicative marketplace route pricing) are estimates in AED
            unless stated otherwise, exclude items agreed case-by-case (such as catering, de-icing, or
            special handling), and may change without notice. Aircraft performance figures (range, speed,
            capacity, baggage) are typical manufacturer values and can vary with routing, load, and
            weather.
          </p>
        </section>

        <section>
          <h2>4. Cancellation terms</h2>
          <p>
            Should a confirmed flight be cancelled by the Charterer, a cancellation fee will be levied as
            follows against the full charter price (per Clause 19 of the charter agreement):
          </p>
          <ul>
            <li>
              From signing of contract: a cancellation fee of 10% of the total charter price (invoice
              plus any non-refundable costs).
            </li>
            <li>
              Within 168 hours (7 days) but more than 48 hours (2 days) before the scheduled departure
              time: a cancellation fee of 50% of the total charter price (invoice plus any non-refundable
              costs).
            </li>
            <li>
              Within 48 hours but more than 24 hours before the scheduled departure time: a cancellation
              fee of 75% of the total charter price (invoice plus any non-refundable costs).
            </li>
            <li>
              Within 24 hours of the scheduled departure time, or in case of a no-show: a cancellation
              fee of 100% of the total charter price.
            </li>
          </ul>
          <p>
            Refunds, where due, are issued via the original payment method and are typically processed
            within 2–3 working days.
          </p>
        </section>

        <section>
          <h2>5. Intellectual property</h2>
          <p>
            All photography, video, aircraft imagery (including the T7-MID, T7-MIDA, and T7-MIDB fleet
            media), logos, and text on this site belong to Midline Aviation or its licensors. You may not
            reproduce or reuse them without prior written permission.
          </p>
        </section>

        <section>
          <h2>6. Acceptable use</h2>
          <p>
            You agree not to misuse the site — including attempting to breach its security, scraping at
            disruptive volume, submitting false enquiries, or uploading unlawful content through any
            form.
          </p>
        </section>

        <section>
          <h2>7. Third-party links and services</h2>
          <p>
            The site links to third-party services (for example WhatsApp, Wikipedia, and aircraft
            manufacturer resources). We are not responsible for their content or practices.
          </p>
        </section>

        <section>
          <h2>8. Liability</h2>
          <p>
            To the maximum extent permitted by law, Midline Aviation accepts no liability for loss
            arising from reliance on website content or from interruption or unavailability of the site.
            Nothing in these terms limits liability that cannot be limited under applicable law. Rights
            and obligations relating to an actual charter are exclusively those set out in the signed
            charter agreement and applicable carriage conventions.
          </p>
        </section>

        <section>
          <h2>9. Governing law</h2>
          <p>
            These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of
            Dubai, and the courts of Dubai have exclusive jurisdiction. [CONFIRM: or DIFC courts, per
            management preference]
          </p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </section>
      </LegalPage>
    </>
  );
}

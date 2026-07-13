import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildPageMetadata, CONTACT_EMAIL } from "@/lib/seo";
import LegalPage from "@/app/components/ui/LegalPage";

// ⚠️ DRAFT — requires management/legal sign-off before launch.
// Placeholders needing confirmation are marked [CONFIRM: …].

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How Midline Aviation collects, uses, and protects your personal data, and your rights under the UAE PDPL and the EU GDPR.",
  path: "/privacy-policy",
});

const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Privacy Policy", path: "/privacy-policy" }]);

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LegalPage title="Privacy Policy" updated="July 2026">
        <section>
          <h2>1. Who we are</h2>
          <p>
            Midline Aviation [CONFIRM: full legal entity name and form, e.g. FZCO/LLC], trade license
            [CONFIRM: number], with its registered office at Office 213, Building A5, Business Park, Dubai
            South, United Arab Emirates (&ldquo;Midline Aviation&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), is the
            controller of personal data collected through this website. For any privacy matter, contact{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </section>

        <section>
          <h2>2. What we collect and why</h2>
          <h3>Flight enquiry &amp; booking request form</h3>
          <p>
            When you request a flight through our booking form we collect: first and last name, email
            address, phone number, trip type, departure and arrival airports, travel dates and times,
            passenger count, and preferred aircraft. We use this solely to respond to your enquiry and
            arrange the requested charter (GDPR basis: steps prior to entering a contract, Art. 6(1)(b)).
          </p>
          <h3>Contact form</h3>
          <p>
            Our contact page form asks for your name, email, phone, preferred aircraft type, destination,
            travel date, passenger count, and message, used to answer your enquiry (same basis as above).
          </p>
          <h3>Direct communication</h3>
          <p>
            If you contact us by phone, email, or WhatsApp, we process the contact details and content you
            choose to share. WhatsApp conversations are additionally governed by{" "}
            <a href="https://www.whatsapp.com/legal/privacy-policy" rel="noopener noreferrer" target="_blank">
              WhatsApp&rsquo;s own privacy policy
            </a>
            .
          </p>
          <h3>Usage analytics</h3>
          <p>
            With your consent, we use Microsoft Clarity to understand how visitors use the site (pages
            viewed, clicks, scrolling, session replays, approximate location, device and browser data,
            captured via cookies and similar technologies). Legal basis: consent (GDPR Art. 6(1)(a)),
            collected through our cookie banner. See our <a href="/cookie-policy">Cookie Policy</a>.
          </p>
        </section>

        <section>
          <h2>3. How your data is handled and shared</h2>
          <ul>
            <li>
              Form submissions are delivered to our operations inbox by email; we do not operate a public
              customer database on this website. [CONFIRM: any CRM/email tool where enquiries are stored,
              e.g. HubSpot/Mailchimp/spreadsheet]
            </li>
            <li>Processors: Microsoft (Clarity analytics), our email/hosting providers [CONFIRM: providers].</li>
            <li>We do not sell personal data, and no payment details are collected on this website.</li>
            <li>
              Data may be processed outside your country (including in the UAE, EU, and USA by the providers
              above); where GDPR applies, transfers rely on appropriate safeguards such as standard
              contractual clauses.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Retention</h2>
          <p>
            Enquiry correspondence is retained for [CONFIRM: e.g. 24 months] after your last interaction,
            unless a charter contract requires longer retention or law obliges us to keep records. Analytics
            data is retained per Microsoft Clarity&rsquo;s standard schedule.
          </p>
        </section>

        <section>
          <h2>5. Your rights</h2>
          <p>
            Under the UAE Personal Data Protection Law (Federal Decree-Law No. 45/2021) and, where
            applicable, the EU GDPR, you may request access to, correction or deletion of your personal
            data, object to or restrict processing, withdraw consent (e.g. for analytics cookies), and
            request data portability. Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>; we
            respond within the timelines required by law. EU/EEA residents may also complain to their local
            supervisory authority; UAE complaints may be directed to the UAE Data Office.
          </p>
        </section>

        <section>
          <h2>6. Children</h2>
          <p>
            This website is not directed at children, and we do not knowingly collect children&rsquo;s data
            online. Passenger details for minors travelling on a charter are collected off-site as part of
            the charter contract with the responsible adult.
          </p>
        </section>

        <section>
          <h2>7. Changes</h2>
          <p>
            We may update this policy from time to time; the date above reflects the latest version.
            Material changes will be highlighted on this page.
          </p>
        </section>
      </LegalPage>
    </>
  );
}

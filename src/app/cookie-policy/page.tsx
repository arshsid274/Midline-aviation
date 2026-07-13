import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildPageMetadata, CONTACT_EMAIL } from "@/lib/seo";
import LegalPage from "@/app/components/ui/LegalPage";

// ⚠️ DRAFT — requires management/legal sign-off before launch.

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Cookie Policy",
  description: "The cookies and similar technologies used on the Midline Aviation website and how to control them.",
  path: "/cookie-policy",
});

const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Cookie Policy", path: "/cookie-policy" }]);

export default function CookiePolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LegalPage title="Cookie Policy" updated="July 2026">
        <section>
          <h2>1. What cookies are</h2>
          <p>
            Cookies are small files stored on your device by your browser. We also use similar
            technologies such as local storage. This site sets no advertising cookies.
          </p>
        </section>

        <section>
          <h2>2. Cookies we use</h2>
          <h3>Strictly necessary</h3>
          <table>
            <thead>
              <tr><th>Name</th><th>Purpose</th><th>Duration</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>midline-cookie-consent (local storage)</td>
                <td>Remembers whether you accepted or declined analytics cookies.</td>
                <td>12 months</td>
              </tr>
            </tbody>
          </table>
          <h3>Analytics — Microsoft Clarity (only with your consent)</h3>
          <p>
            If you accept analytics in our banner, Microsoft Clarity sets cookies to help us understand
            how the site is used (heatmaps, session replays, aggregate behaviour):
          </p>
          <table>
            <thead>
              <tr><th>Name</th><th>Purpose</th><th>Typical duration</th></tr>
            </thead>
            <tbody>
              <tr><td>_clck</td><td>Persists the Clarity user ID and preferences.</td><td>12 months</td></tr>
              <tr><td>_clsk</td><td>Connects page views within a session.</td><td>1 day</td></tr>
              <tr><td>CLID</td><td>Identifies the first Clarity session.</td><td>12 months</td></tr>
              <tr><td>ANONCHK / SM / MR / MUID</td><td>Microsoft service cookies supporting Clarity.</td><td>Session – 13 months</td></tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>3. Managing cookies</h2>
          <ul>
            <li>
              Decline or withdraw analytics consent via our banner (clear the site&rsquo;s local storage to
              see the banner again), and analytics will not load.
            </li>
            <li>Browser settings let you block or delete cookies for any site.</li>
            <li>
              More on Clarity&rsquo;s handling of data:{" "}
              <a href="https://privacy.microsoft.com/privacystatement" rel="noopener noreferrer" target="_blank">
                Microsoft Privacy Statement
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Contact</h2>
          <p>
            Questions about cookies: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. See also our{" "}
            <a href="/privacy-policy">Privacy Policy</a>.
          </p>
        </section>
      </LegalPage>
    </>
  );
}

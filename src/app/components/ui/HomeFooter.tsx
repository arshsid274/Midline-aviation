"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX, SiYoutube } from "react-icons/si";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const aircraftLinks: FooterLink[] = [
  { label: "Embraer Legacy 650", href: "/fleet" },
  { label: "Gulfstream G450", href: "/fleet" },
  { label: "Gulfstream G200", href: "/fleet" },
  { label: "Bombardier Global 6000", href: "/fleet" },
  { label: "Pre-Owned", href: "/services/aircraft-sales" },
];

const ownershipLinks: FooterLink[] = [
  { label: "Fleet Support", href: "/services/aircraft-management" },
  { label: "Designing Your Flight", href: "/contact" },
  { label: "Customer Services", href: "/contact" },
  { label: "Updating Your Aircraft", href: "/services/mro" },
];

const aboutLinks: FooterLink[] = [
  { label: "Customer Portal", href: "https://www.midlineaviation.com", external: true },
  { label: "Midline Aviation", href: "/about" },
  { label: "Midline Group", href: "https://www.midlineaviation.com", external: true },
];

function FooterLinkItem({ item }: { item: FooterLink }) {
  const baseClasses =
    "inline-flex items-center gap-2 text-lg text-[#111a5a]/88 transition hover:text-[#016291]";

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={baseClasses}>
        <ExternalLink size={16} />
        <span>{item.label}</span>
      </a>
    );
  }

  return (
    <Link href={item.href} className={baseClasses}>
      {item.label}
    </Link>
  );
}

function FooterGroup({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-3xl font-semibold uppercase tracking-[0.14em] text-[#111a5a]">{title}</h3>
      <ul className="mt-7 space-y-6">
        {links.map((item) => (
          <li key={`${title}-${item.label}`}>
            <FooterLinkItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomeFooter() {
  return (
    <footer
      aria-label="Site footer"
      className="overflow-hidden border-t border-[#111a5a]/15 bg-white text-[#111a5a]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 pt-16 sm:px-10 lg:px-12 lg:pt-20">
        <div className="mb-16 flex items-center justify-center gap-4 lg:mb-20">
          
          <Image
            src="/assets/images/Midline_Airlines.png"
            alt="Midline Aviation"
            width={390}
            height={92}
            className="h-16 w-auto sm:h-20"
            priority={false}
          />
        </div>

        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_1fr] lg:gap-20">
          <FooterGroup title="Aircraft" links={aircraftLinks} />
          <FooterGroup title="Ownership" links={ownershipLinks} />

          <div>
            <FooterGroup title="About Us" links={aboutLinks} />
            <div className="mt-10 space-y-8">
              <Link
                href="/contact"
                className="block text-3xl font-semibold uppercase tracking-[0.14em] text-[#111a5a] transition hover:text-[#016291]"
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className="block text-3xl font-semibold uppercase tracking-[0.14em] text-[#111a5a] transition hover:text-[#016291]"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-[#111a5a]/15 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-[#111a5a]/70">&copy; {new Date().getFullYear()} Midline Aviation. All rights reserved.</p>
          <div className="flex items-center gap-5 text-[#111a5a]/70">
            <a
              href="https://x.com/midlineaviation"
              target="_blank"
              rel="noreferrer"
              aria-label="Midline Aviation on X"
              className="transition hover:text-[#016291]"
            >
              <SiX className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/midlineaviation/"
              target="_blank"
              rel="noreferrer"
              aria-label="Midline Aviation on Instagram"
              className="transition hover:text-[#016291]"
            >
              <SiInstagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/@midlineaviation"
              target="_blank"
              rel="noreferrer"
              aria-label="Midline Aviation on YouTube"
              className="transition hover:text-[#016291]"
            >
              <SiYoutube className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.facebook.com/midlineaviation"
              target="_blank"
              rel="noreferrer"
              aria-label="Midline Aviation on Facebook"
              className="transition hover:text-[#016291]"
            >
              <SiFacebook className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/company/midline-aviation/"
              target="_blank"
              rel="noreferrer"
              aria-label="Midline Aviation on LinkedIn"
              className="transition hover:text-[#016291]"
            >
              <SiLinkedin className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

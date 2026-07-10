import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { SITE_NAME } from "@/lib/seo";

const footerColumns = [
  {
    heading: "Aircraft",
    links: [
      { label: "Gulfstream G450", href: "/fleet/gulfstream-g450" },
      { label: "Gulfstream G200", href: "/fleet/gulfstream-g200" },
      { label: "Embraer Legacy 650", href: "/fleet/embraer-legacy-650" },
      { label: "View Full Fleet", href: "/fleet" },
      { label: "Pre-Owned", href: "/services/aircraft-sales" },
    ],
  },
  {
    heading: "Ownership",
    links: [
      { label: "Fleet Support", href: "/services/aircraft-management" },
      { label: "Designing Your Flight", href: "/services/aircraft-charter" },
      { label: "Customer Services", href: "/contact" },
      { label: "Updating Your Aircraft", href: "/services/aircraft-management" },
    ],
  },
  {
    heading: "About Us",
    links: [
      { label: "Customer Portal", href: "/contact" },
      { label: "Midline Aviation", href: "/about" },
      { label: "Midline Group", href: "/about" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Careers", href: "/contact" },
      { label: "Contact", href: "/contact" },
      { label: "Press Inquiries", href: "/contact" },
    ],
  },
] as const;

const socials = [
  { label: "X (formerly Twitter)", href: "#", Icon: Twitter },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "YouTube", href: "#", Icon: Youtube },
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
] as const;

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[#0A1120] px-6 pt-20 pb-12 text-[#94A3B8] md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Logo on a liquid-glass panel — the logo is dark navy, so a light frosted
            panel lifts it off the near-black footer while staying translucent. */}
        <div className="mb-16 flex justify-center">
          <Link href="/" aria-label={`${SITE_NAME} home`} className="group">
            <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-b from-white/90 to-white/70 px-8 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_14px_36px_-10px_rgba(0,0,0,0.55)] backdrop-blur-xl transition duration-300 group-hover:-translate-y-0.5 group-hover:from-white/95">
              {/* specular sheen */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent"
              />
              <Image
                src="/assets/images/Midline_Airlines.png"
                alt={SITE_NAME}
                width={734}
                height={340}
                className="relative h-11 w-auto object-contain sm:h-12"
              />
            </div>
          </Link>
        </div>

        {/* Link columns */}
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h3 className="mb-8 text-sm font-medium uppercase tracking-[0.2em] text-white">{column.heading}</h3>
              <ul className="space-y-4 text-sm font-light">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="link-underline text-[#94A3B8] transition-colors duration-300 hover:text-[#3B82F6]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between border-t border-[#1E293B] pt-8 text-xs md:flex-row">
          <div className="mb-6 flex items-center gap-4 md:mb-0">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-semibold text-white">
              M
            </span>
            <p>
              &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-[#94A3B8] transition-colors duration-300 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

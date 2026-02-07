"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const services = [
  { title: "Aircraft Charter", href: "/services/aircraft-charter" },
  { title: "Aircraft Management", href: "/services/aircraft-management" },
  { title: "Aircraft Sales", href: "/services/aircraft-sales" },
  { title: "Cargo Transportation", href: "/services/cargo-transportation" },
  { title: "MRO", href: "/services/mro" },
];

export default function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname?.startsWith(href));
  };

  return (
    <div className="flex items-center">
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="p-2 rounded-md text-foreground hover:bg-white/5"
      >
        <Menu size={20} />
      </button>

      {/* Slide-over panel (solid white, from left) */}
      <div
        aria-hidden={!open}
        className={`fixed top-0 left-0 h-full w-[80%] max-w-sm transform bg-white shadow-lg transition-transform duration-300 ease-in-out z-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <div />
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="p-2 rounded-md text-foreground hover:bg-white/5"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="px-6 py-2">
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block py-2"
                style={{ color: isActive("/") ? "var(--active-link)" : undefined }}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/fleet"
                onClick={() => setOpen(false)}
                className="block py-2"
                style={{ color: isActive("/fleet") ? "var(--active-link)" : undefined }}
              >
                Our Fleet
              </Link>
            </li>

            <li>
              <div className="py-2 font-medium">Services</div>
              <ul className="pl-4">
                {services.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      onClick={() => setOpen(false)}
                      className="block py-1 text-sm"
                      style={{ color: isActive(s.href) ? "var(--active-link)" : undefined }}
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="block py-2"
                style={{ color: isActive("/about") ? "var(--active-link)" : undefined }}
              >
                About
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block py-2"
                style={{ color: isActive("/contact") ? "var(--active-link)" : undefined }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/20 z-30"
        />
      )}
    </div>
  );
}

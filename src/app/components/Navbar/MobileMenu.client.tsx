"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";

const services = [
  { title: "Aircraft Charter", href: "/services/aircraft-charter" },
  { title: "Aircraft Management", href: "/services/aircraft-management" },
  { title: "Aircraft Sales", href: "/services/aircraft-sales" },
  { title: "Cargo Transportation", href: "/services/cargo-transportation" },
  { title: "MRO", href: "/services/mro" },
];

export default function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  const itemClasses = (active: boolean) =>
    `block rounded-xl px-3 py-2.5 text-base font-medium transition-colors ${
      active
        ? "bg-white/15 text-[#41b3b5]"
        : "text-white/90 hover:bg-white/10 hover:text-white"
    }`;

  const mobileMenuLayer = mounted
    ? createPortal(
        <>
          <aside
            id="mobile-nav-panel"
            aria-hidden={!open}
            className={`fixed inset-y-0 left-0 z-[70] flex w-[86vw] max-w-sm flex-col border-r border-white/20 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out ${
              open ? "translate-x-0" : "-translate-x-full pointer-events-none"
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">Navigation</p>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mt-3 flex-1 overflow-y-auto px-1 pb-6">
              <ul className="flex flex-col gap-1.5">
                <li>
                  <Link
                    href="/"
                    aria-current={isActive("/") ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={itemClasses(isActive("/"))}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/fleet"
                    aria-current={isActive("/fleet") ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={itemClasses(isActive("/fleet"))}
                  >
                    Our Fleet
                  </Link>
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Services</p>
                  <ul className="flex flex-col gap-1">
                    {services.map((service) => (
                      <li key={service.href}>
                        <Link
                          href={service.href}
                          aria-current={isActive(service.href) ? "page" : undefined}
                          onClick={() => setOpen(false)}
                          className={itemClasses(isActive(service.href))}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <Link
                    href="/contact"
                    aria-current={isActive("/contact") ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={itemClasses(isActive("/contact"))}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    aria-current={isActive("/about") ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={itemClasses(isActive("/about"))}
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          <button
            type="button"
            aria-label="Close menu backdrop"
            className={`fixed inset-0 z-[69] bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 ${
              open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={() => setOpen(false)}
          />
        </>,
        document.body
      )
    : null;

  return (
    <>
      <div className="flex items-center">
        <button
          type="button"
          aria-controls="mobile-nav-panel"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-lg p-2.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {mobileMenuLayer}
    </>
  );
}

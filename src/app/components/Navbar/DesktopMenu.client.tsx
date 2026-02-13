"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const services = [
  {
    title: "Aircraft Charter",
    href: "/services/aircraft-charter",
    description: "On-demand private and business jet charter services.",
  },
  {
    title: "Aircraft Management",
    href: "/services/aircraft-management",
    description: "End-to-end aircraft ownership and operational management.",
  },
  {
    title: "Aircraft Sales",
    href: "/services/aircraft-sales",
    description: "Buy and sell aircraft with expert advisory support.",
  },
  {
    title: "Cargo Transportation",
    href: "/services/cargo-transportation",
    description: "Reliable global air cargo and freight solutions.",
  },
  {
    title: "MRO",
    href: "/services/mro",
    description: "Maintenance, repair, and overhaul services.",
  },
]

export default function DesktopMenu() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href))
  }

  return (
    <NavigationMenu>
      <NavigationMenuList className="text-sm font-semibold lg:text-base">
        <NavigationMenuItem>
          <NavigationMenuLink asChild data-active={isActive("/") ? "true" : undefined}>
            <Link href="/" aria-current={isActive("/") ? "page" : undefined} className={navigationMenuTriggerStyle()}>
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild data-active={isActive("/fleet") ? "true" : undefined}>
            <Link
              href="/fleet"
              aria-current={isActive("/fleet") ? "page" : undefined}
              className={navigationMenuTriggerStyle()}
            >
              Our Fleet
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[min(92vw,36rem)] gap-3 p-3 md:p-4 lg:w-[40rem] lg:grid-cols-2">
              {services.map((service) => (
                <li key={service.title}>
                  <NavigationMenuLink
                    asChild
                    className="rounded-lg border border-border/60 bg-card/80 p-3 transition-colors hover:bg-card"
                    data-active={isActive(service.href) ? "true" : undefined}
                  >
                    <Link href={service.href} aria-current={isActive(service.href) ? "page" : undefined}>
                      <div className="text-sm font-semibold lg:text-base">{service.title}</div>
                      <p className="line-clamp-2 text-xs text-muted-foreground lg:text-sm">{service.description}</p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild data-active={isActive("/contact") ? "true" : undefined}>
            <Link
              href="/contact"
              aria-current={isActive("/contact") ? "page" : undefined}
              className={navigationMenuTriggerStyle()}
            >
              Contact
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild data-active={isActive("/about") ? "true" : undefined}>
            <Link
              href="/about"
              aria-current={isActive("/about") ? "page" : undefined}
              className={navigationMenuTriggerStyle()}
            >
              About Us
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

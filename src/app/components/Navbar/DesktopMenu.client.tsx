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
      <NavigationMenuList className="text-xl font-semibold">
        <NavigationMenuItem>
          <NavigationMenuLink asChild data-active={isActive("/") ? "true" : undefined}>
            <Link href="/" className={navigationMenuTriggerStyle()}>Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild data-active={isActive("/fleet") ? "true" : undefined}>
            <Link href="/fleet" className={navigationMenuTriggerStyle()}>Our Fleet</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
              {services.map((service) => (
                <li key={service.title}>
                  <NavigationMenuLink asChild data-active={isActive(service.href) ? "true" : undefined}>
                    <Link href={service.href}>
                      <div className="font-medium">{service.title}</div>
                      <p className="text-muted-foreground line-clamp-2">{service.description}</p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild data-active={isActive("/about") ? "true" : undefined}>
            <Link href="/about" className={navigationMenuTriggerStyle()}>About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild data-active={isActive("/contact") ? "true" : undefined}>
            <Link href="/contact" className={navigationMenuTriggerStyle()}>Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

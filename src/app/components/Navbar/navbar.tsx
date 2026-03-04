"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import DesktopMenu from "./DesktopMenu.client"
import MobileMenu from "./MobileMenu.client"
import BookFlightButton from "./BookFlightButton"

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  const isHome = pathname === "/"
  const isContact = pathname === "/contact"

  useEffect(() => {
    const getThreshold = () => {
      // On home page the animation section is 1200vh tall.
      // scrollableHeight = 1200vh − 1vh = 1199 × innerHeight.
      // Only switch colour after the user has scrolled through the full animation.
      if (isHome) return window.innerHeight * 1199
      return 16
    }

    const onScroll = () => {
      setIsScrolled(window.scrollY > getThreshold())
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [pathname, isHome])

  const useBlueTint = !isContact && (!isHome || isScrolled)

  return (
    <header
      data-site-navbar="true"
      className={`fixed top-0 left-0 z-50 w-full backdrop-blur-xl transition-all duration-500 ${
        useBlueTint
          ? "border-b border-[#88adf8]/25 bg-[linear-gradient(90deg,rgba(17,26,90,0.74)_0%,rgba(10,110,164,0.74)_100%)] shadow-[0_14px_36px_rgba(17,26,90,0.36)]"
          : "border-b border-white/15 bg-white/[0.06] shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:h-[76px] sm:px-6 md:h-[84px] lg:px-8"
      >
        <div className="w-10 sm:w-11 md:hidden" />

        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/Midline_Airlines.png"
            alt="Midline Aviation"
            width={150}
            height={40}
            sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 150px"
            className="h-9 w-auto sm:h-10 md:h-12 lg:h-14"
            priority
          />
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <DesktopMenu />
        </div>

        <div className="hidden md:flex md:items-center">
          <BookFlightButton />
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}

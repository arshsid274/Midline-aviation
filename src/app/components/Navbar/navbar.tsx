import Image from "next/image"
import Link from "next/link"
import DesktopMenu from "./DesktopMenu.client"
import MobileMenu from "./MobileMenu.client"
import BookFlightButton from "./BookFlightButton"

export default function Navbar() {
  return (
    <header
      data-site-navbar="true"
      className="fixed top-0 left-0 z-50 w-full border-b border-white/15  backdrop-blur-xl transition-all duration-500"
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

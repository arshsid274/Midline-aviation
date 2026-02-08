import Image from "next/image"
import Link from "next/link"
import DesktopMenu from "./DesktopMenu.client"
import MobileMenu from "./MobileMenu.client"

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/50 backdrop-blur-md border-b border-white/10 transition-all duration-500">
      <nav
        aria-label="Primary navigation"
        className="container mx-auto flex items-center justify-between "
      >
        <div className="w-10 md:hidden" />

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/Midline_Airlines.png"
            alt="Brand Name"
            width={150}
            height={40}
            className="w-auto h-22"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center">
          <DesktopMenu />
        </div>

        {/* Mobile Menu (hamburger) */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}
import Image from "next/image"
import Link from "next/link"
import DesktopMenu from "./DesktopMenu.client"

export default function Navbar() {
  return (
    <header className="border-b">
      <nav
        aria-label="Primary navigation"
        className="container mx-auto flex items-center "
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/Midline_Airlines.png"       // Path to your logo in /public
            alt="Brand Name"      // Alt text for SEO and accessibility
            width={150}           // Adjust based on your logo's aspect ratio
            height={40}           // Adjust based on your logo's aspect ratio
            className="h-26 w-auto" // Control height via CSS, let width scale
            priority              // Important: tells Next.js to load this first
          />
        </Link>

        {/* Desktop Menu */}
        <div className="flex-1 flex justify-center">
          <DesktopMenu />
        </div>
      </nav>
    </header>
  )
}
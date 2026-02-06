import DesktopMenu from "./DesktopMenu.client"
import Link from "next/link"

export default function Navbar() {
  return (
    <header className="border-b">
      <nav
        aria-label="Primary navigation"
        className="container mx-auto flex items-center py-6"
      >
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">
          Brand Name
        </Link>

        {/* Desktop Menu */}
        <div className="flex-1 flex justify-center">
          <DesktopMenu />
        </div>
      </nav>
    </header>
  )
}

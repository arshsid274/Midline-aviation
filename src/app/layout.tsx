import "./globals.css";
import type { Metadata, Viewport } from "next";
import Navbar from "./components/Navbar/navbar";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Luxury Aviation Services | Brand Name",
    template: "%s | Brand Name",
  },
  description: "Private jet charter, fleet management, and aviation services worldwide.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Brand Name",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background pt-[72px] md:pt-[84px]">
        <Navbar />
        {children}
        <footer className="border-t border-border/70 bg-background/95 px-4 py-6 text-center text-sm text-muted-foreground backdrop-blur-sm sm:px-6">
          &copy; {new Date().getFullYear()} Brand Name
        </footer>
      </body>
    </html>
  );
}

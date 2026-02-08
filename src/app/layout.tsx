import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar/navbar";

import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
      <body className="pt-14">
        <Navbar />
        {children}
        <footer className="p-6 text-center border-t">
          © {new Date().getFullYear()} Brand Name
        </footer>
      </body>
    </html>
  );
}

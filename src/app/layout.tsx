import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar/navbar";

export const metadata: Metadata = {
  title: {
    default: "Luxury Aviation Services | Brand Name",
    template: "%s | Brand Name",
  },
  description: "Private jet charter, fleet management, and aviation services worldwide.",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <footer className="p-6 text-center border-t">
          © {new Date().getFullYear()} Brand Name
        </footer>
      </body>
    </html>
  );
}

import { Playfair_Display, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

/**
 * The Midline type system — three voices, all self-hosted via next/font
 * (zero external requests, metric-adjusted fallbacks so nothing shifts):
 *
 *  display — Playfair Display   headlines & editorial statements (font-display)
 *  sans    — Hanken Grotesk     body & UI; the Swiss grotesque voice   (default)
 *  mono    — JetBrains Mono     tail numbers & technical data    (font-mono)
 *
 * Each exposes a CSS variable consumed by the @theme tokens in globals.css;
 * the variables are attached to <html> in layout.tsx.
 */

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
  // Adjusts the fallback font metrics so the layout doesn't shift when
  // the real font swaps in — eliminates CLS caused by font loading
  adjustFontFallback: true,
});

export const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-hanken",
  adjustFontFallback: true,
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-jetbrains",
  adjustFontFallback: true,
});

import { Playfair_Display } from "next/font/google";

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  // Adjusts the fallback font metrics so the layout doesn't shift when
  // the real font swaps in — eliminates CLS caused by font loading
  adjustFontFallback: true,
});

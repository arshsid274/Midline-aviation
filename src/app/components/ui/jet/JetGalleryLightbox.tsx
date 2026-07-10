"use client";

import { useEffect } from "react";
import "glightbox/dist/css/glightbox.min.css";

/**
 * Attaches GLightbox behavior to the server-rendered `.glightbox-jet` anchors
 * in the editorial gallery. Pure behavior island — renders nothing.
 */
export default function JetGalleryLightbox() {
  useEffect(() => {
    let lightbox: { destroy: () => void } | null = null;

    (async () => {
      const GLightbox = (await import("glightbox")).default;
      lightbox = GLightbox({
        selector: ".glightbox-jet",
        touchNavigation: true,
        loop: true,
        openEffect: "fade",
        closeEffect: "fade",
      });
    })();

    return () => {
      lightbox?.destroy();
    };
  }, []);

  return null;
}

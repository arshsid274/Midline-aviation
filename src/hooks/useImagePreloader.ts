import { useState, useEffect } from 'react';

/**
 * Preloads a numbered image sequence (001.webp … NNN.webp) from a public folder.
 * All frames are fetched in parallel so total load time = slowest single frame,
 * not slowest × N.
 *
 * @param sequencePath  Path under /public, e.g. "/sequence-0"
 * @param frameCount    Total number of frames to load
 * @param enabled       Set to false to defer loading until you're ready.
 *                      Defaults to true (load immediately).
 * @param version       Cache-busting token appended as `?v=`. Frames are served
 *                      with `Cache-Control: immutable` (see next.config.ts), so a
 *                      browser will NOT revalidate them for a year. If you ever
 *                      replace a sequence's frames while keeping the same
 *                      filenames, you MUST bump this — otherwise returning
 *                      visitors keep seeing the old images forever.
 * @param fetchPriority Network priority hint. Pass "low" for hero animation
 *                      frames so the browser downloads the render-critical LCP
 *                      image and hydration JS FIRST and fetches these bulky,
 *                      not-yet-visible frames with leftover bandwidth. Without
 *                      this, 100+ frames fired on load saturate the connection
 *                      and delay LCP/TTI on real mobile networks.
 */
export const useImagePreloader = (
    sequencePath: string,
    frameCount: number,
    enabled = true,
    version?: string,
    fetchPriority: 'high' | 'low' | 'auto' = 'auto',
) => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!enabled) return;

        let cancelled = false;

        const suffix = version ? `?v=${version}` : '';

        const loadImages = async () => {
            // Fetch all frames in parallel — total time = slowest single frame.
            const promises = Array.from({ length: frameCount }, (_, i) =>
                new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    img.decoding = 'async';
                    // Set priority BEFORE src so the fetch is scheduled at the hint.
                    if (fetchPriority !== 'auto') {
                        img.setAttribute('fetchpriority', fetchPriority);
                    }
                    img.src = `${sequencePath}/${(i + 1).toString().padStart(3, '0')}.webp${suffix}`;
                    img.onload  = () => resolve(img);
                    img.onerror = () => resolve(img);
                })
            );

            const all = await Promise.all(promises);

            if (!cancelled) {
                setImages(all.filter(img => img.width > 0));
                setLoaded(true);
            }
        };

        loadImages();

        return () => { cancelled = true; };
    }, [sequencePath, frameCount, enabled, version, fetchPriority]);

    return { images, loaded };
};

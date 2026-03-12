import { useState, useEffect } from 'react';

/**
 * Preloads a numbered image sequence (001.jpg … NNN.jpg) from a public folder.
 *
 * @param sequencePath  Path under /public, e.g. "/sequence-0"
 * @param frameCount    Total number of frames to load
 * @param enabled       Set to false to defer loading until you're ready.
 *                      Defaults to true (load immediately).
 */
export const useImagePreloader = (
    sequencePath: string,
    frameCount: number,
    enabled = true,
) => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!enabled) return;

        let cancelled = false;

        const loadImages = async () => {
            const promises = Array.from({ length: frameCount }, (_, i) => {
                return new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    img.decoding = 'async';
                    img.src = `${sequencePath}/${(i + 1).toString().padStart(3, '0')}.webp`;
                    img.onload  = () => resolve(img);
                    img.onerror = () => {
                        console.error(`Failed to load image: ${img.src}`);
                        resolve(img);
                    };
                });
            });

            const loadedImages = await Promise.all(promises);

            if (!cancelled) {
                const validImages = loadedImages.filter(img => img.width > 0);
                console.log(`[useImagePreloader] ${sequencePath}: Loaded ${validImages.length}/${frameCount} images`);
                setImages(validImages);
                setLoaded(true);
            }
        };

        loadImages();

        return () => { cancelled = true; };
    }, [sequencePath, frameCount, enabled]);

    return { images, loaded };
};

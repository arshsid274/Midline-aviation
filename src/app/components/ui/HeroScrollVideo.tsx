"use client";

import { Comfortaa } from "next/font/google";
import { useEffect, useState } from "react";
import { useVideoContext } from "./VideoContext";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  display: "swap",
});

const VIDEOS = [
  { id: 1, src: "/assets/videos/Midline.mp4" },
  { id: 2, src: "/assets/videos/Midline.mp4" },
];

interface HeroAutoVideoProps {
  revealText?: boolean;
}

export default function HeroAutoVideo({ revealText = false }: HeroAutoVideoProps) {
  const { videoRefs, currentIndex, setCurrentIndex } = useVideoContext();
  const [progress, setProgress] = useState(0);
  const videoCount = VIDEOS.length;

  const goToVideo = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= videoCount) return;

    videoRefs.current.forEach((video, index) => {
      if (!video || index === nextIndex) return;
      video.pause();
      video.currentTime = 0;
    });

    setProgress(0);
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const video = videoRefs.current[currentIndex];
    if (!video) return;

    videoRefs.current.forEach((item, index) => {
      if (!item || index === currentIndex) return;
      item.pause();
      item.currentTime = 0;
    });

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    const updateProgress = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => {
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, [currentIndex, videoRefs]);

  return (
    <section
      aria-labelledby="home-hero-heading"
      aria-describedby="home-hero-description"
      className="relative -mt-[72px] h-[100svh] w-full overflow-hidden bg-black md:-mt-[84px]"
    >
      <div className="relative h-full w-full">
        {VIDEOS.map((video, index) => (
          <video
            key={video.id}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            autoPlay
            onEnded={() => {
              goToVideo((currentIndex + 1) % videoCount);
            }}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              currentIndex === index ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        ))}

        <div
          aria-label="Hero video timeline"
          className="absolute bottom-6 left-4 z-40 flex w-[20vw] min-w-[96px] max-w-[170px] gap-2 sm:bottom-8 sm:left-7 sm:w-[16vw] md:bottom-10 md:left-10 md:w-[13vw]"
        >
          {VIDEOS.map((video, index) => (
            <button
              key={video.id}
              type="button"
              onClick={() => goToVideo(index)}
              aria-label={`Play hero video ${index + 1}`}
              className={`group relative overflow-hidden rounded-full bg-white/35 transition-all duration-500 ease-out ${
                currentIndex === index ? "h-[4px] flex-[1.2] bg-white/40" : "h-[2px] flex-1 hover:bg-white/50"
              }`}
            >
              <span
                className="block h-full bg-[#0d1451] transition-[width] duration-100 ease-linear"
                style={{
                  width: currentIndex === index ? `${progress}%` : currentIndex > index ? "100%" : "0%",
                }}
              />
            </button>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8">
          <h1
            id="home-hero-heading"
            className={`max-w-none text-center text-2xl font-light leading-[1.2] tracking-[0.08em] text-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-3xl sm:tracking-[0.12em] md:text-5xl md:tracking-[0.16em] lg:text-6xl ${
              revealText ? "delay-[700ms]" : ""
            }`}
          >
            <span className="block whitespace-nowrap">
              The{" "}
              <span className={`${comfortaa.className} text-[#00bcff] italic font-extrabold`}>
                Art
              </span>{" "}
              of Seamless
            </span>
            <span className="mt-2 block whitespace-nowrap">Luxury Air Travel</span>
          </h1>
          <p id="home-hero-description" className="sr-only">
            Midline Aviation delivers private charter, aircraft management, aircraft sales, MRO, and cargo
            transportation with a luxury-first travel experience.
          </p>
        </div>
      </div>
    </section>
  );
}

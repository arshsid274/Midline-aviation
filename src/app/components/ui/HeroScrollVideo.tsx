"use client";
import { useEffect, useState } from "react";
import { useVideoContext } from "./VideoContext";

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

  useEffect(() => {
    const video = videoRefs.current[currentIndex];
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    const updateProgress = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const p = (video.currentTime / video.duration) * 100;
      setProgress(p);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [currentIndex, videoRefs]);

  return (
    <section
      aria-labelledby="home-hero-heading"
      aria-describedby="home-hero-description"
      className="relative -mt-[72px] h-[100svh] w-full overflow-hidden bg-black md:-mt-[84px]"
    >
      <div className="relative w-full h-full">
        {VIDEOS.map((video, index) => (
          <video
            key={video.id}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            autoPlay
            onEnded={() => {
              setProgress(0);
              setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
            }}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        ))}

        <div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 z-30 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 gap-1.5 sm:bottom-8 sm:w-[72%] md:bottom-10 md:gap-2"
        >
          {VIDEOS.map((_, index) => (
            <div key={index} className="h-[2px] flex-1 bg-white/30 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: currentIndex === index ? `${progress}%` : currentIndex > index ? "100%" : "0%",
                }}
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8">
          <h1
            id="home-hero-heading"
            className={`max-w-[20ch] text-balance text-center text-2xl font-light leading-[1.2] tracking-[0.08em] text-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-3xl sm:tracking-[0.12em] md:text-5xl md:tracking-[0.16em] lg:text-6xl ${
              revealText ? "delay-[700ms]" : ""
            }`}
          >
            <span className="block">The Art of Seamless, Luxury Air Travel</span>
            <span className="mt-2 block">Excellence Above the Clouds</span>
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

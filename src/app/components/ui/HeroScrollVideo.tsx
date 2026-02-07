"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// We no longer need ScrollTrigger for the expansion itself
const VIDEOS = [
  { id: 1, src: "/assets/videos/Midline.mp4" },
  { id: 2, src: "/assets/videos/Midline.mp4" },
];

export default function HeroAutoVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    // AUTOMATIC EXPANSION
    // This starts immediately on load and takes 3.5 seconds
    gsap.to(videoWrapperRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
      duration: 3.5, // Your requested 3-4 second window
      ease: "power2.inOut",
      delay: 0.5, // Short pause before starting for impact
    });
  }, { scope: containerRef });

  // Playback Progress Logic (for the segmented bars)
  useEffect(() => {
    const video = videoRefs.current[currentIndex];
    if (!video) return;

    const updateProgress = () => {
      const p = (video.currentTime / video.duration) * 100;
      setProgress(p);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [currentIndex]);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      <div className="flex h-full w-full items-center justify-center">
        
        <div
          ref={videoWrapperRef}
          className="relative h-[60vh] w-[40vw] overflow-hidden rounded-[30px] z-10 shadow-2xl"
        >
          {VIDEOS.map((video, index) => (
            <video
              key={video.id}
              ref={(el) => { videoRefs.current[index] = el; }}
              onEnded={() => {
                setProgress(0);
                setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
              }}
              autoPlay muted playsInline
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <source src={video.src} type="video/mp4" />
            </video>
          ))}

          {/* Segmented Progress Bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-2 w-[80%] max-w-md">
            {VIDEOS.map((_, index) => (
              <div key={index} className="h-[2px] flex-1 bg-white/30 overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{ 
                    width: currentIndex === index ? `${progress}%` : currentIndex > index ? "100%" : "0%" 
                  }}
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
            <h1 className="text-white text-5xl font-light tracking-[0.3em] md:text-7xl">
              AVIATION
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
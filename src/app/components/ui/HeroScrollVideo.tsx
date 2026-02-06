"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VIDEOS = [
  { id: 1, src: "/assets/videos/Midline.mp4" },
  { id: 2, src: "/assets/videos/plane2.mp4" },
];

export default function HeroScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    // 1. Expansion Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
        once: true, // Lock expansion
        onLeave: () => {
          // Removes the pinning spacer white space and locks the video
          gsap.set(containerRef.current, { height: "100vh" });
        },
      },
    });

    tl.to(videoWrapperRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
      ease: "power2.out",
    });
  }, { scope: containerRef });

  // 2. Playback Progress Logic
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
    <section ref={containerRef} className="relative w-full bg-black overflow-hidden">
      <div className="flex h-screen w-full items-center justify-center">
        
        <div
          ref={videoWrapperRef}
          className="relative h-[60vh] w-[40vw] overflow-hidden rounded-[30px] z-10"
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
                currentIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src={video.src} type="video/mp4" />
            </video>
          ))}

          {/* 3. Segmented Progress Bar (Matching your image) */}
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

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-white text-5xl font-light tracking-[0.2em]">AVIATION</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
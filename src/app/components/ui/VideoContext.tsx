"use client";
import { createContext, useContext, useRef, useState, ReactNode } from "react";

interface VideoContextType {
  videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const VideoContext = createContext<VideoContextType | null>(null);

export function VideoProvider({ children }: { children: ReactNode }) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <VideoContext.Provider value={{ videoRefs, currentIndex, setCurrentIndex }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideoContext() {
  const context = useContext(VideoContext);
  if (!context) throw new Error("useVideoContext must be used within VideoProvider");
  return context;
}

"use client";

import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type TouchEvent,
  type MouseEvent,
  type Dispatch,
  type SetStateAction,
} from "react";

type MouseEnterContextValue = [boolean, Dispatch<SetStateAction<boolean>>];

const MouseEnterContext = createContext<MouseEnterContextValue | undefined>(undefined);

interface CardContainerProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

interface CardItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
}

export function CardContainer({
  children,
  className,
  containerClassName,
}: CardContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const rotateY = (event.clientX - left - width / 2) / 15;
    const rotateX = (event.clientY - top - height / 2) / 15;

    containerRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const touch = event.touches[0];
    if (!touch) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const rotateY = (touch.clientX - left - width / 2) / 15;
    const rotateX = (touch.clientY - top - height / 2) / 15;

    containerRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  };

  const resetTransform = () => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={() => setIsMouseEntered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setIsMouseEntered(false);
            resetTransform();
          }}
          onTouchStart={() => setIsMouseEntered(true)}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => {
            setIsMouseEntered(false);
            resetTransform();
          }}
          className={cn(
            "relative flex items-center justify-center transition-transform duration-200 ease-linear",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
}

export function CardBody({ children, className, ...rest }: CardBodyProps) {
  return (
    <div
      className={cn(
        "h-full w-full [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardItem({
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: CardItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;

    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
      return;
    }

    ref.current.style.transform =
      "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
  }, [isMouseEntered, rotateX, rotateY, rotateZ, translateX, translateY, translateZ]);

  return (
    <div ref={ref} className={cn("w-full transition duration-200 ease-linear", className)} {...rest}>
      {children}
    </div>
  );
}

export const useMouseEnter = (): MouseEnterContextValue => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a CardContainer");
  }
  return context;
};

"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MidlineAirlinesLoader.module.css";
import MidlineLogoLoader from "./MidlineLogoLoader";

interface MidlineAirlinesLoaderProps {
  onLoadingComplete?: () => void;
  autoSkip?: boolean;
}

const MidlineAirlinesLoader: React.FC<MidlineAirlinesLoaderProps> = ({
  onLoadingComplete,
  autoSkip = false
}) => {
  const introActiveClass = "home-loader-intro-active";
  const [mounted, setMounted] = useState(false);
  const mainVisualRef = useRef<HTMLDivElement>(null);
  const introWrapRef = useRef<HTMLDivElement>(null);
  const maskBlankRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const finishIntro = useCallback(() => {
    mainVisualRef.current?.classList.remove(styles.intro);
    mainVisualRef.current?.classList.remove(introActiveClass);
    onLoadingComplete?.();
  }, [onLoadingComplete]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("intro") === "false") {
      finishIntro();
      return;
    }

    function getMaskOffsetRelativeToSection(): Record<string, string> {
      const sectionRect = introWrapRef.current?.getBoundingClientRect();
      const targetRect = maskBlankRef.current?.getBoundingClientRect();

      if (!sectionRect || !targetRect) return {};

      const sectionHeight = introWrapRef.current?.offsetHeight || 1;
      const sectionWidth = introWrapRef.current?.offsetWidth || 1;

      return {
        "--maskT": ((targetRect.top - sectionRect.top) / sectionHeight * 100).toFixed(5) + "%",
        "--maskR": ((sectionRect.right - targetRect.right) / sectionWidth * 100).toFixed(5) + "%",
        "--maskB": ((sectionRect.bottom - targetRect.bottom) / sectionHeight * 100).toFixed(5) + "%",
        "--maskL": ((targetRect.left - sectionRect.left) / sectionWidth * 100).toFixed(5) + "%"
      };
    }

    function handleSkip() {
      const params = new URLSearchParams(window.location.search);
      params.set("intro", "false");
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState(null, "", newUrl);

      mainVisualRef.current?.classList.add(styles["active-2"]);
      timeoutsRef.current.push(setTimeout(() => {
        finishIntro();
      }, 800));
    }

    function startLoaderAnimation() {
      timeoutsRef.current.push(setTimeout(() => {
        mainVisualRef.current?.classList.add(styles["active-1"]);

        // Logo loader runs for ~4s — then trigger exit transition
        timeoutsRef.current.push(setTimeout(() => {
          mainVisualRef.current?.classList.add(styles["active-2"]);
        }, 4000));

        timeoutsRef.current.push(setTimeout(() => {
          finishIntro();
        }, 4800));
      }, 100));
    }

    function handleResize() {
      const maskOffsets = getMaskOffsetRelativeToSection();
      gsap.set(mainVisualRef.current, maskOffsets);
    }

    const initialMaskOffsets = getMaskOffsetRelativeToSection();
    gsap.set(mainVisualRef.current, {
      ...initialMaskOffsets,
      ease: "none",
      onComplete: startLoaderAnimation
    });

    const skipBtn = skipBtnRef.current;
    skipBtn?.addEventListener("click", handleSkip);
    window.addEventListener("resize", handleResize);

    let autoSkipTimeout: ReturnType<typeof setTimeout> | undefined;
    if (autoSkip) {
      autoSkipTimeout = setTimeout(() => {
        handleSkip();
      }, 5000);
    }

    return () => {
      if (autoSkipTimeout) clearTimeout(autoSkipTimeout);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      window.removeEventListener("resize", handleResize);
      skipBtn?.removeEventListener("click", handleSkip);
    };
  }, [onLoadingComplete, autoSkip, finishIntro]);

  return (
    <div
      data-home-loader="true"
      aria-label="Loading intro"
      ref={mainVisualRef}
      className={`${styles.main_visual} ${styles.intro} ${introActiveClass}`}
      style={
        {
          '--maskL': '45%',
          '--maskB': '50%',
          '--maskR': '45%',
          '--maskT': '50%'
        } as React.CSSProperties
      }
    >
      <div ref={introWrapRef} className={styles.intro_wrap}>
        <div className={styles.title_wrap}>
          <MidlineLogoLoader />
        </div>

        <div className={styles.bot_wrap}>
          <div className={styles.mask_wrap}>
            <div ref={maskBlankRef} className={styles.mask_blank}></div>
          </div>
        </div>
      </div>

      <div className={styles.visual_wrap} style={mounted ? undefined : { visibility: 'hidden' }} />

      <button
        type="button"
        ref={skipBtnRef}
        aria-label="Skip intro animation"
        className={styles.intro_skip_btn}
      />
    </div>
  );
};

export default MidlineAirlinesLoader;

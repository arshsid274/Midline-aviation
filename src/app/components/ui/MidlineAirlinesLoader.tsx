'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import styles from './MidlineAirlinesLoader.module.css';

interface MidlineAirlinesLoaderProps {
  onLoadingComplete?: () => void;
  autoSkip?: boolean;
  children?: ReactNode;
}

const MidlineAirlinesLoader: React.FC<MidlineAirlinesLoaderProps> = ({
  onLoadingComplete,
  autoSkip = false
}) => {
  const mainVisualRef = useRef<HTMLDivElement>(null);
  const introWrapRef = useRef<HTMLDivElement>(null);
  const step1TxtRef = useRef<HTMLParagraphElement>(null);
  const step2TxtRef = useRef<HTMLParagraphElement>(null);
  const maskBlankRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if intro should be skipped via URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('intro') === 'false') {
      mainVisualRef.current?.classList.remove(styles.intro);
      return;
    }

    // Set initial clip-path values and start animation
    const initialMaskOffsets = getMaskOffsetRelativeToSection();
    gsap.set(mainVisualRef.current, {
      ...initialMaskOffsets,
      ease: 'none',
      onComplete: startLoaderAnimation
    });

    /**
     * Start the main loader animation sequence
     */
    function startLoaderAnimation() {
      setTimeout(() => {
        mainVisualRef.current?.classList.add(styles['active-1']);

        // Animate step 1 letters
        animateLetters(step1TxtRef.current, () => {
          // Hide step 1 and show step 2
          setTimeout(() => {
            gsap.to(step1TxtRef.current, {
              autoAlpha: 0,
              duration: 0.5,
              ease: 'power2.out'
            });

            gsap.to(step2TxtRef.current, {
              autoAlpha: 1,
              duration: 0.5,
              ease: 'power2.out',
              onComplete: () => {
                // Animate step 2 letters
                animateLetters(step2TxtRef.current, () => {
                  // Add active-2 class for scale animation
                  setTimeout(() => {
                    mainVisualRef.current?.classList.add(styles['active-2']);
                  }, 400);

                  // Remove intro class to show main content
                  setTimeout(() => {
                    mainVisualRef.current?.classList.remove(styles.intro);
                    onLoadingComplete?.();
                  }, 1200);
                });
              }
            });
          }, 600);
        });
      }, 100);
    }

    /**
     * Animate individual letters in text
     */
    function animateLetters(
      textElement: HTMLElement | null,
      callback?: () => void
    ) {
      if (!textElement) return;
      const spans = textElement.querySelectorAll('span');

      gsap.to(spans, {
        delay: 0.2,
        opacity: 1,
        x: 0,
        scaleX: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.025,
        onComplete: callback
      });
    }

    /**
     * Calculate clip-path mask offset relative to section
     */
    function getMaskOffsetRelativeToSection(): Record<string, string> {
      const sectionRect = introWrapRef.current?.getBoundingClientRect();
      const targetRect = maskBlankRef.current?.getBoundingClientRect();

      if (!sectionRect || !targetRect) return {};

      const sectionHeight = introWrapRef.current?.offsetHeight || 1;
      const sectionWidth = introWrapRef.current?.offsetWidth || 1;

      return {
        '--maskT': ((targetRect.top - sectionRect.top) / sectionHeight * 100).toFixed(5) + '%',
        '--maskR': ((sectionRect.right - targetRect.right) / sectionWidth * 100).toFixed(5) + '%',
        '--maskB': ((sectionRect.bottom - targetRect.bottom) / sectionHeight * 100).toFixed(5) + '%',
        '--maskL': ((targetRect.left - sectionRect.left) / sectionWidth * 100).toFixed(5) + '%'
      };
    }

    /**
     * Handle skip button click
     */
    function handleSkip() {
      const params = new URLSearchParams(window.location.search);
      params.set('intro', 'false');
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState(null, '', newUrl);

      mainVisualRef.current?.classList.add(styles['active-2']);
      setTimeout(() => {
        mainVisualRef.current?.classList.remove(styles.intro);
        onLoadingComplete?.();
      }, 800);
    }

    skipBtnRef.current?.addEventListener('click', handleSkip);

    /**
     * Handle window resize
     */
    function handleResize() {
      const maskOffsets = getMaskOffsetRelativeToSection();
      gsap.set(mainVisualRef.current, maskOffsets);
    }

    window.addEventListener('resize', handleResize);

    // Auto-skip if enabled
    let autoSkipTimeout: ReturnType<typeof setTimeout> | undefined;
    if (autoSkip) {
      autoSkipTimeout = setTimeout(() => {
        handleSkip();
      }, 5000); // Auto-skip after 5 seconds
    }

    // Cleanup
    return () => {
      if (autoSkipTimeout) {
        clearTimeout(autoSkipTimeout);
      }
      window.removeEventListener('resize', handleResize);
      skipBtnRef.current?.removeEventListener('click', handleSkip);
    };
  }, [onLoadingComplete, autoSkip]);

  return (
    <div
      ref={mainVisualRef}
      className={`${styles.main_visual} ${styles.intro}`}
      style={
        {
          '--maskL': '50%',
          '--maskB': '0',
          '--maskR': '50%',
          '--maskT': '100%'
        } as React.CSSProperties
      }
    >
      <div ref={introWrapRef} className={styles.intro_wrap}>
        <div className={styles.title_wrap}>
          <p ref={step1TxtRef} className={styles.step1}>
            <span>W</span><span>E</span><span>L</span><span>C</span><span>O</span><span>M</span><span>E</span><span> </span>
            <span>A</span><span>B</span><span>O</span><span>A</span><span>R</span><span>D</span>
          </p>
          <p ref={step2TxtRef} className={styles.step2}>
            <span>M</span><span>I</span><span>D</span><span>L</span><span>I</span><span>N</span><span>E</span>
          </p>
        </div>

        <div className={styles.bot_wrap}>
          <div className={styles.mask_wrap}>
            <div ref={maskBlankRef} className={styles.mask_blank}></div>
          </div>
        </div>
      </div>

      <div className={styles.visual_wrap}>
        {/* Main content will appear here */}
      </div>

      <div ref={skipBtnRef} className={styles.intro_skip_btn}></div>
    </div>
  );
};

export default MidlineAirlinesLoader;

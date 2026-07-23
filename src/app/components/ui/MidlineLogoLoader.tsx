"use client";

import { useEffect, useState } from "react";

const PLANE_PATH =
  "M1.55989957,5.41666667 L5.51582215,5.41666667 L4.47015462,0.108333333 L4.47015462,0.108333333 C4.47015462,0.0634601974 4.49708054,0.0249592654 4.5354546,0.00851337035 L4.57707145,0 L5.36229752,0 C5.43359776,0 5.50087375,0.028779451 5.55026392,0.0782711996 L5.59317877,0.134368264 L7.13659662,2.81558333 L8.29565964,2.81666667 C8.53185377,2.81666667 8.72332694,3.01067661 8.72332694,3.25 C8.72332694,3.48932339 8.53185377,3.68333333 8.29565964,3.68333333 L7.63589819,3.68225 L8.63450135,5.41666667 L11.9308317,5.41666667 C12.5213171,5.41666667 13,5.90169152 13,6.5 C13,7.09830848 12.5213171,7.58333333 11.9308317,7.58333333 L8.63450135,7.58333333 L7.63589819,9.31666667 L8.29565964,9.31666667 C8.53185377,9.31666667 8.72332694,9.51067661 8.72332694,9.75 C8.72332694,9.98932339 8.53185377,10.1833333 8.29565964,10.1833333 L7.13659662,10.1833333 L5.59317877,12.8656317 C5.55725264,12.9280353 5.49882018,12.9724157 5.43174295,12.9907056 L5.36229752,13 L4.57707145,13 L4.55610333,12.9978962 C4.51267695,12.9890959 4.48069792,12.9547924 4.47230803,12.9134397 L4.47223088,12.8704208 L5.51582215,7.58333333 L1.55989957,7.58333333 L0.891288881,8.55114605 C0.853775374,8.60544678 0.798421006,8.64327676 0.73629202,8.65879796 L0.672314689,8.66666667 L0.106844414,8.66666667 L0.0715243949,8.66058466 L0.0715243949,8.66058466 C0.0297243066,8.6457608 0.00275502199,8.60729104 0,8.5651586 L0.00593007386,8.52254537 L0.580855011,6.85813984 C0.64492547,6.67265611 0.6577034,6.47392717 0.619193545,6.28316421 L0.580694768,6.14191703 L0.00601851064,4.48064746 C0.00203480725,4.4691314 0,4.45701613 0,4.44481314 C0,4.39994001 0.0269259152,4.36143908 0.0652999725,4.34499318 L0.106916826,4.33647981 L0.672546853,4.33647981 C0.737865848,4.33647981 0.80011301,4.36066329 0.848265401,4.40322477 L0.89131128,4.45169723 L1.55989957,5.41666667 Z";

const CYCLE_DURATION = 5000;
const FADE_DURATION = 500;

export default function MidlineLogoLoader() {
  const [cycle, setCycle] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const fadeOut = setTimeout(() => {
      setOpacity(0);
      const swap = setTimeout(() => {
        setCycle((c) => c + 1);
        setOpacity(1);
      }, FADE_DURATION);
      return () => clearTimeout(swap);
    }, CYCLE_DURATION);

    return () => clearTimeout(fadeOut);
  }, [cycle]);

  return (
    <>
      <style>{`
        .ml-bar {
          transform: scaleY(0);
          transform-origin: bottom center;
        }
        .ml-bar-1 { animation: ml-barRise 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.3s forwards; }
        .ml-bar-2 { animation: ml-barRise 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.75s forwards; }
        .ml-bar-3 { animation: ml-barRise 0.55s cubic-bezier(0.34,1.56,0.64,1) 1.2s forwards; }
        @keyframes ml-barRise { to { transform: scaleY(1); } }

        .ml-slash {
          position: absolute;
          width: 134px;
          height: 170px;
          bottom: 0;
          transform: translateY(105%);
          background: linear-gradient(
            135deg,
            transparent 48%,
            rgba(255,255,255,0.90) 50%,
            rgba(255,255,255,0.90) 54%,
            transparent 56%
          );
        }
        .ml-bar-1 .ml-slash { left: 0px;   animation: ml-slashCut 0.25s cubic-bezier(0.4,0,0.2,1) 2.48s both; }
        .ml-bar-2 .ml-slash { left: -44px; animation: ml-slashCut 0.25s cubic-bezier(0.4,0,0.2,1) 2.66s both; }
        .ml-bar-3 .ml-slash { left: -92px; animation: ml-slashCut 0.25s cubic-bezier(0.4,0,0.2,1) 2.84s both; }
        @keyframes ml-slashCut {
          0%   { transform: translateY(105%); }
          100% { transform: translateY(0%); }
        }

        .ml-plane-wrap {
          opacity: 0;
          animation: ml-planeFly 1.0s cubic-bezier(0.25,0.1,0.25,1.0) 2.2s forwards;
        }
        @keyframes ml-planeFly {
          0%   { opacity: 1; transform: translate(0px, 0px); }
          100% { opacity: 1; transform: translate(148px, -172px); }
        }

        .ml-brand-name {
          clip-path: inset(0 100% 0 0);
          animation: ml-textReveal 0.7s steps(7, end) 1.7s forwards;
        }
        .ml-brand-sub {
          clip-path: inset(0 100% 0 0);
          animation: ml-textReveal 0.55s steps(8, end) 2.15s forwards;
        }
        @keyframes ml-textReveal { to { clip-path: inset(0 0% 0 0); } }

        .ml-progress-fill {
          width: 0%;
          animation: ml-progressGrow 3.8s ease-in-out 0.3s forwards;
        }
        @keyframes ml-progressGrow {
          0%   { width: 0%; }
          100% { width: 100%; }
        }

        /* Accessibility: users who prefer reduced motion see the finished
           logo immediately instead of the entrance choreography. */
        @media (prefers-reduced-motion: reduce) {
          .ml-bar { transform: scaleY(1) !important; animation: none !important; }
          .ml-slash { display: none !important; }
          .ml-plane-wrap { opacity: 1 !important; animation: none !important; transform: none !important; }
          .ml-brand-name, .ml-brand-sub { clip-path: inset(0 0 0 0) !important; animation: none !important; }
          .ml-progress-fill { width: 100% !important; animation: none !important; }
        }
      `}</style>

      <div
        style={{
          opacity,
          transition: `opacity ${FADE_DURATION}ms ease`,
          display: "flex",
          alignItems: "center",
          gap: "30px",
          position: "relative",
          fontFamily: "var(--font-playfair), Georgia, 'Times New Roman', serif",
        }}
        key={cycle}
      >
        {/* Bars + plane */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            gap: "10px",
            height: "170px",
            width: "150px",
            flexShrink: 0,
          }}
        >
          {/* Bar 1 */}
          <div
            className="ml-bar ml-bar-1"
            style={{
              width: 34,
              height: 80,
              borderRadius: "6px 6px 4px 4px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg,#eaf9ff 0%,#5fd6ff 40%,#00bcff 72%,#1e88d8 100%)",
              }}
            />
            <div className="ml-slash" />
          </div>

          {/* Bar 2 */}
          <div
            className="ml-bar ml-bar-2"
            style={{
              width: 38,
              height: 115,
              borderRadius: "6px 6px 4px 4px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg,#ffffff 0%,#7fe0ff 40%,#12a9f0 74%,#0f7fd6 100%)",
              }}
            />
            <div className="ml-slash" />
          </div>

          {/* Bar 3 */}
          <div
            className="ml-bar ml-bar-3"
            style={{
              width: 42,
              height: 155,
              borderRadius: "6px 6px 4px 4px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg,#eaf9ff 0%,#5fd6ff 38%,#00bcff 74%,#1273c9 100%)",
              }}
            />
            <div className="ml-slash" />
          </div>

          {/* Plane */}
          <div
            className="ml-plane-wrap"
            style={{
              position: "absolute",
              bottom: -23,
              left: -18,
              width: 64,
              height: 64,
              zIndex: 10,
            }}
          >
            <svg
              viewBox="0 0 13 13"
              style={{ width: "100%", height: "100%", transform: "rotate(-45deg)" }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="ml-plane-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#7fe3ff" />
                </linearGradient>
              </defs>
              {/* White→cyan fill — bright against the deep-navy loader curtain. */}
              <path fill="url(#ml-plane-grad)" d={PLANE_PATH} />
            </svg>
          </div>

          {/* Progress bar */}
          <div
            style={{
              position: "absolute",
              bottom: -30,
              left: 0,
              right: 0,
              height: 2,
              background: "rgba(255,255,255,0.16)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              className="ml-progress-fill"
              style={{
                height: "100%",
                background: "linear-gradient(90deg,#00bcff,#eaf9ff)",
                borderRadius: 2,
              }}
            />
          </div>
        </div>

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <div
            className="ml-brand-name"
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-1.5px",
              lineHeight: 1,
            }}
          >
            Midline
          </div>
          <div
            className="ml-brand-sub"
            style={{
              fontSize: 19,
              fontWeight: 400,
              color: "#7fe3ff",
              letterSpacing: "5.5px",
              textAlign: "center",
            }}
          >
            Aviation
          </div>
        </div>
      </div>
    </>
  );
}

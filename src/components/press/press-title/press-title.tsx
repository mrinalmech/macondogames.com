"use client";

import localFont from "next/font/local";
import { useLayoutEffect, useRef } from "react";
import { HeldFrames } from "@/components/home/held-frames";
import featureStyles from "@/components/home/features/features.module.scss";
import {
  bigStarFirstFrame,
  bigStarFrames,
  smallStarFirstFrame,
  smallStarFrames,
} from "@/components/home/stars/frames";
import styles from "./press-title.module.scss";

const commando = localFont({
  src: "../../home/features/commando.ttf",
  variable: "--font-commando",
  adjustFontFallback: false,
  display: "swap",
});

const layers = ["depth", "shade", "lip", "fill", "sheen"] as const;

export function PressTitle() {
  const lettersRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const letters = lettersRef.current;
    if (!letters) return;

    const place = () => {
      const fill = letters.querySelector<HTMLElement>("[data-fill]");
      if (!fill) return;
      const lines = [...fill.getClientRects()].filter((line) => line.height > 0);
      if (lines.length < 2) {
        letters.style.removeProperty("--star-lift");
        letters.style.removeProperty("--star-drop");
        letters.style.removeProperty("--star-inset");
        letters.style.removeProperty("--star-shift");
        return;
      }
      const bounds = letters.getBoundingClientRect();
      const first = lines[0];
      const last = lines[lines.length - 1];
      const lineBox = bounds.height / lines.length;
      letters.style.setProperty("--star-lift", `${bounds.height - lineBox}px`);
      letters.style.setProperty("--star-drop", `${bounds.height - lineBox}px`);
      letters.style.setProperty("--star-inset", `${Math.max(0, bounds.right - last.right)}px`);
      letters.style.setProperty("--star-shift", `${first.left - bounds.left}px`);
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(letters);
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) place();
    });
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`${styles.title} ${commando.variable}`}>
      <svg className={featureStyles.edgeFilter} aria-hidden="true">
        <filter id="feature-heading-smooth" x="-5%" y="-25%" width="110%" height="150%">
          <feGaussianBlur stdDeviation="0.55 0.08" />
        </filter>
      </svg>
      <h1 className={featureStyles.heading}>
        <span ref={lettersRef} className={featureStyles.letters} data-letters>
          <span className={featureStyles.plate}>
            {layers.map((layer) => (
              <span
                key={layer}
                className={featureStyles[layer]}
                aria-hidden={layer === "fill" ? undefined : true}
                {...(layer === "fill" ? { "data-fill": true } : {})}
              >
                PRESS KIT
              </span>
            ))}
          </span>
          <span className={`${featureStyles.bigStar} ${styles.bigStar}`} aria-hidden="true">
            <HeldFrames
              frames={bigStarFrames}
              first={bigStarFirstFrame}
              className={featureStyles.starFrame}
            />
          </span>
          <span className={`${featureStyles.smallStar} ${styles.smallStar}`} aria-hidden="true">
            <HeldFrames
              frames={smallStarFrames}
              first={smallStarFirstFrame}
              className={featureStyles.starFrame}
            />
          </span>
        </span>
      </h1>
    </div>
  );
}

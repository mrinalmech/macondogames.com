"use client";

import { useLayoutEffect, useRef } from "react";
import { HeldFrames } from "@/components/home/held-frames";
import {
  bigStarFirstFrame,
  bigStarFrames,
  smallStarFirstFrame,
  smallStarFrames,
} from "@/components/home/stars/frames";
import styles from "./chrome-letters.module.scss";

function placeStars(letters: HTMLElement) {
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
}

export function ChromeFilters() {
  return (
    <svg className={styles.edgeFilter} aria-hidden="true">
      <filter
        id="feature-heading-smooth"
        x="-40%"
        y="-50%"
        width="180%"
        height="200%"
        colorInterpolationFilters="sRGB"
      >
        <feOffset in="SourceAlpha" dx="-3" dy="-2.2" result="darkWideShift" />
        <feComposite in="SourceAlpha" in2="darkWideShift" operator="out" result="darkWideRim" />
        <feFlood floodColor="#83aad8" result="darkWideInk" />
        <feComposite in="darkWideInk" in2="darkWideRim" operator="in" result="darkWide" />

        <feOffset in="SourceAlpha" dx="-2" dy="-1.4" result="darkMidShift" />
        <feComposite in="SourceAlpha" in2="darkMidShift" operator="out" result="darkMidRim" />
        <feFlood floodColor="#1853a7" result="darkMidInk" />
        <feComposite in="darkMidInk" in2="darkMidRim" operator="in" result="darkMid" />

        <feOffset in="SourceAlpha" dx="-1" dy="-0.7" result="darkNearShift" />
        <feComposite in="SourceAlpha" in2="darkNearShift" operator="out" result="darkNearRim" />
        <feFlood floodColor="#0a50a8" result="darkNearInk" />
        <feComposite in="darkNearInk" in2="darkNearRim" operator="in" result="darkNear" />

        <feOffset in="SourceAlpha" dx="0" dy="-2.6" result="aboveFoot" />
        <feComposite in="SourceAlpha" in2="aboveFoot" operator="out" result="footEdge" />

        <feOffset in="SourceAlpha" dx="2.6" dy="2" result="lightWideShift" />
        <feComposite in="SourceAlpha" in2="lightWideShift" operator="out" result="lightWideRim" />
        <feComposite in="lightWideRim" in2="footEdge" operator="out" result="lightWideCut" />
        <feFlood floodColor="#77d0f4" result="lightWideInk" />
        <feComposite in="lightWideInk" in2="lightWideCut" operator="in" result="lightWide" />

        <feOffset in="SourceAlpha" dx="1.7" dy="1.2" result="lightMidShift" />
        <feComposite in="SourceAlpha" in2="lightMidShift" operator="out" result="lightMidRim" />
        <feComposite in="lightMidRim" in2="footEdge" operator="out" result="lightMidCut" />
        <feFlood floodColor="#cdf2fd" result="lightMidInk" />
        <feComposite in="lightMidInk" in2="lightMidCut" operator="in" result="lightMid" />

        <feOffset in="SourceAlpha" dx="0.8" dy="0.5" result="lightNearShift" />
        <feComposite in="SourceAlpha" in2="lightNearShift" operator="out" result="lightNearRim" />
        <feComposite in="lightNearRim" in2="footEdge" operator="out" result="lightNearCut" />
        <feFlood floodColor="#e7f6ff" result="lightNearInk" />
        <feComposite in="lightNearInk" in2="lightNearCut" operator="in" result="lightNear" />

        <feComposite in="darkWide" in2="SourceGraphic" operator="over" result="bevel1" />
        <feComposite in="darkMid" in2="bevel1" operator="over" result="bevel2" />
        <feComposite in="darkNear" in2="bevel2" operator="over" result="bevel3" />
        <feComposite in="lightWide" in2="bevel3" operator="over" result="bevel4" />
        <feComposite in="lightMid" in2="bevel4" operator="over" result="bevel5" />
        <feComposite in="lightNear" in2="bevel5" operator="over" result="beveled" />
        <feGaussianBlur in="beveled" stdDeviation="0.55 0.08" result="soft" />
        <feComposite in="soft" in2="SourceAlpha" operator="in" />
      </filter>
      <filter
        id="chrome-shine-rim"
        primitiveUnits="objectBoundingBox"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        colorInterpolationFilters="sRGB"
      >
        <feMorphology in="SourceAlpha" operator="erode" radius="0.005 0.022" result="inset" />
        <feComposite in="SourceAlpha" in2="inset" operator="out" result="rim" />
        <feFlood floodColor="#ffffff" result="white" />
        <feComposite in="white" in2="rim" operator="in" />
      </filter>
    </svg>
  );
}

export function ChromeLetters({
  text,
  className,
  plateClassName,
  shineClassName,
  bigStarClassName,
  smallStarClassName,
}: {
  text: string;
  className?: string;
  plateClassName?: string;
  shineClassName?: string;
  bigStarClassName?: string;
  smallStarClassName?: string;
}) {
  const lettersRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const letters = lettersRef.current;
    if (!letters) return;

    const place = () => placeStars(letters);
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
    <span
      ref={lettersRef}
      className={[styles.letters, className].filter(Boolean).join(" ")}
      data-letters
    >
      <span className={[styles.plate, plateClassName].filter(Boolean).join(" ")}>
        <span className={styles.fill} data-fill>
          {text}
        </span>
      </span>
      <span className={[styles.sheen, styles.wash, shineClassName].filter(Boolean).join(" ")} aria-hidden>
        {text}
      </span>
      <span className={[styles.sheen, styles.edge, shineClassName].filter(Boolean).join(" ")} aria-hidden>
        {text}
      </span>
      <span className={[styles.bigStar, bigStarClassName].filter(Boolean).join(" ")} aria-hidden="true">
        <HeldFrames
          frames={bigStarFrames}
          first={bigStarFirstFrame}
          className={styles.starFrame}
        />
      </span>
      <span className={[styles.smallStar, smallStarClassName].filter(Boolean).join(" ")} aria-hidden="true">
        <HeldFrames
          frames={smallStarFrames}
          first={smallStarFirstFrame}
          className={styles.starFrame}
        />
      </span>
    </span>
  );
}

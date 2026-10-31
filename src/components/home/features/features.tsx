"use client";

import Image, { type StaticImageData } from "next/image";
import localFont from "next/font/local";
import { useEffect, useLayoutEffect, useRef, type CSSProperties } from "react";
import enemies from "./enemies.webp";
import players from "./players.webp";
import {
  bigStarFirstFrame,
  bigStarFrames,
  smallStarFirstFrame,
  smallStarFrames,
} from "../stars/frames";
import { SteamWidget } from "./steam-widget/steam-widget";
import upgrades from "./upgrades.webp";
import styles from "./features.module.scss";

const commando = localFont({
  src: "./commando.ttf",
  variable: "--font-commando",
  adjustFontFallback: false,
  display: "swap",
});

const features: {
  title: string;
  copy: string;
  image: StaticImageData;
  alt: string;
  from: "left" | "right";
}[] = [
  {
    title: "THE GOOD",
    copy: "Control three different characters with varying playstyles for maximum replayability.",
    image: players,
    alt: "Three figures leaping into action - one in blue, one in red and one in green.",
    from: "left",
  },
  {
    title: "THE BAD",
    copy: "Travel through an assortment of locations fighting a number of bosses and enemies.",
    image: enemies,
    alt: "Four figures in a menacing pose, holding their weapons aloft.",
    from: "right",
  },
  {
    title: "AND THE UPGRADES",
    copy: "Earn points and customize your weaponry to switch up gameplay.",
    image: upgrades,
    alt: "Three different guns, disassembled so you can see their interiors.",
    from: "left",
  },
];

export function Features() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const arts = [...list.querySelectorAll<HTMLElement>("[data-art]")];
    const show = (art: HTMLElement) => {
      art.dataset.shown = "";
    };

    if (!("IntersectionObserver" in window)) {
      for (const art of arts) show(art);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.35 },
    );

    for (const art of arts) observer.observe(art);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const place = () => {
      for (const letters of list.querySelectorAll<HTMLElement>("[data-letters]")) {
        const fill = letters.querySelector<HTMLElement>("[data-fill]");
        if (!fill) continue;
        const lines = [...fill.getClientRects()].filter((line) => line.height > 0);
        if (lines.length < 2) {
          letters.style.removeProperty("--star-lift");
          letters.style.removeProperty("--star-drop");
          letters.style.removeProperty("--star-inset");
          letters.style.removeProperty("--star-shift");
          continue;
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
    };

    place();
    const observer = new ResizeObserver(place);
    for (const letters of list.querySelectorAll("[data-letters]")) observer.observe(letters);
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
    <section className={`${styles.features} ${commando.variable}`}>
      <svg className={styles.edgeFilter} aria-hidden="true">
        <filter id="feature-heading-smooth" x="-5%" y="-25%" width="110%" height="150%">
          <feGaussianBlur stdDeviation="0.55 0.08" />
        </filter>
      </svg>
      <div className={styles.inner}>
        <div className={styles.widget}>
          <SteamWidget />
        </div>
        <div ref={listRef} className={styles.list}>
          {features.map((feature) => (
            <article
              key={feature.title}
              className={feature.from === "right" ? `${styles.row} ${styles.flip}` : styles.row}
            >
              <div className={styles.figure}>
                <div className={styles.art} data-art data-from={feature.from}>
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    sizes="(min-width: 48rem) 540px, 100vw"
                    className={styles.image}
                  />
                </div>
              </div>
              <div className={styles.copy}>
                <h2
                  className={styles.heading}
                  {...(feature.title === "AND THE UPGRADES" ? { "data-corners": "as" } : {})}
                >
                  <span className={styles.letters} data-letters>
                    <span className={styles.plate}>
                      <span className={styles.depth} aria-hidden="true">
                        {feature.title}
                      </span>
                      <span className={styles.shade} aria-hidden="true">
                        {feature.title}
                      </span>
                      <span className={styles.lip} aria-hidden="true">
                        {feature.title}
                      </span>
                      <span className={styles.fill} data-fill>{feature.title}</span>
                      <span className={styles.sheen} aria-hidden="true">
                        {feature.title}
                      </span>
                    </span>
                    <span className={styles.bigStar} aria-hidden="true">
                      {bigStarFrames.map((frame, index) => (
                        <Image
                          key={index}
                          src={frame}
                          alt=""
                          className={styles.starFrame}
                          style={{ "--i": bigStarFirstFrame + index } as CSSProperties}
                        />
                      ))}
                    </span>
                    <span className={styles.smallStar} aria-hidden="true">
                      {smallStarFrames.map((frame, index) => (
                        <Image
                          key={index}
                          src={frame}
                          alt=""
                          className={styles.starFrame}
                          style={{ "--i": smallStarFirstFrame + index } as CSSProperties}
                        />
                      ))}
                    </span>
                  </span>
                </h2>
                <p className={styles.body}>{feature.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

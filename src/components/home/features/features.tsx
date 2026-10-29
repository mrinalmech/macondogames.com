"use client";

import Image, { type StaticImageData } from "next/image";
import localFont from "next/font/local";
import { useEffect, useRef } from "react";
import enemies from "./enemies.webp";
import players from "./players.webp";
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
    title: "...AND THE UPGRADES",
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

  return (
    <section className={`${styles.features} ${commando.variable}`}>
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
                <h2 className={styles.heading}>
                  <span className={styles.depth} aria-hidden="true">
                    {feature.title}
                  </span>
                  <span className={styles.shade} aria-hidden="true">
                    {feature.title}
                  </span>
                  <span className={styles.lip} aria-hidden="true">
                    {feature.title}
                  </span>
                  <span className={styles.fill}>{feature.title}</span>
                  <span className={styles.sheen} aria-hidden="true">
                    {feature.title}
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

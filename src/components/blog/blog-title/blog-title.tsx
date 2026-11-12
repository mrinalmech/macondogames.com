"use client";

import localFont from "next/font/local";
import { ChromeFilters, ChromeLetters } from "@/components/shared/chrome-letters/chrome-letters";
import chrome from "@/components/shared/chrome-letters/chrome-letters.module.scss";
import styles from "./blog-title.module.scss";

const commando = localFont({
  src: "../../home/features/commando.ttf",
  variable: "--font-commando",
  adjustFontFallback: false,
  display: "swap",
});

export function BlogTitle() {
  return (
    <div className={`${styles.title} ${commando.variable}`}>
      <ChromeFilters />
      <h1 className={chrome.heading}>
        <ChromeLetters
          text="BLOG"
          plateClassName={styles.line}
          shineClassName={styles.line}
          bigStarClassName={styles.bigStar}
          smallStarClassName={styles.smallStar}
        />
      </h1>
    </div>
  );
}

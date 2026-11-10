"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./steam-widget.module.scss";

const widgetUrl = "https://store.steampowered.com/widget/1073970/";
const widgetTitle = "Global Steel on Steam";

// Share of the grey card that must sit in the viewport before Steam loads.
// 40% of the 166px placeholder is about 66px: past a peeking edge, and early
// enough that the iframe is requested before the card is the focus.
const placeholderShown = 0.4;

function subscribeToObserverSupport() {
  return () => {};
}

function readObserverSupport() {
  return "IntersectionObserver" in window;
}

export function SteamWidget() {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const canDefer = useSyncExternalStore(
    subscribeToObserverSupport,
    readObserverSupport,
    () => true,
  );

  useEffect(() => {
    const placeholder = placeholderRef.current;
    if (!placeholder || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || entry.intersectionRatio < placeholderShown) return;
        setActive(true);
        observer.disconnect();
      },
      { threshold: placeholderShown },
    );

    observer.observe(placeholder);
    return () => observer.disconnect();
  }, []);

  const visible = active || !canDefer;

  return (
    <div className={styles.fit}>
      <div className={styles.stage}>
        <div
          ref={placeholderRef}
          className={ready ? `${styles.ghost} ${styles.ghostOut}` : styles.ghost}
        />
        <div className={`${styles.bezel} ${styles.bezelBack}`} aria-hidden="true" />
        <div className={styles.glass}>
          {visible ? (
            <iframe
              className={ready ? `${styles.frame} ${styles.frameIn}` : styles.frame}
              src={widgetUrl}
              title={widgetTitle}
              onLoad={() => setReady(true)}
            />
          ) : null}
          <noscript>
            <iframe
              className={styles.frameStatic}
              src={widgetUrl}
              title={widgetTitle}
            />
          </noscript>
        </div>
        <div className={`${styles.bezel} ${styles.bezelFront}`} aria-hidden="true" />
      </div>
    </div>
  );
}

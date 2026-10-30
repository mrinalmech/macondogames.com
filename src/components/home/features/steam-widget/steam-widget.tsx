"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./steam-widget.module.scss";

const widgetUrl = "https://store.steampowered.com/widget/1073970/";

// Share of the grey card that must sit in the viewport before Steam loads.
// 40% of the 168px placeholder is about 67px: past a peeking edge, and early
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
    <div className={styles.slot}>
      <div
        ref={placeholderRef}
        className={ready ? `${styles.ghost} ${styles.ghostOut}` : styles.ghost}
      />
      {visible ? (
        <iframe
          className={ready ? `${styles.frame} ${styles.frameIn}` : styles.frame}
          src={widgetUrl}
          title="Global Steel on Steam"
          onLoad={() => setReady(true)}
        />
      ) : null}
      <noscript>
        <iframe
          className={styles.frameStatic}
          src={widgetUrl}
          title="Global Steel on Steam"
        />
      </noscript>
    </div>
  );
}

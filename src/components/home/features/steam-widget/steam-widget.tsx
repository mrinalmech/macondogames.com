"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./steam-widget.module.scss";

const widgetUrl = "https://store.steampowered.com/widget/1073970/";

function subscribeToObserverSupport() {
  return () => {};
}

function readObserverSupport() {
  return "IntersectionObserver" in window;
}

export function SteamWidget() {
  const slotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const canDefer = useSyncExternalStore(
    subscribeToObserverSupport,
    readObserverSupport,
    () => true,
  );

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot || !("IntersectionObserver" in window)) return;

    // A few pixels of the slot can sit in the first screen. Ignore that sliver
    // so the Steam iframe stays out of the hero's load.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setActive(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -25% 0px" },
    );

    observer.observe(slot);
    return () => observer.disconnect();
  }, []);

  const visible = active || !canDefer;

  return (
    <div
      ref={slotRef}
      className={styles.slot}
    >
      <div className={ready ? `${styles.ghost} ${styles.ghostOut}` : styles.ghost} />
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

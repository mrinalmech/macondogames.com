"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./steam-widget.module.scss";

const widgetUrl = "https://store.steampowered.com/widget/1073970/";

export function SteamWidget() {
  const slotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    if (!("IntersectionObserver" in window)) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setActive(true);
      observer.disconnect();
    });

    observer.observe(slot);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={slotRef}
      className={styles.slot}
      data-state={ready ? "ready" : active ? "loading" : "idle"}
    >
      <div className={ready ? `${styles.ghost} ${styles.ghostOut}` : styles.ghost} />
      {active ? (
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

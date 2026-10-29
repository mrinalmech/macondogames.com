"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import { site } from "@/lib/site";
import l1 from "./l1.png";
import l2 from "./l2.png";
import { logoShineFrames } from "./logo/frames";
import logo from "./logo/logo.png";
import monitor from "./monitor.png";
import shot0 from "./screenshots/0.png";
import shot1 from "./screenshots/1.png";
import shot2 from "./screenshots/2.png";
import shot3 from "./screenshots/3.png";
import shot4 from "./screenshots/4.png";
import wallshade from "./wallshade.png";
import styles from "./hero.module.scss";

const screenshots = [shot0, shot1, shot2, shot3, shot4];

type Intro = "hold" | "scene" | "copy" | "play";

function whenImageReady(img: HTMLImageElement) {
  const decode = () => img.decode?.().catch(() => undefined);

  if (img.complete) return decode();

  return new Promise<void>((resolve) => {
    const finish = () => resolve();
    img.addEventListener("load", finish, { once: true });
    img.addEventListener("error", finish, { once: true });
  }).then(decode);
}

function whenFaded(element: HTMLElement) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      element.removeEventListener("transitionend", onEnd);
      window.clearTimeout(timer);
      resolve();
    };
    const onEnd = (event: TransitionEvent) => {
      if (event.target !== element || event.propertyName !== "opacity") return;
      finish();
    };

    element.addEventListener("transitionend", onEnd);
    const duration = Number.parseFloat(getComputedStyle(element).transitionDuration);
    const timer = window.setTimeout(finish, (Number.isFinite(duration) ? duration : 0.8) * 1000 + 80);
  });
}

export function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const phase = useRef<Intro>("hold");
  const [intro, setIntro] = useState<Intro>("hold");

  function advance(next: Intro) {
    phase.current = next;
    setIntro(next);
  }

  useEffect(() => {
    // Home stays mounted, hidden, on other routes. This effect runs again
    // when it is shown. A finished intro must not start over.
    if (phase.current === "play") return;

    const scene = sceneRef.current;
    const copy = copyRef.current;
    if (!scene || !copy) return;

    let cancelled = false;
    const images = [...scene.querySelectorAll("img"), ...copy.querySelectorAll("img")];

    (async () => {
      if (phase.current === "hold") {
        await Promise.all(images.map(whenImageReady));
        if (cancelled) return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (phase.current !== "copy") flushSync(() => advance("copy"));
        return;
      }

      if (phase.current === "hold") {
        flushSync(() => advance("scene"));
        await whenFaded(scene);
        if (cancelled) return;
      }

      if (phase.current === "scene") {
        flushSync(() => advance("copy"));
        await whenFaded(copy);
        if (cancelled) return;
      }

      if (phase.current === "copy") advance("play");
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className={styles.hero} data-hero data-intro={intro}>
      <div ref={sceneRef} className={styles.scene}>
        <Image src={wallshade} alt="" priority className={styles.shade} />
        <Image src={l2} alt="" priority className={styles.l2} />
        <Image src={l2} alt="" priority className={`${styles.l2} ${styles.flip}`} />
        <Image src={l1} alt="" priority className={styles.l1} />
        <Image src={l1} alt="" priority className={`${styles.l1} ${styles.flip}`} />
        <div className={styles.monitor}>
          <div className={styles.screen} aria-hidden>
            {screenshots.map((shot) => (
              <Image
                key={shot.src}
                src={shot}
                alt=""
                sizes="620px"
                loading="eager"
                className={styles.shot}
              />
            ))}
          </div>
          <Image
            src={monitor}
            alt=""
            priority
            unoptimized
            data-bezel
            className={styles.bezel}
          />
        </div>
      </div>
      <div ref={copyRef} className={styles.copy}>
        <div className={styles.wordmark}>
          <Image
            src={logo}
            alt={site.featuredGame.title}
            priority
            className="h-auto w-full"
          />
          <div className={styles.shine} aria-hidden>
            {logoShineFrames.map((frame, index) => (
              <Image
                key={frame.src}
                src={frame}
                alt=""
                sizes="525px"
                loading="eager"
                className={styles.frame}
                style={{ "--i": index } as CSSProperties}
              />
            ))}
          </div>
        </div>
        <div className={styles.caption}>
          <p className={styles.pitch}>
            SUIT UP.
            <br />
            SHOOT &apos;EM UP.
            <br />
            LEVEL UP.
          </p>
          <p className={styles.blurb}>
            Global Steel is a 2D run-and-gun video game inspired by{" "}
            <br />
            Saturday-morning cartoons of the 80s.
          </p>
        </div>
      </div>
    </section>
  );
}

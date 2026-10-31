"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import { site } from "@/lib/site";
import l1 from "./l1.png";
import l2 from "./l2.png";
import { logoShineFrames } from "./logo/frames";
import logo from "./logo/logo.png";
import monitor from "./monitor.webp";
import shot0 from "./screenshots/0.png";
import shot1 from "./screenshots/1.png";
import shot2 from "./screenshots/2.png";
import shot3 from "./screenshots/3.png";
import shot4 from "./screenshots/4.png";
import wallshade from "./wallshade.png";
import styles from "./hero.module.scss";

const screenshots = [shot0, shot1, shot2, shot3, shot4];
const [openingShot, ...reel] = screenshots;

// A slow bezel must not keep the hero blank. The fade starts anyway.
const holdCeilingMs = 1000;

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

function holdCeiling(ms: number) {
  let timer = 0;
  const promise = new Promise<void>((resolve) => {
    timer = window.setTimeout(resolve, ms);
  });

  return { promise, clear: () => window.clearTimeout(timer) };
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
    const ceiling = holdCeiling(holdCeilingMs);
    // The visible frame is the shade, the lights, the bezel, and the opening
    // shot. The wordmark catches up during the scene fade. The reel and the
    // shine frames mount at "play", which is when they become visible.
    const firstFrame = [...scene.querySelectorAll<HTMLImageElement>("img[data-first-frame]")];
    const wordmark = copy.querySelector<HTMLImageElement>("img[data-wordmark]");

    (async () => {
      if (phase.current === "hold") {
        await Promise.race([Promise.all(firstFrame.map(whenImageReady)), ceiling.promise]);
        ceiling.clear();
        if (cancelled) return;
      }

      const wordmarkReady = wordmark ? whenImageReady(wordmark) : Promise.resolve();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (phase.current !== "copy") flushSync(() => advance("copy"));
        return;
      }

      if (phase.current === "hold") {
        flushSync(() => advance("scene"));
        await Promise.all([whenFaded(scene), wordmarkReady]);
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
      ceiling.clear();
    };
  }, []);

  return (
    <section className={styles.hero} data-hero data-intro={intro}>
      <div ref={sceneRef} className={styles.scene}>
        <Image src={wallshade} alt="" loading="eager" data-first-frame="" className={styles.shade} />
        <Image src={l2} alt="" loading="eager" data-first-frame="" className={styles.l2} />
        <Image
          src={l2}
          alt=""
          loading="eager"
          data-first-frame=""
          className={`${styles.l2} ${styles.flip}`}
        />
        <Image src={l1} alt="" loading="eager" data-first-frame="" className={styles.l1} />
        <Image
          src={l1}
          alt=""
          loading="eager"
          data-first-frame=""
          className={`${styles.l1} ${styles.flip}`}
        />
        <div className={styles.monitor}>
          <div className={styles.screen} aria-hidden>
            <Image
              src={openingShot}
              alt=""
              sizes="620px"
              priority
              fetchPriority="high"
              loading="eager"
              data-first-frame=""
              className={styles.shot}
            />
            {intro === "play"
              ? reel.map((shot) => (
                  <Image
                    key={shot.src}
                    src={shot}
                    alt=""
                    sizes="620px"
                    loading="lazy"
                    className={styles.shot}
                  />
                ))
              : null}
          </div>
          <Image
            src={monitor}
            alt=""
            unoptimized
            loading="eager"
            data-bezel
            data-first-frame=""
            className={styles.bezel}
          />
        </div>
      </div>
      <div ref={copyRef} className={styles.copy}>
        <div className={styles.wordmark}>
          <Image
            src={logo}
            alt={site.featuredGame.title}
            loading="eager"
            data-wordmark=""
            className="h-auto w-full"
          />
          <div className={styles.shine} aria-hidden>
            {intro === "play"
              ? logoShineFrames.map((frame, index) => (
                  <Image
                    key={index}
                    src={frame}
                    alt=""
                    sizes="525px"
                    loading="lazy"
                    className={styles.frame}
                    style={{ "--i": index } as CSSProperties}
                  />
                ))
              : null}
          </div>
        </div>
        <div className={styles.caption}>
          <p className={styles.pitch}>
            <span>SUIT UP.</span> <br />
            <span>SHOOT &apos;EM UP.</span> <br />
            <span>LEVEL UP.</span>
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

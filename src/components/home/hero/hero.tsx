import Image from "next/image";
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

const frameDuration = 1 / 24;

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-linear-to-b from-[#000] to-[#1a0629]">
      <Image
        src={wallshade}
        alt=""
        className="absolute top-0 left-1/2 z-0 -translate-x-1/2"
      />
      <Image src={l2} alt="" className="absolute top-0 left-0 z-10" />
      <Image
        src={l2}
        alt=""
        className="absolute top-0 right-0 z-10 -scale-x-100"
      />
      <Image src={l1} alt="" className="absolute top-0 left-0 z-20" />
      <Image
        src={l1}
        alt=""
        className="absolute top-0 right-0 z-20 -scale-x-100"
      />
      <div className="absolute top-[50px] left-1/2 z-30 w-[525px] -translate-x-1/2">
        <Image
          src={logo}
          alt={site.featuredGame.title}
          className="h-auto w-full"
        />
        <div className={styles.shine} aria-hidden>
          {logoShineFrames.map((frame, index) => (
            <img
              key={frame.src}
              src={frame.src}
              alt=""
              className={styles.frame}
              style={{ animationDelay: `${index * frameDuration}s` }}
            />
          ))}
        </div>
      </div>
      <div className={styles.monitor}>
        <div className={styles.screen} aria-hidden>
          {screenshots.map((shot) => (
            <img key={shot.src} src={shot.src} alt="" className={styles.shot} />
          ))}
        </div>
        <Image
          src={monitor}
          alt=""
          unoptimized
          className="relative z-10 block max-w-none"
        />
      </div>
      <div className={styles.caption}>
        <p className={styles.pitch}>
          SUIT UP.
          <br />
          SHOOT 'EM UP.
          <br />
          LEVEL UP.
        </p>
        <p className={styles.blurb}>
          Global Steel is a 2d run-and-gun video game inspired by
          <br />
          Saturday-morning cartoons of the 80s.
        </p>
      </div>
    </section>
  );
}

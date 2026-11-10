import Image from "next/image";
import { companyLogo, downloads, gameLogo, shots } from "./assets";
import monitor from "./monitor.webp";
import styles from "./kit.module.scss";

const features = [
  "Swap between Stormhammer, Nightblade, and Valkyrie, each with their own weapons and playstyle.",
  "Classic hand-drawn animation featuring frame-by-frame artwork that captures the iconic aesthetic of '80s Saturday-morning cartoons.",
  "Battle across a globe-trotting campaign filled with a variety of bosses and enemies.",
  "Earn points to unlock new weapons and gear upgrades that change up your gameplay.",
  "Authentic '80s cartoon tropes, including an era-appropriate soundtrack complete with a custom theme song.",
];

export function Kit() {
  return (
    <div className={styles.body}>
      <section className={styles.section} id="description">
        <h2 className={styles.heading}>Description</h2>
        <p>
          Global Steel is a 2D run-and-gun platformer inspired by 1980s Saturday-morning
          cartoons like Centurions and M.A.S.K., and by arcade shooters like Contra. Each
          level plays out like a &quot;lost episode&quot; of an unreleased show from the time.
        </p>
      </section>

      <section className={styles.section} id="features">
        <h2 className={styles.heading}>Features</h2>
        <ul className={styles.list}>
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section} id="studio">
        <h2 className={styles.heading}>About the Studio</h2>
        <p>
        Macondo Games is an independent game studio dedicated to crafting rich, memorable gaming experiences.
        </p>
        <p>
        Founded by Mrinal Mech—driven by a lifelong passion for video games—the studio is currently hard at work on its debut title, Global Steel.
        </p>
      </section>

      <section className={styles.section} id="screenshots">
        <div className={styles.sectionHead}>
          <h2 className={styles.heading}>Screenshots</h2>
          <a className={styles.download} href={downloads.screenshots.href}>
            {downloads.screenshots.label}
          </a>
        </div>
        <ul className={styles.shots}>
          {shots.map((shot) => (
            <li key={shot.src}>
              <a className={styles.shot} href={shot.src} target="_blank" rel="noreferrer">
                <span className={styles.screen}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 48rem) 25rem, 100vw"
                    className={styles.picture}
                  />
                </span>
                <Image src={monitor} alt="" className={styles.bezel} />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} id="logos">
        <div className={styles.sectionHead}>
          <h2 className={styles.heading}>Logos</h2>
          <a className={styles.download} href={downloads.logos.href}>
            {downloads.logos.label}
          </a>
        </div>
        <div className={styles.logos}>
          <a className={`${styles.logo} ${styles.company}`} href={companyLogo.src} target="_blank" rel="noreferrer">
            <span className={styles.frame}>
              <Image
                src={companyLogo.src}
                alt={companyLogo.alt}
                width={companyLogo.width}
                height={companyLogo.height}
                className={styles.companyLogo}
                sizes="8rem"
              />
            </span>
          </a>
          <a className={`${styles.logo} ${styles.game}`} href={gameLogo.src} target="_blank" rel="noreferrer">
            <span className={styles.frame}>
              <Image
                src={gameLogo.src}
                alt={gameLogo.alt}
                width={gameLogo.width}
                height={gameLogo.height}
                className={styles.gameLogo}
                sizes="23rem"
              />
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
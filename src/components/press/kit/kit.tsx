import Image from "next/image";
import styles from "./kit.module.scss";

const features = [
  "Control three different characters: Stormhammer, Nighblade and Valkyrie with distinct playstyles",
  "Visual style reminiscent of 80s cartoons with classical hand-drawn animation",
  "Travel through an assortment of locations fighting a variety of bosses and enemies",
  "Customize your equipment with earned points to switch up gameplay",
  "Adherence to 80s cartoon tropes - end level screens that look like credit sequences, synthwave soundtrack with a theme song",
];

const companyLogo = "/press/company-logo.png";
const gameLogo = "/press/game-logo.png";

const shots: { src: string; alt: string }[] = [
  {
    src: "/press/global-steel-command.png",
    alt: "Three operators at a world-map console inside a circular command room.",
  },
  {
    src: "/press/global-steel-wasteland.png",
    alt: "A blue-suited hero with energy rings standing in a wasteland between soldiers and a tank.",
  },
  {
    src: "/press/global-steel-hall-guards.png",
    alt: "A blue-suited runner crossing a candlelit hall toward two sword-wielding guards.",
  },
  {
    src: "/press/global-steel-stained-glass.png",
    alt: "A blue-suited hero facing a winged, flaming figure in a ruined hall of stained glass.",
  },
  {
    src: "/press/global-steel-castle.png",
    alt: "A blue-suited hero on a ruined road, with a radio message that the castle is just up ahead.",
  },
];

export function Kit() {
  return (
    <div className={styles.body}>
      <section className={styles.section} id="description">
        <h2 className={styles.heading}>Description</h2>
        <p>
          Global Steel is a 2D run-and-gun game inspired by Saturday-morning cartoons of the 80s. It
          grew out of our love of 80s cartoons like Centurions and M.A.S.K., and of shooters
          like Contra, with each level acting as an episode of a lost 80s Saturday-morning
          cartoon that never aired.
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
          We are a small indie studio working on our first title, Global Steel.
        </p>
        <p>
          Macondo Games was founded by Mrinal Mech. He always enjoyed playing video games as a
          child growing up so the next logical step was making them, and here we are.
        </p>
      </section>

      <section className={styles.section} id="screenshots">
        <h2 className={styles.heading}>Screenshots</h2>
        <ul className={styles.shots}>
          {shots.map((shot) => (
            <li key={shot.src}>
              <a className={styles.shot} href={shot.src} target="_blank" rel="noreferrer">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1920}
                  height={1080}
                  sizes="(min-width: 48rem) 25rem, 100vw"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} id="logos">
        <h2 className={styles.heading}>Logos</h2>
        <div className={styles.logos}>
          <a className={styles.logo} href={companyLogo} target="_blank" rel="noreferrer">
            <Image
              src={companyLogo}
              alt="Macondo Games"
              width={567}
              height={567}
              className={styles.companyLogo}
              sizes="13rem"
            />
          </a>
          <a className={styles.logo} href={gameLogo} target="_blank" rel="noreferrer">
            <Image
              src={gameLogo}
              alt="Global Steel"
              width={1610}
              height={752}
              className={styles.gameLogo}
              sizes="28rem"
            />
          </a>
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import hover from "./hover.png";
import normal from "./normal.png";
import press from "./press.png";
import styles from "./read-more.module.scss";

export function ReadMore({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} className={styles.button}>
      {/* The painted rest plate is hover.png; the painted pointer plate is normal.png. */}
      <Image src={hover} alt="" unoptimized className={`${styles.face} ${styles.normal}`} />
      <Image src={normal} alt="" unoptimized className={`${styles.face} ${styles.hover}`} />
      <Image src={press} alt="" unoptimized className={`${styles.face} ${styles.press}`} />
      <span className="sr-only">Read more: {title}</span>
    </Link>
  );
}

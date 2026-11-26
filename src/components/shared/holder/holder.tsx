import Image from "next/image";
import type { ReactNode } from "react";
import holder from "./holder.webp";
import screen from "./screen.webp";
import styles from "./holder.module.scss";

export function Holder({
  aside = false,
  children,
}: {
  aside?: boolean;
  children?: ReactNode;
}) {
  const Tag = aside ? "aside" : "div";

  return (
    <Tag className={styles.holder}>
      <div className={styles.screen}>{children}</div>
      <Image
        src={holder}
        alt=""
        unoptimized
        preload
        fetchPriority="high"
        loading="eager"
        className={styles.bezel}
      />
      <Image src={screen} alt="" unoptimized className={styles.frame} />
    </Tag>
  );
}

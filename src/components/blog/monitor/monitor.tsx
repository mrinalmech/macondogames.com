import Image from "next/image";
import type { ReactNode } from "react";
import { BlogImage } from "@/components/blog/blog-image/blog-image";
import type { SanityImage } from "@/sanity/types";
import housingBottom from "./housing-bottom.png";
import housingTop from "./housing-top.png";
import monitor from "./monitor.png";
import styles from "./monitor.module.scss";

export function Monitor({
  image,
  priority = false,
  control = null,
  children,
}: {
  image?: SanityImage | null;
  priority?: boolean;
  control?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.stack}>
      {image?.asset?.url ? (
        <span className={styles.monitor}>
          <span className={styles.screen}>
            <BlogImage image={image} priority={priority} frame />
          </span>
          <Image src={monitor} alt="" className={styles.bezel} />
        </span>
      ) : null}
      <div className={styles.housing}>
        <div className={styles.cap} aria-hidden>
          <Image src={housingTop} alt="" unoptimized className={styles.plate} />
        </div>
        <div className={styles.body}>
          <span className={styles.railLeft} aria-hidden />
          <span className={styles.railRight} aria-hidden />
          {children}
        </div>
        <div className={styles.base}>
          <Image src={housingBottom} alt="" unoptimized className={styles.plate} />
          {control}
        </div>
      </div>
    </div>
  );
}

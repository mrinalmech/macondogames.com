import { io } from "next/cache";
import styles from "./footer.module.scss";

export function YearFallback() {
  return <span className={styles.year} />;
}

export async function CopyrightYear() {
  await io();
  return <span className={styles.year}>{new Date().getFullYear()}</span>;
}

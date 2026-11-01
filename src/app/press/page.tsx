import type { Metadata } from "next";
import { Factsheet } from "@/components/press/factsheet/factsheet";
import { Kit } from "@/components/press/kit/kit";
import { PressTitle } from "@/components/press/press-title/press-title";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press kit for Global Steel, a 2D run-and-gun from Macondo Games in Panjim, Goa.",
};

export default function PressPage() {
  return (
    <main className="flex flex-1 flex-col">
      <article className={styles.page} data-floor>
        <div className={styles.inner}>
          <PressTitle />
          <div className={styles.layout}>
            <Factsheet />
            <Kit />
          </div>
        </div>
      </article>
    </main>
  );
}

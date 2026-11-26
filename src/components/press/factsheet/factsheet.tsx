import { Holder } from "@/components/shared/holder/holder";
import styles from "./factsheet.module.scss";

const facts = [
  { label: "Developer", value: "Macondo Games" },
  { label: "Release date", value: "TBA" },
  { label: "Platforms", value: "PC", href: "https://store.steampowered.com/app/1073970/" },
  { label: "Website", value: "macondogames.com", href: "https://macondogames.com" },
  { label: "Press", value: "press@macondogames.com", href: "mailto:press@macondogames.com" },
];

function FactText({ value }: { value: string }) {
  const at = value.indexOf("@");
  if (at === -1) return value;
  return (
    <>
      {value.slice(0, at + 1)}
      <wbr />
      {value.slice(at + 1)}
    </>
  );
}

function FactValue({ value, href }: { value: string; href?: string }) {
  const text = <FactText value={value} />;
  if (!href) return text;

  const external = href.startsWith("http");

  return (
    <a
      className={styles.link}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {text}
    </a>
  );
}

export function Factsheet() {
  return (
    <Holder aside>
      <h2 className={styles.heading}>Factsheet</h2>
      <dl className={styles.facts}>
        {facts.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <dt>{fact.label}</dt>
            <dd>
              <FactValue value={fact.value} href={fact.href} />
            </dd>
          </div>
        ))}
      </dl>
    </Holder>
  );
}

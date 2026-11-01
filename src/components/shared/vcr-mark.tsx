import type { ReactNode } from "react";

export function VcrMark({
  name,
  render,
  hidden = false,
}: {
  name: string;
  render: () => ReactNode;
  hidden?: boolean;
}) {
  return (
    <span className={`${name}-mark`} aria-hidden={hidden || undefined}>
      <span className={`${name}-ghost ${name}-chroma`} aria-hidden="true">
        {render()}
      </span>
      <span className={`${name}-ghost ${name}-signal`} aria-hidden="true">
        {render()}
      </span>
      <span className={`${name}-face`}>{render()}</span>
    </span>
  );
}

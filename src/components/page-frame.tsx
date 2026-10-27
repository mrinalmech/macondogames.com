import type { ReactNode } from "react";

type PageFrameProps = {
  kicker: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageFrame({
  kicker,
  title,
  description,
  children,
}: PageFrameProps) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-ember">
        {kicker}
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-[0.12em] text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel">
        {description}
      </p>
      <div className="mt-10">{children}</div>
    </main>
  );
}

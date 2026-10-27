import { characters } from "@/lib/home";

const accentGlow = {
  ember: "border-ember/50 text-ember shadow-[0_0_24px_rgba(255,106,61,0.25)]",
  hot: "border-hot/50 text-hot shadow-[0_0_24px_rgba(255,60,172,0.28)]",
  signal:
    "border-signal/50 text-signal shadow-[0_0_24px_rgba(77,232,224,0.25)]",
} as const;

export function Lineup() {
  return (
    <section
      id="lineup"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-ember">
        Lineup // Operatives
      </p>
      <h2 className="mt-3 font-display text-3xl tracking-[0.1em] sm:text-4xl">
        Three playstyles. One cartoon war.
      </h2>
      <p className="mt-4 max-w-2xl text-steel">
        Control three characters with different reads — replay the same
        stage as a wall, a blur, or a gunline.
      </p>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {characters.map((character) => (
          <article
            key={character.code}
            className={`border bg-panel/80 p-6 ${accentGlow[character.accent]}`}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
              Operative {character.code}
            </p>
            <div className="my-6 grid h-28 place-items-center border border-white/10 bg-void/60">
              <SuitMark accent={character.accent} />
            </div>
            <h3 className="font-display text-2xl tracking-[0.08em] text-foreground">
              {character.callsign}
            </h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em]">
              {character.playstyle}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-steel">
              {character.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SuitMark({ accent }: { accent: keyof typeof accentGlow }) {
  const fill = {
    ember: "#ff6a3d",
    hot: "#ff3cac",
    signal: "#4de8e0",
  }[accent];

  return (
    <svg
      viewBox="0 0 64 64"
      className="h-16 w-16"
      aria-hidden
      fill="none"
    >
      <path
        d="M22 18 L32 8 L42 18 V26 H22 Z"
        stroke={fill}
        strokeWidth="2"
      />
      <path d="M18 26 H46 V42 H18 Z" stroke={fill} strokeWidth="2" />
      <path d="M18 30 H10 V44 H18" stroke={fill} strokeWidth="2" />
      <path d="M46 30 H54 V44 H46" stroke={fill} strokeWidth="2" />
      <path d="M24 42 V56 H18" stroke={fill} strokeWidth="2" />
      <path d="M40 42 V56 H46" stroke={fill} strokeWidth="2" />
      <path d="M26 20 H38" stroke={fill} strokeWidth="2" />
    </svg>
  );
}

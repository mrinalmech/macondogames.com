import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Macondo Games for press, business, and general inquiries.",
};

export default function ContactPage() {
  return (
    <PageFrame
      kicker="Uplink // Contact"
      title="Get in range"
      description="Press, business, and player mail will land here. The form is a visual placeholder — it does not submit until a backend is connected."
    >
      <form
        className="max-w-xl space-y-4 border border-signal/15 bg-panel p-6"
        aria-label="Contact placeholder"
      >
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-signal">
            Name
          </span>
          <input
            type="text"
            name="name"
            disabled
            placeholder="Your name"
            className="mt-2 w-full border border-signal/20 bg-void px-3 py-2 text-sm text-foreground placeholder:text-steel/60 disabled:opacity-70"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-signal">
            Email
          </span>
          <input
            type="email"
            name="email"
            disabled
            placeholder="you@domain.com"
            className="mt-2 w-full border border-signal/20 bg-void px-3 py-2 text-sm text-foreground placeholder:text-steel/60 disabled:opacity-70"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-signal">
            Message
          </span>
          <textarea
            name="message"
            disabled
            rows={5}
            placeholder="Press, partnership, or player note"
            className="mt-2 w-full border border-signal/20 bg-void px-3 py-2 text-sm text-foreground placeholder:text-steel/60 disabled:opacity-70"
          />
        </label>
        <button
          type="button"
          disabled
          className="border border-ember/60 px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-ember disabled:opacity-60"
        >
          Transmit (soon)
        </button>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
          Interim: use the press page contact block once addresses are published.
        </p>
      </form>
    </PageFrame>
  );
}

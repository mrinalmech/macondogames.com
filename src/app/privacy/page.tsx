import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & GDPR",
  description:
    "Placeholder privacy and GDPR notice for Macondo Games.",
};

const sections = [
  {
    title: "Who we are",
    body: `${site.name} is the data controller for this website. Legal entity details and a contact email will replace this sentence.`,
  },
  {
    title: "What we collect",
    body: "Placeholder: this site currently collects no account data. If analytics, newsletters, or contact forms go live, this section will list categories, purposes, and legal bases (GDPR Art. 6).",
  },
  {
    title: "Your rights",
    body: "Placeholder: access, rectification, erasure, restriction, portability, and objection (GDPR Arts. 15–21), plus the right to lodge a complaint with a supervisory authority.",
  },
  {
    title: "Cookies and retention",
    body: "Placeholder: cookie inventory, retention periods, processors, and international transfers will be documented before any tracking is enabled.",
  },
];

export default function PrivacyPage() {
  return (
    <PageFrame
      kicker="Legal // Privacy"
      title="Privacy & GDPR"
      description="This is a structural privacy notice, not legal advice. Replace every section with counsel-reviewed copy before launch."
    >
      <div className="space-y-4">
        {sections.map((section) => (
          <article
            key={section.title}
            className="border border-signal/15 bg-panel p-6"
          >
            <h2 className="font-display text-xl tracking-[0.1em]">
              {section.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-steel">
              {section.body}
            </p>
          </article>
        ))}
      </div>
    </PageFrame>
  );
}

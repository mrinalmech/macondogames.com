import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import { Suspense } from "react";
import { CopyrightYear, YearFallback } from "@/components/shared/footer/copyright-year";
import { Footer } from "@/components/shared/footer/footer";
import { Navbar } from "@/components/shared/navbar/navbar";
import { PerspectiveGrid } from "@/components/shared/perspective-grid/perspective-grid";
import { site } from "@/lib/site";
import { SanityLive } from "@/sanity/lib/live";
import "../globals.scss";

const vcr = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: { url: "/icon.png", sizes: "512x512", type: "image/png" },
    apple: { url: "/apple-icon.png", sizes: "512x512", type: "image/png" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={vcr.variable}
    >
      <body className="min-h-dvh">
        <div data-page data-nosnippet="" className="relative flex min-h-dvh flex-col">
          <PerspectiveGrid />
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-panel focus:px-3 focus:py-2 focus:text-signal"
          >
            Skip to content
          </a>
          <Suspense
            fallback={
              <div className="h-(--header-block)" />
            }
          >
            <Navbar />
          </Suspense>
          <div id="content" className="relative z-[3] -mt-(--header-block) flex flex-1 flex-col">
            {children}
          </div>
          <Footer
            year={
              <Suspense fallback={<YearFallback />}>
                <CopyrightYear />
              </Suspense>
            }
          />
        </div>
        <SanityLive includeDrafts={false} />
      </body>
    </html>
  );
}

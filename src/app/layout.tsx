import type { Metadata } from "next";
import { Geist, VT323 } from "next/font/google";
import { Suspense } from "react";
import { CopyrightYear, YearFallback } from "@/components/copyright-year";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar/navbar";
import { site } from "@/lib/site";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
  description: site.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${vcr.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <div id="app-root" className="flex min-h-dvh flex-col">
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-panel focus:px-3 focus:py-2 focus:text-signal"
          >
            Skip to content
          </a>
          <Suspense
            fallback={
              <div className="h-[102px]" />
            }
          >
            <Navbar />
          </Suspense>
          <div id="content" className="-mt-[102px] flex flex-1 flex-col">
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
      </body>
    </html>
  );
}

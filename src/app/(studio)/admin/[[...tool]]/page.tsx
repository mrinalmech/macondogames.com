import type { Metadata, Viewport } from "next";
import { NextStudio } from "next-sanity/studio";
import {
  metadata as studioMetadata,
  viewport as studioViewport,
} from "next-sanity/studio";
import config from "../../../../../sanity.config";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Admin",
};

export const viewport: Viewport = {
  ...studioViewport,
  interactiveWidget: "resizes-content",
};

export default function AdminPage() {
  return <NextStudio config={config} />;
}

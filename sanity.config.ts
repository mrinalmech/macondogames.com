"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { publishWithPostedBy } from "@/sanity/actions/publish-with-posted-by";
import { dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schema";

export default defineConfig({
  name: "macondo",
  title: "Macondo Games",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
  document: {
    actions: (previous, context) =>
      context.schemaType === "post"
        ? previous.map((action) =>
            action.action === "publish" ? publishWithPostedBy(action) : action,
          )
        : previous,
  },
});

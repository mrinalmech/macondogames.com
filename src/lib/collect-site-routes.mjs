import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const siteDir = path.join(process.cwd(), "src", "app", "(site)");

// Pages under src/app/(site). Route groups are not part of the URL.
// A directory with [brackets] is a blog post, which comes from Sanity.
export function collectSiteRoutes() {
  if (!existsSync(siteDir)) return null;

  const routes = walk(siteDir, []);
  routes.sort((a, b) => a.localeCompare(b));
  return routes;
}

function walk(dir, segments) {
  const routes = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.name.startsWith(".") ||
      entry.name.startsWith("_") ||
      entry.name.startsWith("@")
    ) {
      continue;
    }

    if (entry.isDirectory()) {
      const group = entry.name.startsWith("(") && entry.name.endsWith(")");
      if (!group && entry.name.includes("[")) continue;

      routes.push(
        ...walk(
          path.join(dir, entry.name),
          group ? segments : [...segments, entry.name],
        ),
      );
      continue;
    }

    if (!/^page\.(tsx|ts|jsx|js)$/.test(entry.name)) continue;

    routes.push(segments.length === 0 ? "/" : `/${segments.join("/")}`);
  }

  return routes;
}

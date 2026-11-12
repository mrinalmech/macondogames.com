import { writeFileSync } from "node:fs";
import path from "node:path";
import { collectSiteRoutes } from "../src/lib/collect-site-routes.mjs";

const routes = collectSiteRoutes();

if (!routes) {
  console.error("src/app/(site) was not found");
  process.exit(1);
}

const file = path.join(process.cwd(), "src", "lib", "static-routes.ts");
const body = `// Written by scripts/collect-routes.mjs from the pages under src/app/(site).
export const staticRoutes = ${JSON.stringify(routes, null, 2)} as const;
`;

writeFileSync(file, body);

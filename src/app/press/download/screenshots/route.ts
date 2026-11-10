import { downloads } from "@/components/press/kit/assets";
import { downloadZip } from "../zip";

export function GET() {
  return downloadZip(downloads.screenshots);
}

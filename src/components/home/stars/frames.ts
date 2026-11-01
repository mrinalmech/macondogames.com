import type { StaticImageData } from "next/image";
import { holdFrames } from "@/components/home/hold-frames";
import bigstar1 from "./bigstar1.png";
import bigstar3 from "./bigstar3.png";
import bigstar5 from "./bigstar5.png";
import bigstar7 from "./bigstar7.png";
import bigstar10 from "./bigstar10.png";
import bigstar12 from "./bigstar12.png";
import bigstar14 from "./bigstar14.png";
import bigstar16 from "./bigstar16.png";

import smallstar1 from "./smallstar1.png";
import smallstar3 from "./smallstar3.png";
import smallstar5 from "./smallstar5.png";
import smallstar7 from "./smallstar7.png";
import smallstar10 from "./smallstar10.png";
import smallstar12 from "./smallstar12.png";
import smallstar14 from "./smallstar14.png";
import smallstar16 from "./smallstar16.png";
import smallstar18 from "./smallstar18.png";

// Source frames 19-35 of the Global Steel shine. The first entry is frame 19.
export const bigStarFrames: StaticImageData[] = [
  ...holdFrames(bigstar1, 2),
  ...holdFrames(bigstar3, 2),
  ...holdFrames(bigstar5, 2),
  ...holdFrames(bigstar7, 3),
  ...holdFrames(bigstar10, 2),
  ...holdFrames(bigstar12, 2),
  ...holdFrames(bigstar14, 2),
  ...holdFrames(bigstar16, 2),
];
export const bigStarFirstFrame = 19;

// Source frames 29-46. The first entry is frame 29.
export const smallStarFrames: StaticImageData[] = [
  ...holdFrames(smallstar1, 2),
  ...holdFrames(smallstar3, 2),
  ...holdFrames(smallstar5, 2),
  ...holdFrames(smallstar7, 3),
  ...holdFrames(smallstar10, 2),
  ...holdFrames(smallstar12, 2),
  ...holdFrames(smallstar14, 2),
  ...holdFrames(smallstar16, 2),
  smallstar18,
];
export const smallStarFirstFrame = 29;

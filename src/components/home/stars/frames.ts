import type { StaticImageData } from "next/image";

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

function hold(frame: StaticImageData, count: number) {
  return Array.from({ length: count }, () => frame);
}

// Source frames 19-35 of the Global Steel shine. The first entry is frame 19.
// A repeated picture is a hold, stored once.
export const bigStarFrames: StaticImageData[] = [
  ...hold(bigstar1, 2),
  ...hold(bigstar3, 2),
  ...hold(bigstar5, 2),
  ...hold(bigstar7, 3),
  ...hold(bigstar10, 2),
  ...hold(bigstar12, 2),
  ...hold(bigstar14, 2),
  ...hold(bigstar16, 2),
];
export const bigStarFirstFrame = 19;

// Source frames 29-46. The first entry is frame 29.
export const smallStarFrames: StaticImageData[] = [
  ...hold(smallstar1, 2),
  ...hold(smallstar3, 2),
  ...hold(smallstar5, 2),
  ...hold(smallstar7, 3),
  ...hold(smallstar10, 2),
  ...hold(smallstar12, 2),
  ...hold(smallstar14, 2),
  ...hold(smallstar16, 2),
  smallstar18,
];
export const smallStarFirstFrame = 29;

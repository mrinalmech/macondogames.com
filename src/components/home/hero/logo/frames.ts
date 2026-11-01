import type { StaticImageData } from "next/image";
import { holdFrames } from "@/components/home/hold-frames";
import frame0 from "./shine/0.png";
import frame1 from "./shine/1.png";
import frame3 from "./shine/3.png";
import frame5 from "./shine/5.png";
import frame7 from "./shine/7.png";
import frame9 from "./shine/9.png";
import frame11 from "./shine/11.png";
import frame13 from "./shine/13.png";
import frame15 from "./shine/15.png";
import frame19 from "./shine/19.png";
import frame21 from "./shine/21.png";
import frame23 from "./shine/23.png";
import frame25 from "./shine/25.png";
import frame28 from "./shine/28.png";
import frame29 from "./shine/29.png";
import frame30 from "./shine/30.png";
import frame31 from "./shine/31.png";
import frame32 from "./shine/32.png";
import frame33 from "./shine/33.png";
import frame34 from "./shine/34.png";
import frame35 from "./shine/35.png";
import frame36 from "./shine/36.png";
import frame37 from "./shine/37.png";
import frame38 from "./shine/38.png";
import frame40 from "./shine/40.png";
import frame42 from "./shine/42.png";
import frame44 from "./shine/44.png";
import frame46 from "./shine/46.png";

// One entry per 24fps step. A repeated picture is a hold, stored once.
export const logoShineFrames: StaticImageData[] = [
  frame0,
  ...holdFrames(frame1, 2),
  ...holdFrames(frame3, 2),
  ...holdFrames(frame5, 2),
  ...holdFrames(frame7, 2),
  ...holdFrames(frame9, 2),
  ...holdFrames(frame11, 2),
  ...holdFrames(frame13, 2),
  ...holdFrames(frame15, 2),
  ...holdFrames(frame0, 2),
  ...holdFrames(frame19, 2),
  ...holdFrames(frame21, 2),
  ...holdFrames(frame23, 2),
  ...holdFrames(frame25, 3),
  frame28,
  frame29,
  frame30,
  frame31,
  frame32,
  frame33,
  frame34,
  frame35,
  frame36,
  frame37,
  ...holdFrames(frame38, 2),
  ...holdFrames(frame40, 2),
  ...holdFrames(frame42, 2),
  ...holdFrames(frame44, 2),
  frame46,
  frame0,
];

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./perspective-grid.module.scss";

const gap = 56;
const ns = "http://www.w3.org/2000/svg";

function clip(x0: number, y0: number, x1: number, y1: number, w: number, h: number) {
  const inside = (x: number, y: number) =>
    (x < 0 ? 1 : x > w ? 2 : 0) | (y < 0 ? 4 : y > h ? 8 : 0);
  let c0 = inside(x0, y0);
  let c1 = inside(x1, y1);

  for (let i = 0; i < 16; i++) {
    if (!(c0 | c1)) return [x0, y0, x1, y1] as const;
    if (c0 & c1) return null;
    const c = c0 || c1;
    let x = x0;
    let y = y0;
    if (c & 4) {
      x = x0 + ((x1 - x0) * (0 - y0)) / (y1 - y0);
      y = 0;
    } else if (c & 8) {
      x = x0 + ((x1 - x0) * (h - y0)) / (y1 - y0);
      y = h;
    } else if (c & 1) {
      y = y0 + ((y1 - y0) * (0 - x0)) / (x1 - x0);
      x = 0;
    } else {
      y = y0 + ((y1 - y0) * (w - x0)) / (x1 - x0);
      x = w;
    }
    if (c === c0) {
      x0 = x;
      y0 = y;
      c0 = inside(x0, y0);
    } else {
      x1 = x;
      y1 = y;
      c1 = inside(x1, y1);
    }
  }

  return null;
}

function readPixels(img: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context || canvas.width === 0) return null;
  context.drawImage(img, 0, 0);
  return context.getImageData(0, 0, canvas.width, canvas.height);
}

// The bezel's top edge is not level: dishes stick up and the shoulders
// fall away. The cover runs to the lowest of those starts in view, so the
// open pixels above the frame stay filled. The artwork paints over it.
function bezelCover(img: HTMLImageElement, pixels: ImageData) {
  const rect = img.getBoundingClientRect();
  const { width, height, data } = pixels;
  const scaleX = rect.width / width;
  const scaleY = rect.height / height;
  const viewLeft = Math.max(0, Math.floor((0 - rect.left) / scaleX));
  const viewRight = Math.min(width - 1, Math.ceil((window.innerWidth - rect.left) / scaleX));
  let lowest = 0;

  for (let x = viewLeft; x <= viewRight; x += 4) {
    for (let y = 0; y < height; y++) {
      if (data[(y * width + x) * 4 + 3] > 24) {
        if (y > lowest) lowest = y;
        break;
      }
    }
  }

  return rect.top + lowest * scaleY;
}

function drawGrid(svg: SVGSVGElement, width: number, height: number) {
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.replaceChildren();

  const add = (x0: number, y0: number, x1: number, y1: number) => {
    const line = document.createElementNS(ns, "line");
    line.setAttribute("x1", String(x0));
    line.setAttribute("y1", String(y0));
    line.setAttribute("x2", String(x1));
    line.setAttribute("y2", String(y1));
    svg.appendChild(line);
  };

  const vpX = width / 2;
  const vpY = -height * 0.35;
  const span = height - vpY;
  const step = gap / span;
  let z = 1;

  while (z < 40) {
    const y = vpY + span / z;
    if (y < 0) break;
    if (y <= height) add(0, y, width, y);
    z += step;
  }

  const xAtBottom = (x: number, y: number) => vpX + ((height - vpY) * (x - vpX)) / (y - vpY);
  const start = Math.floor(xAtBottom(0, 0) / gap) * gap;
  const end = xAtBottom(width, 0);

  for (let x = start; x <= end; x += gap) {
    const segment = clip(vpX, vpY, x, height, width, height);
    if (segment) add(...segment);
  }
}

export function PerspectiveGrid() {
  const pathname = usePathname();
  const skyRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const page = document.querySelector<HTMLElement>("[data-page]");
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const img = document.querySelector<HTMLImageElement>("[data-bezel]");
    const sky = skyRef.current;
    const cover = coverRef.current;
    const svg = svgRef.current;
    // Other routes keep the homepage mounted and hide it. A hidden hero
    // must not bring the grid back.
    if (!page || !hero || !img || !sky || !cover || !svg) return;
    if (hero.getClientRects().length === 0) return;

    let pixels: ImageData | null = null;
    let frame = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = () => {
      const intro = hero.getAttribute("data-intro");
      if (intro === "play" || (reduceMotion && intro === "copy")) {
        svg.classList.add(styles.shown);
      }
    };

    const introObserver = new MutationObserver(reveal);
    introObserver.observe(hero, { attributes: true, attributeFilter: ["data-intro"] });
    reveal();

    const place = (layer: HTMLElement, top: number, height: number) => {
      layer.style.top = `${top}px`;
      layer.style.left = "0";
      layer.style.width = `${page.clientWidth}px`;
      layer.style.height = `${height}px`;
    };

    const draw = () => {
      if (!pixels) return;
      const pageRect = page.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      const top = heroRect.top - pageRect.top;
      const height = heroRect.height;
      const crown = bezelCover(img, pixels) - heroRect.top;
      place(sky, top, height);
      place(cover, top, height);
      cover.style.clipPath = `inset(0 0 ${Math.max(0, height - crown)}px 0)`;
      sky.dataset.ready = "";
      // The plane is fixed to the viewport. The page scrolls across it.
      const viewWidth = svg.clientWidth;
      const viewHeight = svg.clientHeight;
      if (viewWidth > 0 && viewHeight > 0) drawGrid(svg, viewWidth, viewHeight);
      svg.style.visibility = "visible";
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };

    const read = () => {
      if (!img.naturalWidth) return;
      pixels = readPixels(img);
      schedule();
    };

    if (img.complete && img.naturalWidth) read();
    else img.addEventListener("load", read);

    const observer = new ResizeObserver(schedule);
    observer.observe(svg);
    observer.observe(hero);
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      img.removeEventListener("load", read);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      introObserver.disconnect();
      delete sky.dataset.ready;
      svg.classList.remove(styles.shown);
      svg.style.visibility = "hidden";
      sky.style.height = "0";
      cover.style.height = "0";
    };
  }, [pathname]);

  return (
    <>
      <div ref={skyRef} className={styles.sky} aria-hidden="true" />
      <svg ref={svgRef} className={styles.grid} aria-hidden="true" />
      <div ref={coverRef} className={styles.cover} aria-hidden="true" />
    </>
  );
}

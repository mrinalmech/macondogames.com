import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { htmlToBlocks, randomKey } from "@portabletext/block-tools";
import { JSDOM } from "jsdom";

// Public coordinates. Keep them aligned with src/sanity/env.ts.
const projectId = "b8mckh8j";
const dataset = "production";
const slug = "80s-animation-deep-dive";
const documentId = `post-${slug}`;
const wordpressPost =
  "https://blog.macondogames.com/wp-json/wp/v2/posts?slug=80s-animation-deep-dive";

const dryRun = process.argv.includes("--dry-run");

const bodyType = {
  block: { name: "block" },
  span: { name: "span" },
  styles: [
    { name: "normal" },
    { name: "h2" },
    { name: "h3" },
  ],
  lists: [],
  decorators: [{ name: "strong" }, { name: "em" }],
  annotations: [
    {
      name: "link",
      fields: [{ name: "href", type: "string" }],
    },
  ],
  blockObjects: [
    {
      name: "image",
      fields: [
        { name: "alt", type: "string" },
        { name: "caption", type: "string" },
        { name: "sourceUrl", type: "string" },
      ],
    },
  ],
  inlineObjects: [],
};

function tidy(value) {
  return value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function plainText(block) {
  if (block._type !== "block") return "";
  return tidy(block.children.map((child) => child.text ?? "").join(""));
}

function filenameFrom(url) {
  const name = new URL(url).pathname.split("/").pop();
  if (!name) throw new Error(`No filename in ${url}`);
  return decodeURIComponent(name);
}

// Photon serves a resized preview. The file on the blog host is the original.
function originalUrl(src) {
  const url = new URL(src);
  if (url.hostname === "i0.wp.com") {
    return `https://${url.pathname.replace(/^\//, "")}`;
  }
  url.search = "";
  return url.toString();
}

function altText(alt, caption, filename) {
  const cleaned = tidy(alt ?? "");
  if (
    cleaned &&
    !cleaned.startsWith("This image has an empty alt attribute")
  ) {
    return cleaned;
  }
  if (caption) return caption;
  return filename.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ");
}

function readToken() {
  const text = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  const line = text
    .split(/\r?\n/)
    .find((entry) => entry.startsWith("SANITY_API_WRITE_TOKEN="));
  if (!line) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  }
  const token = line.slice("SANITY_API_WRITE_TOKEN=".length).trim();
  if (!token) throw new Error("SANITY_API_WRITE_TOKEN is empty");
  return token;
}

// WordPress puts the space between a word and a link inside the formatting
// tag (`on<strong> <a>`). The converter drops that space. Move it outside.
function hoistEdgeSpaces(html) {
  let current = html;
  for (let pass = 0; pass < 6; pass += 1) {
    const next = current
      .replace(/<(strong|em|a)\b([^>]*)>\s+/gi, (match, tag, attrs) => {
        const spaces = match.match(/\s+$/)[0];
        return `${spaces}<${tag}${attrs}>`;
      })
      .replace(/\s+<\/(strong|em|a)>/gi, (match, tag) => {
        const spaces = match.match(/^\s+/)[0];
        return `</${tag}>${spaces}`;
      });
    if (next === current) return current;
    current = next;
  }
  return current;
}

function bestSource(image) {
  const srcset = image.getAttribute("srcset");
  if (srcset) {
    const largest = srcset
      .split(",")
      .map((part) => {
        const [url, size] = part.trim().split(/\s+/);
        const width = size?.endsWith("w") ? Number(size.slice(0, -1)) : 0;
        return { url, width };
      })
      .filter((candidate) => candidate.url)
      .sort((a, b) => b.width - a.width)[0];
    if (largest) return originalUrl(largest.url);
  }
  return originalUrl(image.getAttribute("src"));
}

function blocksFromHtml(html) {
  return htmlToBlocks(hoistEdgeSpaces(html), bodyType, {
    parseHtml: (value) => new JSDOM(value).window.document,
    rules: [
      {
        deserialize(element, next, createBlock) {
          if (element.nodeType !== 1 || element.tagName !== "FIGURE") {
            return undefined;
          }
          const images = [...element.querySelectorAll("img")];
          if (images.length === 0) return next(element.childNodes);
          const caption = tidy(
            element.querySelector("figcaption")?.textContent ?? "",
          );
          return images.map((image, index) => {
            const sourceUrl = bestSource(image);
            const filename = filenameFrom(sourceUrl);
            const isLast = index === images.length - 1;
            const imageCaption = isLast ? caption : "";
            return createBlock({
              _type: "image",
              _key: randomKey(12),
              sourceUrl,
              alt: altText(image.getAttribute("alt"), imageCaption, filename),
              caption: imageCaption,
            });
          });
        },
      },
    ],
  });
}

function withoutCredits(blocks) {
  return blocks.filter((block) => {
    const text = plainText(block);
    if (/^Written by\s+/i.test(text) || /^Edited by\s+/i.test(text)) {
      return false;
    }
    return !(block._type === "block" && text === "");
  });
}

async function loadWordPressPost() {
  const response = await fetch(wordpressPost);
  if (!response.ok) {
    throw new Error(`WordPress responded ${response.status}`);
  }
  const posts = await response.json();
  const post = posts[0];
  if (!post) throw new Error("WordPress post was not found");
  return post;
}

async function coverUrl(mediaId) {
  const response = await fetch(
    `https://blog.macondogames.com/wp-json/wp/v2/media/${mediaId}`,
  );
  if (!response.ok) {
    throw new Error(`Featured media responded ${response.status}`);
  }
  const media = await response.json();
  return originalUrl(media.source_url);
}

async function uploadImage(client, sourceUrl, cache) {
  const cached = cache.get(sourceUrl);
  if (cached) return cached;

  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && source.name == "wordpress" && source.id == $id][0]._id`,
    { id: sourceUrl },
  );
  if (existing) {
    cache.set(sourceUrl, existing);
    return existing;
  }

  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Image ${sourceUrl} responded ${response.status}`);
  }
  const type = response.headers.get("content-type")?.split(";")[0];
  const asset = await client.assets.upload(
    "image",
    Buffer.from(await response.arrayBuffer()),
    {
      filename: filenameFrom(sourceUrl),
      contentType: type || undefined,
      source: { id: sourceUrl, name: "wordpress", url: sourceUrl },
    },
  );
  cache.set(sourceUrl, asset._id);
  return asset._id;
}

function imageReference(assetId, block) {
  return {
    _type: "image",
    _key: block._key,
    asset: { _type: "reference", _ref: assetId },
    alt: block.alt,
    ...(block.caption ? { caption: block.caption } : {}),
  };
}

const post = await loadWordPressPost();
const body = withoutCredits(blocksFromHtml(post.content.rendered));
const lede = body
  .filter((block) => block._type === "block" && block.style !== "h3")
  .slice(0, 2)
  .map(plainText)
  .join("\n\n");
const cover = await coverUrl(post.featured_media);
const figures = body.filter((block) => block._type === "image");

console.log(
  [
    post.title.rendered,
    `published ${post.date_gmt}Z`,
    `${figures.length} figures`,
  ].join("\n"),
);

if (dryRun) {
  for (const block of body) {
    if (block._type === "image") {
      console.log(`image ${filenameFrom(block.sourceUrl)}`);
      if (block.caption) console.log(`  ${block.caption}`);
      continue;
    }
    const text = plainText(block);
    console.log(`${block.style}: ${text.slice(0, 90)}`);
  }
} else {
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-11-12",
    token: readToken(),
    useCdn: false,
  });
  const cache = new Map();
  const uploaded = [];

  for (const [index, block] of figures.entries()) {
    const assetId = await uploadImage(client, block.sourceUrl, cache);
    uploaded.push(imageReference(assetId, block));
    console.log(
      `figure ${index + 1}/${figures.length} ${filenameFrom(block.sourceUrl)}`,
    );
  }

  const coverId = await uploadImage(client, cover, cache);
  console.log(`cover ${filenameFrom(cover)}`);

  let figureIndex = 0;
  const content = body.map((block) => {
    if (block._type !== "image") return block;
    const image = uploaded[figureIndex];
    figureIndex += 1;
    return image;
  });

  await client.createOrReplace({
    _id: documentId,
    _type: "post",
    title: tidy(
      new JSDOM(`<p>${post.title.rendered}</p>`).window.document.body
        .textContent ?? "",
    ),
    slug: { _type: "slug", current: post.slug },
    publishedAt: `${post.date_gmt}.000Z`,
    excerpt: lede,
    cover: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: tidy(
        new JSDOM(`<p>${post.title.rendered}</p>`).window.document.body
          .textContent ?? "",
      ),
    },
    body: content,
  });

  const saved = await client.fetch(
    `*[_id == $id][0]{title, "slug": slug.current, publishedAt, "figures": count(body[_type == "image"])}`,
    { id: documentId },
  );
  console.log(JSON.stringify(saved, null, 2));
}

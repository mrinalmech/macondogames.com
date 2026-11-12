import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { BlogImage } from "@/components/blog/blog-image/blog-image";
import type { SanityImage } from "@/sanity/types";
import styles from "./body.module.scss";

type ImageBlock = SanityImage & {
  caption?: string | null;
};

type ImagePairBlock = {
  left?: SanityImage | null;
  right?: SanityImage | null;
  caption?: string | null;
};

type LinkAnnotation = {
  _type: "link";
  href?: string;
};

function LinkMark({ children, value }: PortableTextMarkComponentProps<LinkAnnotation>) {
  const href = value?.href;

  if (!href) return <>{children}</>;

  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      className={styles.link}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {children}
    </a>
  );
}

function Figure({ value }: { value: ImageBlock }) {
  if (!value.asset?.url) return null;

  return (
    <figure className={styles.figure}>
      <BlogImage image={value} />
      {value.caption ? <figcaption className={styles.caption}>{value.caption}</figcaption> : null}
    </figure>
  );
}

function hasAsset(image: SanityImage | null | undefined): image is SanityImage {
  return Boolean(image?.asset?.url);
}

function ImagePair({ value }: { value: ImagePairBlock }) {
  const images = [value.left, value.right].filter(hasAsset);

  if (images.length === 0) return null;

  return (
    <figure className={styles.figure}>
      <div className={styles.row}>
        {images.map((image) => (
          <BlogImage key={image.asset?.url} image={image} />
        ))}
      </div>
      {value.caption ? <figcaption className={styles.pairCaption}>{value.caption}</figcaption> : null}
    </figure>
  );
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={styles.p}>{children}</p>,
    h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
  },
  marks: {
    link: LinkMark,
  },
  types: {
    image: ({ value }) => <Figure value={value as ImageBlock} />,
    imagePair: ({ value }) => <ImagePair value={value as ImagePairBlock} />,
  },
};

export function Body({ value }: { value: PortableTextBlock[] | null }) {
  if (!value?.length) return null;

  return (
    <div className={styles.body}>
      <PortableText value={value} components={components} />
    </div>
  );
}

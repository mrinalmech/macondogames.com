const image = `{
  alt,
  asset { _ref }
}`;

export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  postedBy,
  cover ${image}
}`;

export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  postedBy,
  cover ${image},
  body[] {
    ...,
    _type == "image" => {
      ...,
      asset { _ref }
    },
    _type == "imagePair" => {
      ...,
      left ${image},
      right ${image}
    }
  }
}`;

export const postSlugsQuery = `*[_type == "post" && defined(slug.current)] {
  "slug": slug.current
}`;

export const sitemapPostsQuery = `*[_type == "post" && defined(slug.current)] {
  "slug": slug.current,
  "updatedAt": _updatedAt
}`;

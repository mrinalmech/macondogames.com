const image = `{
  alt,
  asset->{
    url,
    mimeType,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height
  }
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
      asset->{
        url,
        mimeType,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height
      }
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

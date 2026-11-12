import { defineArrayMember, defineField, defineType } from "sanity";
import { ImagePairInput } from "@/sanity/inputs/image-pair-input";

function bodyImage(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alternative text",
        type: "string",
      }),
    ],
    validation: (rule) => rule.required(),
  });
}

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      description: "The original publication date.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "postedBy",
      title: "Posted by",
      type: "string",
      description: "Your name is added the first time this post is published.",
      readOnly: true,
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "cover",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    validation: (rule) => rule.required(),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
            }),
            defineField({
              name: "caption",
              type: "text",
              rows: 2,
            }),
          ],
        }),
        defineArrayMember({
          type: "object",
          name: "imagePair",
          title: "Image pair",
          fields: [
            bodyImage("left", "Left image"),
            bodyImage("right", "Right image"),
            defineField({
              name: "caption",
              title: "Caption",
              type: "text",
              rows: 2,
            }),
          ],
          components: { input: ImagePairInput },
          preview: {
            select: { title: "caption", media: "left" },
            prepare({ title, media }) {
              return { title: title || "Image pair", media };
            },
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Published",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "cover",
    },
  },
});

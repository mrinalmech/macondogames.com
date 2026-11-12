"use client";

import { Stack } from "@sanity/ui";
import { ObjectInputMember, type ObjectInputProps, type ObjectMember } from "sanity";

function field(members: ObjectMember[], name: string) {
  return members.find((member) => member.kind === "field" && member.name === name);
}

export function ImagePairInput(props: ObjectInputProps) {
  const {
    members,
    renderAnnotation,
    renderBlock,
    renderField,
    renderInlineBlock,
    renderInput,
    renderItem,
    renderPreview,
  } = props;
  const left = field(members, "left");
  const right = field(members, "right");
  const caption = field(members, "caption");
  const render = {
    renderAnnotation,
    renderBlock,
    renderField,
    renderInlineBlock,
    renderInput,
    renderItem,
    renderPreview,
  };

  return (
    <Stack gap={4}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "1rem",
          alignItems: "start",
        }}
      >
        {left ? <ObjectInputMember member={left} {...render} /> : null}
        {right ? <ObjectInputMember member={right} {...render} /> : null}
      </div>
      {caption ? <ObjectInputMember member={caption} {...render} /> : null}
    </Stack>
  );
}

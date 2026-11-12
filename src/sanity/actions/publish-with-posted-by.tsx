"use client";

import { useEffect, useRef, useState } from "react";
import {
  useCurrentUser,
  useDocumentOperation,
  type DocumentActionComponent,
  type DocumentActionProps,
} from "sanity";

function postedByOf(document: DocumentActionProps["draft"]) {
  const value = document?.postedBy;
  return typeof value === "string" ? value.trim() : "";
}

// The built-in Publish button stays disabled when nothing else changed.
// This post was imported already published, so the first click has to write
// the byline and then publish that change. Later publishes leave the name.
export function publishWithPostedBy(
  publishAction: DocumentActionComponent,
): DocumentActionComponent {
  const PublishWithPostedBy: DocumentActionComponent = (props) => {
    const original = publishAction(props);
    const currentUser = useCurrentUser();
    const { patch, publish } = useDocumentOperation(props.id, props.type);
    const [phase, setPhase] = useState<"idle" | "stamp" | "publish">("idle");
    const stamped = useRef(false);
    const sent = useRef(false);
    const name = currentUser?.name.trim() ?? "";
    const draftName = postedByOf(props.draft);
    const publishedName = postedByOf(props.published);
    const { onComplete } = props;

    useEffect(() => {
      if (!name) return;

      if (phase === "stamp") {
        if (patch.disabled || stamped.current) return;
        stamped.current = true;
        patch.execute([{ set: { postedBy: name } }]);
        setPhase("publish");
        return;
      }

      if (phase !== "publish") return;
      // Wait until the draft actually contains the name. Publishing earlier
      // can ship the previous version and leave the byline unpublished.
      if (draftName !== name || publish.disabled || sent.current) return;
      sent.current = true;
      publish.execute();
      setPhase("idle");
      onComplete();
    }, [draftName, name, onComplete, patch, phase, publish]);

    if (!original) return null;

    const existing = draftName || publishedName;
    const needsName =
      !existing &&
      (publish.disabled === false ||
        publish.disabled === "ALREADY_PUBLISHED" ||
        publish.disabled === "NO_CHANGES");

    if (!needsName) return original;

    return {
      ...original,
      disabled: !name,
      label: phase === "idle" ? original.label : "Publishing…",
      onHandle: () => {
        setPhase("stamp");
      },
    };
  };

  PublishWithPostedBy.action = "publish";
  return PublishWithPostedBy;
}

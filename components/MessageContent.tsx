import React, { memo, useMemo } from "react";

interface MessageContentProps {
  content: string;
}

// Emoji pattern: [emote:ID:NAME]
const EMOTE_REGEX = /\[emote:(\d+):([^\]]+)\]/g;
const EMOTE_BASE_URL = "https://files.kick.com/emotes";

type MessagePart = {
  type: "text" | "emote";
  content: string;
  emoteId?: string;
  emoteName?: string;
};

function parseMessage(content: string): MessagePart[] {
  const parts: MessagePart[] = [];
  let lastIndex = 0;

  // Tüm emote'ları bul
  const matches = content.matchAll(EMOTE_REGEX);

  for (const match of matches) {
    const [fullMatch, emoteId, emoteName] = match;
    const matchIndex = match.index!;

    // Emote'dan önceki text'i ekle
    if (matchIndex > lastIndex) {
      parts.push({
        type: "text",
        content: content.slice(lastIndex, matchIndex),
      });
    }

    // Emote'u ekle
    parts.push({
      type: "emote",
      content: fullMatch,
      emoteId,
      emoteName,
    });

    lastIndex = matchIndex + fullMatch.length;
  }

  // Kalan text'i ekle
  if (lastIndex < content.length) {
    parts.push({
      type: "text",
      content: content.slice(lastIndex),
    });
  }

  return parts;
}

const MessageContent = memo(({ content }: MessageContentProps) => {
  const parts = useMemo(() => parseMessage(content), [content]);

  return (
    <>
      {parts.map((part, index) => {
        if (part.type === "emote") {
          return (
            <img
              key={`${part.emoteId}-${index}`}
              src={`${EMOTE_BASE_URL}/${part.emoteId}/fullsize`}
              alt={part.emoteName}
              title={part.emoteName}
              className="inline-block h-7 w-auto mx-0.5 align-middle"
              loading="lazy"
              onError={(e) => {
                // Hata durumunda emoji adını göster
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.insertAdjacentText("afterend", `[${part.emoteName}]`);
              }}
            />
          );
        }
        return <span key={index}>{part.content}</span>;
      })}
    </>
  );
});

MessageContent.displayName = "MessageContent";

export default MessageContent;
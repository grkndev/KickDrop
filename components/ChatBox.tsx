import React, { useCallback, useEffect, useRef } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Separator } from "./ui/separator";
import dayjs from "dayjs";
import { ScrollArea } from "./ui/scroll-area";
import { BadgeCheck, Bot, Crown, Gem, Gift, Mic, Podcast, Sword } from "lucide-react";
import { ChatMessage } from "@/lib/ChatMessage.type";
import MessageContent from "./MessageContent";
import { getBadge } from "./ChatBadge";

export default function ChatBox({
  messages = [],
}: {
  messages: ChatMessage[];
}) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback((smooth = true) => {
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement;

    if (viewport) {
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom(messages.length > 1);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages, scrollToBottom]);

  return (
    <ScrollArea
      ref={scrollAreaRef}
      className="h-full w-full flex-1 [&>[data-radix-scroll-area-viewport]]:max-h-[calc(93vh-200px)] "
    >
      <div className="">
        {messages.map((message, index) => (
          <React.Fragment
            key={`${message.sender.id}-${message.created_at}-${index}`}
          >
            <div className="leading-relaxed max-w-[85%]">
              {message.sender.identity.badges.map((badge) => {
                return (
                  <Tooltip
                    key={`${message.sender.id}-${message.created_at}-${badge.text}`}
                  >
                    <TooltipTrigger asChild>
                      <span className="inline-block align-middle mr-1">
                        {getBadge(badge.type)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{badge.text}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
              <b
                style={{
                  color: message.sender.identity.color,
                }}
              >
                {message.sender.username}
              </b>
              : <MessageContent content={message.content} />
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}


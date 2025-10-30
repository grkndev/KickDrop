import React, { useCallback, useEffect, useRef } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Separator } from "./ui/separator";
import dayjs from "dayjs";
import { ScrollArea } from "./ui/scroll-area";
import { BadgeCheck, Bot, Crown, Gem, Gift, Mic, Podcast, Sword } from "lucide-react";
import { ChatMessage } from "@/lib/ChatMessage.type";
import MessageContent from "./MessageContent";
import { Label } from "./ui/label";

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
      className="h-full w-full flex-1 [&>[data-radix-scroll-area-viewport]]:max-h-[calc(95vh-200px)]"
    >
      <div className="pr-4">
        {messages.map((message, index) => (
          <React.Fragment
            key={`${message.sender.id}-${message.created_at}-${index}`}
          >
            <div className="leading-relaxed">
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

function getBadge(badge: string) {
  switch (badge) {
    case Badge.OG:
      return  <div className="bg-yellow-600 p-1 rounded-sm">
      <Crown size={14} />
    </div>
    case Badge.VIP:
      return (
        <div className="bg-pink-500 p-1 rounded-sm">
          <Gem size={14} />
        </div>
      );
    case Badge.Subscriber:
      return (
        <div className="bg-zinc-500 p-1 rounded-sm">
          <Podcast size={14} />
        </div>
      );
    case Badge.Mod:
      return (
        <div className="bg-purple-500 p-1 rounded-sm">
          <Sword size={14} />
        </div>
      );
    case Badge.Bot:
      return (
        <div className="bg-blue-500 p-1 rounded-sm">
          <Bot size={14} />
        </div>
      );
    case Badge.Verified:
      return (
        <div className="bg-kick p-1 rounded-sm">
          <BadgeCheck size={14} />
        </div>
      );
    case Badge.Broadcaster:
      return (
        <div className="bg-red-500 p-1 rounded-sm">
          <Mic size={14} />
        </div>
      );

    case Badge.Gifter:
      return (
        <div className="bg-orange-500 p-1 rounded-sm">
          <Gift size={14} />
        </div>
      );
  }
}

enum Badge {
  Subscriber = "subscriber",
  Gifter = "sub_gifter",
  Mod = "moderator",
  Bot = "bot",
  Verified = "verified",
  Broadcaster = "broadcaster",
  VIP = "vip",
  OG = "og",
}
import React, { useCallback, useEffect, useRef } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Separator } from "./ui/separator";
import dayjs from "dayjs";
import { ScrollArea } from "./ui/scroll-area";
import { Gem } from "lucide-react";
import { ChatMessage } from "@/lib/ChatMessage.type";
import MessageContent from "./MessageContent";

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
            <div className="flex flex-row gap-2 items-start">
              {/* <span className="text-xs text-zinc-500">
                {dayjs(Date.now()).format("HH:mm:ss")}
              </span> */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-pink-500 p-1 rounded-sm">
                    <Gem size={14} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>VIP</p>
                </TooltipContent>
              </Tooltip>
              <span className="font-semibold text-warp wrap-break-word">
                {message.sender.username}:{" "}
                <MessageContent content={message.content} />
              </span>
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}

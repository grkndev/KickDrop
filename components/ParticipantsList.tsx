import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Gem } from "lucide-react";
import { ChatMessage } from "@/lib/ChatMessage.type";
import { getBadge } from "./ChatBadge";

interface ParticipantsListProps {
  participants: ChatMessage[];
}

export default function ParticipantsList({ participants }: ParticipantsListProps) {
  return (
    <ScrollArea className="h-full w-full flex-1 [&>[data-radix-scroll-area-viewport]]:max-h-[calc(93vh-200px)]">
      {participants.map((participant, index) => (
        <div key={`${participant.sender.username}-${index}`}>
          <div className="flex flex-row gap-2 items-center">
            {participant.sender?.identity?.badges?.map((badge: any, i: number) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  {getBadge(badge.type)}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{badge.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            <span className="font-semibold">{participant.sender.username}</span>
          </div>
          <Separator className="my-2" />
        </div>
      ))}
    </ScrollArea>
  );
}
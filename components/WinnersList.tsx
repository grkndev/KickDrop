import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Gem } from "lucide-react";
import { ChatMessage } from "@/lib/ChatMessage.type";

interface WinnersListProps {
  winners: ChatMessage[];
}

export default function WinnersList({ winners }: WinnersListProps) {
  return (
    <ScrollArea className="h-full w-full flex-1 [&>[data-radix-scroll-area-viewport]]:max-h-[calc(95vh-200px)]">
      {winners.map((winner, index) => (
        <div key={`${winner.sender.username}-${index}`}>
          <div className="flex flex-row gap-2 items-center">
            {winner.sender?.identity?.badges?.map((badge: any, i: number) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <div className="bg-pink-500 p-1 rounded-sm">
                    <Gem size={14} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{badge.type}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            <span className="font-semibold">{winner.sender.username}</span>
          </div>
          <Separator className="my-2" />
        </div>
      ))}
    </ScrollArea>
  );
}

import { Badge } from "@/lib/utils";
import {
  BadgeCheck,
  Bot,
  Crown,
  Gem,
  Gift,
  Mic,
  Podcast,
  Sword,
  Verified,
} from "lucide-react";
import VerifiedIcon from "./ui/VerfiedIcon";

export function getBadge(badge: string) {
  switch (badge) {
    case Badge.OG:
      return (
        <div className="bg-yellow-600 p-1 rounded-sm">
          <Crown size={14} />
        </div>
      );
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
        <div className="">
          <VerifiedIcon size={14} />
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

import { useCallback } from "react";
import { ChatMessage } from "@/lib/ChatMessage.type";
import { MessageFilterType } from "@/lib/utils";

interface FilterOptions {
  message: string;
  messageFilter: MessageFilterType;
  subsOnly: boolean;
  followersOnly: boolean;
  vipsOnly: boolean;
  modsOnly: boolean;
  subsPeriod: number;
}

export const useMessageFilter = () => {
  const filterMessage = useCallback(
    (msg: ChatMessage, options: FilterOptions): boolean => {
      if (options.message.trim()) {
        const msgContent = msg.content.toLowerCase();
        const filterText = options.message.toLowerCase();

        switch (options.messageFilter) {
          case MessageFilterType.Equals:
            if (msgContent !== filterText) return false;
            break;
          case MessageFilterType.Contains:
            if (!msgContent.includes(filterText)) return false;
            break;
          case MessageFilterType.StartsWith:
            if (!msgContent.startsWith(filterText)) return false;
            break;
          case MessageFilterType.EndsWith:
            if (!msgContent.endsWith(filterText)) return false;
            break;
        }
      }

      if (options.subsOnly) {
        const hasSubBadge = msg.sender?.identity?.badges?.some(
          (badge: any) => badge.type === "subscriber"
        );
        if (!hasSubBadge) return false;

        const subBadge = msg.sender?.identity?.badges?.find(
          (badge: any) => badge.type === "subscriber"
        );
        if (subBadge && subBadge.count < options.subsPeriod) return false;
      }

      if (options.followersOnly) {
        const hasFollowerBadge = msg.sender?.identity?.badges?.some(
          (badge: any) => badge.type === "follower"
        );
        if (!hasFollowerBadge) return false;
      }

      if (options.vipsOnly) {
        const hasVipBadge = msg.sender?.identity?.badges?.some(
          (badge: any) => badge.type === "vip"
        );
        if (!hasVipBadge) return false;
      }

      if (options.modsOnly) {
        const hasModBadge = msg.sender?.identity?.badges?.some(
          (badge: any) => badge.type === "moderator"
        );
        if (!hasModBadge) return false;
      }

      return true;
    },
    []
  );

  return { filterMessage };
};
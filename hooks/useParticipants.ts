import { useState, useCallback } from "react";
import { ChatMessage } from "@/lib/ChatMessage.type";
import { MessageFilterType } from "@/lib/utils";
import { toast } from "sonner";

interface FilterOptions {
  message: string;
  messageFilter: MessageFilterType;
  subsOnly: boolean;
  followersOnly: boolean;
  vipsOnly: boolean;
  modsOnly: boolean;
  subsPeriod: number;
  subsLuck: number;
}

export const useParticipants = () => {
  const [participants, setParticipants] = useState<ChatMessage[]>([]);
  const [winners, setWinners] = useState<ChatMessage[]>([]);

  const addParticipant = useCallback(
    (msg: ChatMessage, options: FilterOptions) => {
      setParticipants((prev) => {
        const exists = prev.some(
          (p) => p.sender.username === msg.sender.username
        );
        if (exists) return prev;

        let addCount = 1;
        if (options.subsOnly && options.subsLuck > 1) {
          const hasSubBadge = msg.sender?.identity?.badges?.some(
            (badge: any) => badge.type === "subscriber"
          );
          if (hasSubBadge) {
            addCount = Math.floor(options.subsLuck);
          }
        }

        return [...prev, ...Array(addCount).fill(msg)];
      });
    },
    []
  );

  const pickWinner = useCallback(() => {
    if (participants.length === 0) {
      toast.error("No participants available!");
      return;
    }

    // Daha önce kazanmamış katılımcıları filtrele
    const availableParticipants = participants.filter(
      (participant) => !winners.some((winner) => winner.id === participant.id)
    );

    // Eğer herkes kazandıysa
    if (availableParticipants.length === 0) {
      toast.error("Everybody already won!");
      return;
    }

    // Rastgele kazanan seç
    const randomIndex = Math.floor(Math.random() * availableParticipants.length);
    const winner = availableParticipants[randomIndex];

    setWinners((prev) => [...prev, winner]);

    toast.success(`Winner: ${winner.sender.username}`);
  }, [participants, winners]);

  const clearParticipants = useCallback(() => {
    setParticipants([]);
    toast.success("Participants cleared!");
  }, []);

  const clearWinners = useCallback(() => {
    setWinners([]);
    toast.success("Winners cleared!");
  }, []);

  return {
    participants,
    winners,
    addParticipant,
    pickWinner,
    clearParticipants,
    clearWinners,
  };
};
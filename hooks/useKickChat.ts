import { useState, useEffect, useRef } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { toast } from "sonner";
import { ChatMessage } from "@/lib/ChatMessage.type";
import { parseData } from "@/lib/utils";

export const useKickChat = (
  streamName: string | null,
  onMessage: (data: ChatMessage) => void
) => {
  const [chatRoomId, setChatRoomId] = useState<string | undefined>();
  const [chatData, setChatData] = useState<ChatMessage[]>([]);
  const onMessageRef = useRef(onMessage);

  // onMessage callback'ini güncel tut
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    axios
      .get(`https://kick.com/api/v2/channels/${streamName}/chatroom`)
      .then((res) => setChatRoomId(res.data.id))
      .catch((err) => {
        console.error("Room ID fetch error:", err);
        toast.error("Failed to get chat room");
      });
  }, [streamName]);

  useEffect(() => {
    if (!chatRoomId || !streamName) return;

    console.log("🔌 Connecting to Pusher...");

    const pusher = new Pusher("32cbd69e4b950bf97679", {
      cluster: "us2",
      forceTLS: true,
      enabledTransports: ["ws", "wss"],
    });

    pusher.connection.bind("connected", () => {
      console.log("✅ Connected to chat");
      toast.success("Connected to chat");
    });

    pusher.connection.bind("error", (err: any) => {
      console.error("❌ Connection error:", err);
      toast.error("Connection error");
    });

    const channel = pusher.subscribe(`chatrooms.${chatRoomId}.v2`);

    channel.bind("App\\Events\\ChatMessageEvent", (data: any) => {
      const parsed: ChatMessage = parseData(data);
      setChatData((prev) => [...(prev ?? []), parsed]);
      onMessageRef.current(parsed); // Ref kullan
    });

    return () => {
      console.log("🔌 Disconnecting from Pusher...");
      pusher.unsubscribe(`chatrooms.${chatRoomId}.v2`);
      pusher.disconnect();
    };
  }, [chatRoomId]); // onMessage dependency'den çıkar

  return { chatData, chatRoomId };
};
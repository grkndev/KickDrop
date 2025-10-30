"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import dayjs from "dayjs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { mapRange, MessageFilterType, parseData } from "@/lib/utils";
import { Gem, Minus, Plus } from "lucide-react";
import React from "react";
import ChatBox from "@/components/ChatBox";
import Pusher from "pusher-js";
import { ChatMessage } from "@/lib/ChatMessage.type";
const tags = Array.from({ length: 50 })
  .map((_, i, a) => `grkndev ${a.length - i}`)
  .reverse();

export default function Home() {
  const [subsPeriod, setSubsPeriod] = React.useState(1);
  const [subsLuck, setSubsLuck] = React.useState(1);
  const [message, setMessage] = React.useState("");
  const [chatData, setChatData] = React.useState<ChatMessage[]>();
  const [messageFilter, setMessageFilter] = React.useState<MessageFilterType>(
    MessageFilterType.Contains
  );
  const updateChat = React.useEffectEvent((data: any) => {
   
      const parsed: ChatMessage = parseData(data);
      setChatData((prev) => [...(prev ?? []), parsed]);
   
  });

  React.useEffect(() => {
    const pusher = new Pusher("32cbd69e4b950bf97679", {
      cluster: "us2",
      forceTLS: true,
      enabledTransports: ["ws", "wss"],
    });

    pusher.connection.bind("connected", () => {
      console.log("✅ Pusher connection established.");
    });

    pusher.connection.bind("error", (err: any) => {
      console.error("❌ Pusher connection error:", err);
    });
    const channel = pusher.subscribe("chatrooms.1000890.v2");

    channel.bind("App\\Events\\ChatMessageEvent", (data: any) => {
      updateChat(data);
    });

    return () => {
      pusher.unsubscribe("chatrooms.1000890.v2");
      pusher.disconnect();
    };
  }, []);

  const handleSubsLuckChange = React.useCallback((e: number[]) => {
    const value = e[0];
    let rangedValue = mapRange(value, 0, 100, 1, 4).toFixed(1);
    setSubsLuck(Number(rangedValue));
  }, []);

  const handleSubsAdjustment = React.useCallback((adjustment: number) => {
    setSubsPeriod((prevCount) =>
      Math.max(1, Math.min(99, prevCount + adjustment))
    );
  }, []);

  const handleSubsInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value) && value >= 1 && value <= 99) {
        setSubsPeriod(value);
      }
    },
    []
  );
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 gap-4">
      <Header />
      <div className="h-full w-full grid grid-cols-4 gap-4">
        <Card className="w-full h-full">
          <CardHeader className="flex">
            <CardTitle className="text-2xl font-bold">Settings</CardTitle>
          </CardHeader>
          <Separator className="bg-kick" />
          <CardContent className="h-full">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                {/* MESSAGE_INPUT */}
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1">
                    <Input
                      placeholder="message..."
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Label className="text-xs text-zinc-500">
                      The message users must write to participate. If you leave
                      it blank, anyone who writes any message will participate.
                    </Label>
                  </div>
                  <Button className="bg-kick hover:bg-kick/75">Update</Button>
                </div>

                {/* MESSAGE SETTING */}
                <div className="flex flex-col gap-2">
                  <h2>Message settings</h2>
                  <RadioGroup
                    defaultValue="equals"
                    className="flex"
                    onValueChange={(e) =>
                      setMessageFilter(e as MessageFilterType)
                    }
                    value={messageFilter}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value={MessageFilterType.Equals}
                        id="r1"
                      />
                      <Label htmlFor="r1">Equals</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value={MessageFilterType.Contains}
                        id="r2"
                      />
                      <Label htmlFor="r2">Contains</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value={MessageFilterType.StartsWith}
                        id="r3"
                      />
                      <Label htmlFor="r3">Starts with</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value={MessageFilterType.EndsWith}
                        id="r4"
                      />
                      <Label htmlFor="r4">Ends with</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator className="bg-kick" />

                {/* SWITCHS */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <Label className="text-lg" htmlFor="subs-only">
                      Subscribers only
                    </Label>
                    <Switch
                      id="subs-only"
                      className="data-[state=checked]:bg-kick"
                      size="lg"
                    />
                  </div>
                  <div className="flex justify-between">
                    <Label className="text-lg" htmlFor="follower-only">
                      Followers only
                    </Label>
                    <Switch
                      id="follower-only"
                      className="data-[state=checked]:bg-kick"
                      size="lg"
                    />
                  </div>
                  <div className="flex justify-between">
                    <Label className="text-lg" htmlFor="vips-only">
                      VIPs only
                    </Label>
                    <Switch
                      id="vips-only"
                      className="data-[state=checked]:bg-kick"
                      size="lg"
                    />
                  </div>
                  <div className="flex justify-between">
                    <Label className="text-lg" htmlFor="mods-only">
                      Mods only
                    </Label>
                    <Switch
                      id="mods-only"
                      className="data-[state=checked]:bg-kick"
                      size="lg"
                    />
                  </div>
                </div>
                <Separator className="bg-kick" />

                {/* SUBS Settings */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldLabel htmlFor="number-of-gpus-f6l">
                          Subs period
                        </FieldLabel>
                        <FieldDescription>month(s) and above</FieldDescription>
                      </FieldContent>
                      <ButtonGroup>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          type="button"
                          aria-label="Decrement"
                          onClick={() => handleSubsAdjustment(-1)}
                          disabled={subsPeriod <= 1}
                        >
                          <Minus />
                        </Button>
                        <Input
                          id="number-of-gpus-f6l"
                          value={subsPeriod}
                          onChange={handleSubsInputChange}
                          size={3}
                          className="h-8 !w-14 text-center"
                          maxLength={3}
                        />

                        <Button
                          variant="outline"
                          size="icon-sm"
                          type="button"
                          aria-label="Increment"
                          onClick={() => handleSubsAdjustment(1)}
                          disabled={subsPeriod >= 99}
                        >
                          <Plus />
                        </Button>
                      </ButtonGroup>
                    </Field>
                  </div>

                  <div className="flex flex-col gap-0">
                    <h3 className="text-lg font-medium">Subs luck</h3>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[mapRange(subsLuck, 1, 4, 1, 100)]}
                        onValueChange={handleSubsLuckChange}
                        min={1}
                        max={100}
                        defaultValue={[1]}
                      />
                      <Label className="text-lg">{subsLuck}x</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button className="w-full py-6 bg-kick hover:bg-kick/75 text-base font-semibold">
                  Pick Winner
                </Button>
                <div className=" flex flex-row gap-2">
                  <Button className="flex-1 py-6 bg-[#404040] hover:bg-[#404040]/75 text-white font-semibold">
                    Clear Participants
                  </Button>
                  <Button className="flex-1 py-6 bg-[#404040] hover:bg-[#404040]/75 text-white font-semibold">
                    Clear Winners
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Chat</CardTitle>
          </CardHeader>
          <Separator className="bg-kick" />
          <CardContent className="relative overflow-hidden" id="chatcontent">
            <ChatBox messages={chatData ?? []} />
          </CardContent>
        </Card>

        <Card className="w-full h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Participants</CardTitle>
            <h2 className="text-2xl font-bold text-kick">0</h2>
          </CardHeader>
          <Separator className="bg-kick" />
          <CardContent className="relative overflow-hidden" id="chatcontent">
            <ScrollArea
              className={`h-full w-full flex-1 [&>[data-radix-scroll-area-viewport]]:max-h-[calc(95vh-200px)]`}
            >
              {tags.map((tag) => (
                <React.Fragment key={tag}>
                  <div className="flex flex-row gap-2 items-center">
                    <span className="text-xs text-zinc-500">
                      {/* {dayjs(Date.now()).format("HH:mm:ss")} */}
                    </span>
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
                    <span className="font-semibold">{tag}</span>
                  </div>
                  <Separator className="my-2" />
                </React.Fragment>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="w-full h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Winners</CardTitle>
            <h2 className="text-2xl font-bold text-kick">0</h2>
          </CardHeader>
          <Separator className="bg-kick" />
          <CardContent className="relative overflow-hidden" id="chatcontent">
            <ScrollArea
              className={`h-full w-full flex-1 [&>[data-radix-scroll-area-viewport]]:max-h-[calc(95vh-200px)]`}
            >
              {/* {tags.map((tag) => (
                <React.Fragment key={tag}>
                  <div className="flex flex-row gap-2 items-center">
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
                    <span className="font-semibold">{tag}</span>
                  </div>
                  <Separator className="my-2" />
                </React.Fragment>
              ))} */}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

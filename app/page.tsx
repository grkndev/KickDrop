"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { mapRange, MessageFilterType } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import React from "react";
import ChatBox from "@/components/ChatBox";
import Loading from "@/components/Loading";
import ParticipantsList from "@/components/ParticipantsList";
import WinnersList from "@/components/WinnersList";
import { useKickChat } from "@/hooks/useKickChat";
import { useParticipants } from "@/hooks/useParticipants";
import { useMessageFilter } from "@/hooks/useMessageFilter";
import { useFilterSettings } from "@/hooks/useFilterSettings";
import Landing from "@/components/Landing";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export default function Home() {
  const [streamName, setStreamerName] = React.useState("");

  const filterSettings = useFilterSettings();
  const { filterMessage } = useMessageFilter();
  const {
    participants,
    winners,
    addParticipant,
    pickWinner,
    clearParticipants,
    clearWinners,
  } = useParticipants();

  const handleMessage = React.useCallback(
    (msg: any) => {
      const options = {
        message: filterSettings.message,
        messageFilter: filterSettings.messageFilter,
        subsOnly: filterSettings.subsOnly,
        followersOnly: filterSettings.followersOnly,
        vipsOnly: filterSettings.vipsOnly,
        modsOnly: filterSettings.modsOnly,
        subsPeriod: filterSettings.subsPeriod,
        subsLuck: filterSettings.subsLuck,
      };

      if (filterMessage(msg, options)) {
        addParticipant(msg, options);
      }
    },
    [
      filterSettings.message,
      filterSettings.messageFilter,
      filterSettings.subsOnly,
      filterSettings.followersOnly,
      filterSettings.vipsOnly,
      filterSettings.modsOnly,
      filterSettings.subsPeriod,
      filterSettings.subsLuck,
      filterMessage,
      addParticipant,
    ]
  );

  const { chatData, chatRoomId, clearChat } = useKickChat(
    streamName || null,
    handleMessage
  );

  const handleDisconnect = React.useCallback(() => {
    setStreamerName("");
    clearChat();
    clearParticipants();
    clearWinners();
  }, []);

  const handleSubsLuckChange = React.useCallback(
    (e: number[]) => {
      const value = e[0];
      let rangedValue = mapRange(value, 0, 100, 1, 4).toFixed(1);
      filterSettings.setSubsLuck(Number(rangedValue));
    },
    [filterSettings]
  );

  const handleSubsAdjustment = React.useCallback(
    (adjustment: number) => {
      filterSettings.setSubsPeriod((prev) =>
        Math.max(1, Math.min(99, prev + adjustment))
      );
    },
    [filterSettings]
  );

  const handleSubsInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value) && value >= 1 && value <= 99) {
        filterSettings.setSubsPeriod(value);
      }
    },
    [filterSettings]
  );

  const handleStreamerName = (streamerName: string) =>
    setStreamerName(streamerName);

  if (!chatRoomId) return <Loading />;
  if (!streamName) return <Landing handleStreamerName={handleStreamerName} />;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 gap-4">
      <Header />
      <div className="h-full w-full grid grid-cols-4 gap-4">
        {/* Settings Card */}
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Settings</CardTitle>
          </CardHeader>
          <Separator className="bg-kick" />
          <CardContent className="h-full">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                {/* Message Input */}
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1">
                    <Input
                      placeholder="message..."
                      value={filterSettings.message}
                      onChange={(e) =>
                        filterSettings.setMessage(e.target.value)
                      }
                    />
                    <Label className="text-xs text-zinc-500">
                      The message users must write to participate. If you leave
                      it blank, anyone who writes any message will participate.
                    </Label>
                  </div>
                  <Button className="bg-kick hover:bg-kick/75">Update</Button>
                </div>

                {/* Message Settings */}
                <div className="flex flex-col gap-2">
                  <h2>Message settings</h2>
                  <RadioGroup
                    className="flex"
                    onValueChange={(e) =>
                      filterSettings.setMessageFilter(e as MessageFilterType)
                    }
                    value={filterSettings.messageFilter}
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

                {/* Switches */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <Label className="text-lg" htmlFor="subs-only">
                      Subscribers only
                    </Label>
                    <Switch
                      id="subs-only"
                      className="data-[state=checked]:bg-kick"
                      size="lg"
                      checked={filterSettings.subsOnly}
                      onCheckedChange={filterSettings.setSubsOnly}
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
                      checked={filterSettings.followersOnly}
                      onCheckedChange={filterSettings.setFollowersOnly}
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
                      checked={filterSettings.vipsOnly}
                      onCheckedChange={filterSettings.setVipsOnly}
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
                      checked={filterSettings.modsOnly}
                      onCheckedChange={filterSettings.setModsOnly}
                    />
                  </div>
                </div>
                <Separator className="bg-kick" />

                {/* Subs Settings */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldLabel htmlFor="subs-period">
                          Subs period
                        </FieldLabel>
                        <FieldDescription>month(s) and above</FieldDescription>
                      </FieldContent>
                      <ButtonGroup>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          type="button"
                          onClick={() => handleSubsAdjustment(-1)}
                          disabled={filterSettings.subsPeriod <= 1}
                        >
                          <Minus />
                        </Button>
                        <Input
                          id="subs-period"
                          value={filterSettings.subsPeriod}
                          onChange={handleSubsInputChange}
                          size={3}
                          className="h-8 !w-14 text-center"
                          maxLength={3}
                        />
                        <Button
                          variant="outline"
                          size="icon-sm"
                          type="button"
                          onClick={() => handleSubsAdjustment(1)}
                          disabled={filterSettings.subsPeriod >= 99}
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
                        value={[
                          mapRange(filterSettings.subsLuck, 1, 4, 1, 100),
                        ]}
                        onValueChange={handleSubsLuckChange}
                        min={1}
                        max={100}
                        defaultValue={[1]}
                      />
                      <Label className="text-lg">
                        {filterSettings.subsLuck}x
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  className="w-full py-6 bg-kick hover:bg-kick/75 text-base font-semibold"
                  onClick={pickWinner}
                  disabled={participants.length === 0}
                >
                  Pick Winner
                </Button>
                <div className="flex flex-row gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="flex-1 py-6 bg-[#404040] hover:bg-[#404040]/75 text-white font-semibold">
                        Clear Participants
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. Your participant list
                          will be completely cleared, and users will need to
                          re-register.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            className=" bg-[#404040] hover:bg-[#404040]/75 text-white font-semibold"
                            onClick={clearParticipants}
                          >
                            Clear Participants
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="flex-1 py-6 bg-[#404040] hover:bg-[#404040]/75 text-white font-semibold">
                        Clear Winners
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. Your winners list will
                          be completely deleted, and users will need to win
                          again.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            className=" bg-[#404040] hover:bg-[#404040]/75 text-white font-semibold"
                            onClick={clearWinners}
                          >
                            Clear Winners
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className="flex flex-row gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">Disconnect</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to leave the chat?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            className=" border-red-900 border-2 bg-[#390000] hover:bg-[#390000]/75 text-white font-semibold"
                            onClick={handleDisconnect}
                          >
                            Disconnect
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Card */}
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Chat</CardTitle>
          </CardHeader>
          <Separator className="bg-kick" />
          <CardContent className="relative overflow-hidden">
            <ChatBox messages={chatData ?? []} />
          </CardContent>
        </Card>

        {/* Participants Card */}
        <Card className="w-full h-full">
          <CardHeader className="flex flex-row items-center justify-between mb-2">
            <CardTitle className="text-2xl font-bold">Participants</CardTitle>
            <h2 className="text-2xl font-bold text-kick">
              {participants.length}
            </h2>
          </CardHeader>
          <Separator className="bg-kick" />
          <CardContent className="relative overflow-hidden">
            <ParticipantsList participants={participants} />
          </CardContent>
        </Card>

        {/* Winners Card */}
        <Card className="w-full h-full">
          <CardHeader className="flex flex-row items-center justify-between mb-2">
            <CardTitle className="text-2xl font-bold">Winners</CardTitle>
            <h2 className="text-2xl font-bold text-kick">{winners.length}</h2>
          </CardHeader>
          <Separator className="bg-kick" />
          <CardContent className="relative overflow-hidden">
            <WinnersList winners={winners} />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import Header from "./Header";

export default function Landing({
  handleStreamerName,
}: {
  handleStreamerName: (streamerName: string) => void;
}) {
  const [streamer, setStreamer] = React.useState<string>("");
  const checkStreamer = () => {
    if (!streamer || streamer.length == 0) return;
    toast.info("Checking chat");

    axios
      .get(`https://kick.com/api/v2/channels/atadogan/chatroom`)
      .then((res) => {
        if (res && res.data && res.data.id){
            handleStreamerName(streamer);
            return;
        }
      })
      .catch((err) => toast.error(err));
  };
  return (
    <div className=" w-full h-full flex flex-col gap-4 items-center justify-center ">
      <h1 className="font-bold text-5xl">
        Kick<span className="text-kick">Drop</span>
      </h1>
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Enter streamer name</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="wtcN"
            value={streamer}
            onChange={(e) => setStreamer(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <CardAction className="w-full">
            <Button className="bg-kick hover:bg-kick hover:opacity-80 w-full" onClick={checkStreamer}>Connect</Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}

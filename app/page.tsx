import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import React from "react";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 gap-4">
      <Header />
      <div className="h-full w-full flex flex-row gap-4">
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
                    <Input placeholder="message..." />
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
                  <RadioGroup defaultValue="contains" className="flex ">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="equals" id="r1" />
                      <Label htmlFor="r1">Equals</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="contains" id="r2" />
                      <Label htmlFor="r2">Contains</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="startswith" id="r3" />
                      <Label htmlFor="r3">Starts with</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="endswith" id="r4" />
                      <Label htmlFor="r4">Ends with</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator className="bg-kick" />

                {/* SWITCHS */}
                <div className="max-w-1/2 flex flex-col gap-2">
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
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-medium">Subs period</h3>
                    <Input
                      placeholder="0"
                      type="number"
                      inputMode="numeric"
                      className="max-w-16 text-center"
                    />
                    <h3 className="text-lg font-medium">month(s)</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium">Subs luck</h3>
                    <div className="flex items-center gap-4">
                      <Slider />
                      <Label className="text-lg">1,5x</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  className="w-full py-6 bg-kick hover:bg-kick/75 text-base font-semibold"
                 
                >
                  Pick Winner
                </Button>
                <div className=" flex flex-row gap-2">
                  <Button className="flex-1 py-6 bg-[#404040] hover:bg-[#404040]/75 text-white font-semibold">Clear Participants</Button>
                  <Button className="flex-1 py-6 bg-[#404040] hover:bg-[#404040]/75 text-white font-semibold">Clear Winners</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Participants</CardTitle>
            <h2 className="text-2xl font-bold text-kick">0</h2>
          </CardHeader>
          <Separator className="bg-kick" />
        </Card>

        <Card className="w-full h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Winners</CardTitle>
            <h2 className="text-2xl font-bold text-kick">0</h2>
          </CardHeader>
          <Separator className="bg-kick" />
        </Card>
      </div>
      <Footer />
    </div>
  );
}

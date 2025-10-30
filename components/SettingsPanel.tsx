import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { MessageFilterType } from "@/lib/utils";
import MessageInput from "./settings/MessageInput";
import MessageSettings from "./settings/MessageSettings";
import FilterSwitches from "./settings/FilterSwitches";
import SubsSettings from "./settings/SubsSettings";

interface SettingsPanelProps {
  message: string;
  setMessage: (value: string) => void;
  messageFilter: MessageFilterType;
  setMessageFilter: (value: MessageFilterType) => void;
  subsOnly: boolean;
  setSubsOnly: (value: boolean) => void;
  followersOnly: boolean;
  setFollowersOnly: (value: boolean) => void;
  vipsOnly: boolean;
  setVipsOnly: (value: boolean) => void;
  modsOnly: boolean;
  setModsOnly: (value: boolean) => void;
  subsPeriod: number;
  setSubsPeriod: (value: number) => void;
  subsLuck: number;
  setSubsLuck: (value: number) => void;
  onPickWinner: () => void;
  onClearParticipants: () => void;
  onClearWinners: () => void;
  participantsCount: number;
}

export default function SettingsPanel({
  message,
  setMessage,
  messageFilter,
  setMessageFilter,
  subsOnly,
  setSubsOnly,
  followersOnly,
  setFollowersOnly,
  vipsOnly,
  setVipsOnly,
  modsOnly,
  setModsOnly,
  subsPeriod,
  setSubsPeriod,
  subsLuck,
  setSubsLuck,
  onPickWinner,
  onClearParticipants,
  onClearWinners,
  participantsCount,
}: SettingsPanelProps) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4">
        <MessageInput message={message} onChange={setMessage} />
        
        <MessageSettings
          messageFilter={messageFilter}
          onChange={setMessageFilter}
        />
        
        <Separator className="bg-kick" />
        
        <FilterSwitches
          subsOnly={subsOnly}
          setSubsOnly={setSubsOnly}
          followersOnly={followersOnly}
          setFollowersOnly={setFollowersOnly}
          vipsOnly={vipsOnly}
          setVipsOnly={setVipsOnly}
          modsOnly={modsOnly}
          setModsOnly={setModsOnly}
        />
        
        <Separator className="bg-kick" />
        
        <SubsSettings
          subsPeriod={subsPeriod}
          setSubsPeriod={setSubsPeriod}
          subsLuck={subsLuck}
          setSubsLuck={setSubsLuck}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button
          className="w-full py-6 bg-kick hover:bg-kick/75 text-base font-semibold"
          onClick={onPickWinner}
          disabled={participantsCount === 0}
        >
          Pick Winner
        </Button>
        <div className="flex flex-row gap-2">
          <Button
            className="flex-1 py-6 bg-[#404040] hover:bg-[#404040]/75 text-white font-semibold"
            onClick={onClearParticipants}
          >
            Clear Participants
          </Button>
          <Button
            className="flex-1 py-6 bg-[#404040] hover:bg-[#404040]/75 text-white font-semibold"
            onClick={onClearWinners}
          >
            Clear Winners
          </Button>
        </div>
      </div>
    </div>
  );
}
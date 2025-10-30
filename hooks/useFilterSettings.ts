import { useState } from "react";
import { MessageFilterType } from "@/lib/utils";

export const useFilterSettings = () => {
  const [message, setMessage] = useState("");
  const [messageFilter, setMessageFilter] = useState<MessageFilterType>(
    MessageFilterType.Contains
  );
  const [subsOnly, setSubsOnly] = useState(false);
  const [followersOnly, setFollowersOnly] = useState(false);
  const [vipsOnly, setVipsOnly] = useState(false);
  const [modsOnly, setModsOnly] = useState(false);
  const [subsPeriod, setSubsPeriod] = useState(1);
  const [subsLuck, setSubsLuck] = useState(1);

  return {
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
  };
};
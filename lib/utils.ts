import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChatMessage } from "./ChatMessage.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapRange(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number {
  // Girdi validasyonu
  if (value < fromMin || value > fromMax) {
    throw new Error(
      `Girdi ${fromMin}-${fromMax} aralığında olmalıdır. Girilen: ${value}`
    );
  }

  if (fromMin === fromMax) {
    throw new Error("Kaynak aralık geçersiz (min ve max eşit olamaz)");
  }

  const result =
    ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;

  return result;
}

export enum MessageFilterType {
  Equals = "equals",
  Contains = "contains",
  StartsWith = "startswith",
  EndsWith = "endswith",
}

export function parseData(data: any): ChatMessage {
  // Eğer data zaten bir obje ise, içindeki 'data' string'ini parse et
  if (typeof data === "object" && data.data) {
    return JSON.parse(data.data);
  }
  // Eğer data bir string ise direkt parse et
  if (typeof data === "string") {
    return JSON.parse(data);
  }
  // Zaten parse edilmişse olduğu gibi dön
  return data;
}



export enum Badge {
  Subscriber = "subscriber",
  Gifter = "sub_gifter",
  Mod = "moderator",
  Bot = "bot",
  Verified = "verified",
  Broadcaster = "broadcaster",
  VIP = "vip",
  OG = "og",
}
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

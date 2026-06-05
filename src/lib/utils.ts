import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(sar: number, lang: "ar" | "en" = "ar"): string {
  if (lang === "en") {
    return `${sar.toLocaleString("en-US")} SAR`;
  }
  return `${sar.toLocaleString("ar-SA")} ريال`;
}

export function generateEventId(): string {
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

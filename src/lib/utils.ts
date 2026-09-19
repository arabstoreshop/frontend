import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  amount: number,
  lang: "ar" | "en" = "ar",
  currency: "SAR" | "MAD" = "SAR"
): string {
  if (currency === "MAD") {
    return lang === "en" ? `${amount} DH` : `${amount.toLocaleString("ar-MA")} د.م.`;
  }
  if (lang === "en") {
    return `${amount.toLocaleString("en-US")} SAR`;
  }
  return `${amount.toLocaleString("ar-SA")} ريال`;
}

export function generateEventId(): string {
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

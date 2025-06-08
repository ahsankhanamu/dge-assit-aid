import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Theme } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get the actual theme to apply (resolves system theme)
export const getActualTheme = (theme: Theme): "light" | "dark" | "bw" => {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme as "light" | "dark" | "bw";
};

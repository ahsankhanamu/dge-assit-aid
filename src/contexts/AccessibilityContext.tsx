import React, { createContext, useContext, useState } from "react";
import { useAccessibility } from "@/hooks/use-accessibility";

type Theme = "system" | "light" | "dark" | "bw";

interface AccessibilityContextType {
  readingLine: boolean;
  markerLine: boolean;
  theme: Theme;
  textSize: number;
  toggleReadingLine: () => void;
  toggleMarkerLine: () => void;
  setTheme: (theme: Theme) => void;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
  resetTextSize: () => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

const MIN_TEXT_SIZE = 12;
const MAX_TEXT_SIZE = 24;
const DEFAULT_TEXT_SIZE = 16;

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [readingLine, setReadingLine] = useState(false);
  const [markerLine, setMarkerLine] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");
  const [textSize, setTextSize] = useState(DEFAULT_TEXT_SIZE);

  const toggleReadingLine = () => setReadingLine((prev) => !prev);
  const toggleMarkerLine = () => setMarkerLine((prev) => !prev);

  const increaseTextSize = () => {
    setTextSize((prev) => Math.min(prev + 2, MAX_TEXT_SIZE));
  };

  const decreaseTextSize = () => {
    setTextSize((prev) => Math.max(prev - 2, MIN_TEXT_SIZE));
  };

  const resetTextSize = () => {
    setTextSize(DEFAULT_TEXT_SIZE);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply accessibility classes to body
  useAccessibility({
    readingLine,
    markerLine,
    theme,
    textSize,
  });

  return (
    <AccessibilityContext.Provider
      value={{
        readingLine,
        markerLine,
        theme,
        textSize,
        toggleReadingLine,
        toggleMarkerLine,
        setTheme: handleThemeChange,
        increaseTextSize,
        decreaseTextSize,
        resetTextSize,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibilityContext() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibilityContext must be used within an AccessibilityProvider"
    );
  }
  return context;
}

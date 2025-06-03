import { useCallback, useEffect } from "react";

type Theme = "system" | "light" | "dark" | "bw";

interface UseAccessibilityOptions {
  readingLine?: boolean;
  markerLine?: boolean;
  theme?: Theme;
  textSize?: number;
}

export function useAccessibility({
  readingLine,
  markerLine,
  theme,
  textSize,
}: UseAccessibilityOptions) {
  const handleReadingLine = (e: MouseEvent) => {
    const readingLine = document.getElementById("readingLine");
    if (readingLine) {
      readingLine.style.top = `${e.pageY}px`;
    }
  };

  const handleMarkerLine = (e: MouseEvent) => {
    const markerLine = document.getElementById("markerLine");
    if (markerLine) {
      markerLine.style.top = `${e.pageY}px`;
    }
  };

  const applyTheme = useCallback((themeValue: Theme) => {
    const root = document.documentElement;
    const body = document.body;

    // Remove all theme classes
    root.classList.remove("light", "dark", "bw", "system");
    body.classList.remove(
      "theme-light",
      "theme-dark",
      "theme-bw",
      "theme-system",
      "bw-filter"
    );

    if (themeValue === "system") {
      // Use system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.add(prefersDark ? "dark" : "light");
      body.classList.add(`theme-${prefersDark ? "dark" : "light"}`);
    } else if (themeValue === "bw") {
      root.classList.add("bw");
      body.classList.add("theme-bw", "bw-filter");
    } else {
      root.classList.add(themeValue);
      body.classList.add(`theme-${themeValue}`);
    }
  }, []);

  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;

    // Handle reading line
    if (readingLine) {
      body.classList.add("accessibility_readingLine");

      // Create reading line element if it doesn't exist
      if (!document.getElementById("readingLine")) {
        const readingLineEl = document.createElement("div");
        readingLineEl.id = "readingLine";
        readingLineEl.style.cssText = `
          position: absolute;
          pointer-events: none;
          z-index: 9999;
          width: 100vw;
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, #ff0000 50%, transparent 100%);
          box-shadow: 0 0 8px rgba(255, 0, 0, 0.6);
          left: 0;
          top: 0;
        `;
        document.body.appendChild(readingLineEl);
      }

      window.addEventListener("mousemove", handleReadingLine);
    } else {
      body.classList.remove("accessibility_readingLine");
      const readingLineEl = document.getElementById("readingLine");
      if (readingLineEl) {
        readingLineEl.remove();
      }
      window.removeEventListener("mousemove", handleReadingLine);
    }

    // Handle marker line
    if (markerLine) {
      body.classList.add("accessibility_markerLine");

      // Create marker line element if it doesn't exist
      if (!document.getElementById("markerLine")) {
        const markerLineEl = document.createElement("div");
        markerLineEl.id = "markerLine";
        markerLineEl.style.cssText = `
          position: absolute;
          pointer-events: none;
          z-index: 9998;
          width: 100vw;
          height: 28px;
          background: rgba(255, 255, 0, 0.3);
          border: 1px solid rgba(255, 255, 0, 0.6);
          left: 0;
          top: 0;
          transform: translateY(-14px);
        `;
        document.body.appendChild(markerLineEl);
      }

      window.addEventListener("mousemove", handleMarkerLine);
    } else {
      body.classList.remove("accessibility_markerLine");
      const markerLineEl = document.getElementById("markerLine");
      if (markerLineEl) {
        markerLineEl.remove();
      }
      window.removeEventListener("mousemove", handleMarkerLine);
    }

    // Handle theme
    if (theme) {
      applyTheme(theme);
    }

    // Handle text size
    if (textSize && textSize !== 16) {
      root.style.fontSize = `${textSize}px`;
    } else {
      root.style.fontSize = "";
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Cleanup function
    return () => {
      body.classList.remove(
        "accessibility_readingLine",
        "accessibility_markerLine",
        "bw-filter"
      );
      root.style.fontSize = "";
      window.removeEventListener("mousemove", handleReadingLine);
      window.removeEventListener("mousemove", handleMarkerLine);
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [readingLine, markerLine, theme, textSize, applyTheme]);
}

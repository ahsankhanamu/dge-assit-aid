import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "bw" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem("theme") as Theme;
    console.log("Initial saved theme:", savedTheme);
    // If no saved theme, use system preference
    if (!savedTheme) {
      return "system";
    }
    return savedTheme;
  });

  // Get the actual theme to apply (resolves system theme)
  const getActualTheme = (theme: Theme): "light" | "dark" | "bw" => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme as "light" | "dark" | "bw";
  };

  // Custom setTheme function that handles localStorage
  const handleThemeChange = (newTheme: Theme) => {
    console.log("Setting new theme:", newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const actualTheme = getActualTheme(theme);
    console.log("Applying theme:", actualTheme);

    // Remove all theme classes
    document.documentElement.classList.remove(
      "light",
      "dark",
      "bw",
      "bw-filter"
    );

    // Add current theme class
    document.documentElement.classList.add(actualTheme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        actualTheme === "dark" ? "#1a1a1a" : "#ffffff"
      );
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if current theme is set to system
      if (theme === "system") {
        const newTheme = e.matches ? "dark" : "light";
        console.log("System theme changed to:", newTheme);
        document.documentElement.classList.remove(
          "light",
          "dark",
          "bw",
          "bw-filter"
        );
        document.documentElement.classList.add(newTheme);
      }
    };

    // Add listener for system theme changes
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

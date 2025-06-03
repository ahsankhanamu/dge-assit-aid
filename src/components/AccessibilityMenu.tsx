import React from "react";
import { useAccessibilityContext } from "@/contexts/AccessibilityContext";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaRulerHorizontal, FaMarker } from "react-icons/fa";
import {
  Sun,
  Moon,
  Monitor,
  Eye,
  RotateCcw,
  Plus,
  Minus,
  Type,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { AccessibilityIcon } from "@/icons/svg";

type Theme = "system" | "light" | "dark" | "bw";

const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] = [
  {
    value: "system",
    label: "accessibility.theme.system",
    icon: <Monitor className="h-4 w-4" />,
  },
  {
    value: "light",
    label: "accessibility.theme.light",
    icon: <Sun className="h-4 w-4" />,
  },
  {
    value: "dark",
    label: "accessibility.theme.dark",
    icon: <Moon className="h-4 w-4" />,
  },
  {
    value: "bw",
    label: "accessibility.theme.bw",
    icon: <Monitor className="h-4 w-4" />,
  },
];

const AccessibilityMenu = () => {
  const { t } = useTranslation();
  const {
    readingLine,
    markerLine,
    theme,
    textSize,
    toggleReadingLine,
    toggleMarkerLine,
    setTheme,
    increaseTextSize,
    decreaseTextSize,
    resetTextSize,
  } = useAccessibilityContext();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="flex items-center gap-2 me-0 hover:bg-accent/50 transition-colors"
          aria-label={t("accessibility.title")}
        >
          <span className="sr-only">{t("accessibility.title")}</span>
          <AccessibilityIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-6 bg-background border border-border shadow-lg z-50"
        align="end"
        sideOffset={5}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <AccessibilityIcon className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg text-foreground">
              {t("accessibility.title")}
            </h3>
          </div>

          {/* Theme Selection */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
              <Sun className="w-4 h-4" />
              {t("accessibility.theme.title")}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {themeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={theme === option.value ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setTheme(option.value)}
                >
                  {option.icon}
                  <span className="ml-2">{t(option.label)}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Text Size Controls */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
              <span className="text-lg">A</span>
              {t("accessibility.textSize.title")}
              <span className="text-sm text-muted-foreground">
                {t("accessibility.textSize.current", { size: textSize })}
              </span>
            </h4>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={decreaseTextSize}>
                <Type className="h-4 w-4" />
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetTextSize}
                className="flex items-center gap-1 hover:bg-accent/50 min-w-16"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="text-xs">
                  {t("accessibility.textSize.reset")}
                </span>
              </Button>
              <Button variant="outline" size="sm" onClick={increaseTextSize}>
                <Type className="h-4 w-4" />
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Reading Aids */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {t("accessibility.readingAids.title")}
            </h4>
            <div className="flex gap-2">
              <Button
                variant={readingLine ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={toggleReadingLine}
              >
                <FaRulerHorizontal className="h-4 w-4" />
                <span className="ml-2">
                  {t("accessibility.readingAids.readingLine")}
                </span>
              </Button>
              <Button
                variant={markerLine ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={toggleMarkerLine}
              >
                <FaMarker className="h-4 w-4" />
                <span className="ml-2">
                  {t("accessibility.readingAids.markerLine")}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AccessibilityMenu;

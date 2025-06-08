import React, { useMemo } from "react";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useTranslation } from "react-i18next";
import { cn, getActualTheme } from "@/lib/utils";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import { useAccessibilityContext } from "@/contexts/AccessibilityContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type CalendarProps = {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  fromYear?: number;
  toYear?: number;
  mode?: "single" | "range";
  showOutsideDays?: boolean;
  initialFocus?: boolean;
  captionLayout?: "dropdown" | "buttons" | "dropdown-buttons";
};

function Calendar({
  className,
  selected,
  onSelect,
  disabled,
  fromYear = 1900,
  toYear,
  mode = "single",
  showOutsideDays = true,
  initialFocus,
  captionLayout,
  ...props
}: CalendarProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const [value, setValue] = React.useState<dayjs.Dayjs | null>(
    selected ? dayjs(selected) : null
  );
  const today = React.useMemo(() => dayjs().startOf("day"), []);

  React.useEffect(() => {
    setValue(selected ? dayjs(selected) : null);
  }, [selected]);

  const handleChange = (date: dayjs.Dayjs | null) => {
    setValue(date);
  };

  const handleAccept = () => {
    if (onSelect) {
      onSelect(value?.toDate());
    }
  };

  const isDisabled = (date: dayjs.Dayjs) => {
    if (!disabled) return date.isAfter(today);
    return disabled(date.toDate()) || date.isAfter(today);
  };

  // Light theme
  const lightTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
        },
        direction: isRTL ? "rtl" : "ltr",
      }),
    [isRTL]
  );

  // Dark theme
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    direction: isRTL ? "rtl" : "ltr",
  });

  const { theme } = useAccessibilityContext();
  const actualTheme = getActualTheme(theme);

  return (
    <ThemeProvider theme={actualTheme === "dark" ? darkTheme : lightTheme}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={isRTL ? "ar" : "en"}
      >
        <StaticDatePicker
          value={value}
          onChange={handleChange}
          shouldDisableDate={isDisabled}
          displayStaticWrapperAs="desktop"
          views={["year", "month", "day"]}
          maxDate={today}
          className={cn("w-full", className)}
          yearsOrder="desc"
          slotProps={{
            actionBar: {
              actions: ["cancel", "accept"],
            },
          }}
          onAccept={handleAccept}
          {...props}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };

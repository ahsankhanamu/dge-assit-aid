import * as React from "react";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import "dayjs/locale/en";

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

  return (
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
        sx={{
          "& .MuiPickersLayout-root": {
            minWidth: 320,
            borderRadius: 3,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            p: 2,
          },
          "& .MuiPickersCalendarHeader-root": {
            mb: 1,
            px: 3,
          },
          "& .MuiPickersDay-root": {
            fontWeight: 500,
            borderRadius: 1,
            transition: "background 0.2s",
          },
          "& .MuiPickersDay-root.Mui-selected": {
            bgcolor: "primary.main",
            color: "primary.contrastText",
          },
          "& .MuiPickersDay-root:focus": {
            outline: "2px solid",
            outlineColor: "primary.main",
          },
          "& .MuiDialogActions-root, & .MuiPickersLayout-actionBar": {
            pb: 1,
            mt: 0,
          },
          "& .MuiPickersLayout-actionBar": {
            justifyContent: "flex-end",
          },
          "& .MuiPickersLayout-contentWrapper": {
            pb: 0,
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };

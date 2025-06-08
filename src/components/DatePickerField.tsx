import React, { useState, useRef } from "react";
import { format } from "date-fns";
import { arSA, enUS } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { Input } from "@/components/ui/input";
import { toCamelCase } from "@/utils/stringUtils";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// Create rtl cache
const cacheRtl = createCache({
  key: "datepicker-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

interface DatePickerFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  onBlur?: () => void;
  placeholder?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  error,
  onBlur,
  placeholder,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [hasFocused, setHasFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedDate = value ? new Date(value) : undefined;
  const currentYear = new Date().getFullYear();

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onChange(format(date, "yyyy-MM-dd"));
      setIsOpen(false);
      setIsTouched(true);
      // Trigger validation immediately after selection
      if (onBlur) {
        setTimeout(() => onBlur(), 0);
      }
    }
  };

  const handleBlur = () => {
    if (hasFocused) {
      setIsTouched(true);
      if (onBlur) onBlur();
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setHasFocused(true);
    } else {
      handleBlur();
      // Focus back on the input when closing via any method
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(true);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      // Focus back on the input after closing
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else if (event.key === "Tab") {
      setHasFocused(true);
      handleBlur();
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return date > today || date.getFullYear() < 1900;
  };

  const formatDate = (date: Date) => {
    return format(date, "PPP", { locale: isRTL ? arSA : enUS });
  };

  const showError = isTouched && error;

  const content = (
    <div className="space-y-2">
      <Label htmlFor={label} className={`text-sm font-medium text-start`}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              readOnly
              value={selectedDate ? formatDate(selectedDate) : ""}
              placeholder={placeholder}
              className={cn(
                "w-full pr-10",
                !selectedDate && "text-muted-foreground",
                "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700",
                showError &&
                  "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
              )}
              onClick={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              onFocus={() => setHasFocused(true)}
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="dialog"
              aria-controls="date-picker-content"
              aria-label={t("form.pickADate")}
            />
            <CalendarIcon
              className={cn(
                "h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400",
                isRTL && "right-auto left-3"
              )}
              aria-hidden="true"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          id="date-picker-content"
          className={`w-auto p-0 ${isRTL ? "text-right" : "text-left"}`}
          align="start"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={isDateDisabled}
            initialFocus
            fromYear={1900}
            toYear={currentYear}
            className="rounded-md border-0"
          />
        </PopoverContent>
      </Popover>

      {showError && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );

  if (!isRTL) {
    return content;
  }

  return (
    <CacheProvider value={cacheRtl}>
      <div dir="rtl">{content}</div>
    </CacheProvider>
  );
};

export default DatePickerField;

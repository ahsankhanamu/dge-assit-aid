import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface BaseSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  onBlur?: () => void;
  className?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

const BaseSelect: React.FC<BaseSelectProps> = ({
  label,
  value,
  onChange,
  required = false,
  error,
  onBlur,
  className,
  placeholder,
  options,
  disabled = false,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [hasFocused, setHasFocused] = useState(false);

  const handleBlur = () => {
    if (hasFocused) {
      setIsTouched(true);
      if (onBlur) onBlur();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab" || event.key === "Escape") {
      setHasFocused(true);
      handleBlur();
    }
  };

  const showError = isTouched && error;

  return (
    <div className="space-y-2">
      <Label
        htmlFor={label}
        className={`text-sm font-medium text-gray-900 dark:text-gray-100 text-start`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select
        value={value}
        onValueChange={(newValue) => {
          onChange(newValue);
          setHasFocused(true);
          setIsTouched(true);
          // Trigger validation after selection
          if (onBlur) {
            setTimeout(() => onBlur(), 0);
          }
        }}
        disabled={disabled}
        onOpenChange={(open) => {
          if (open) {
            setHasFocused(true);
          } else {
            handleBlur();
          }
        }}
      >
        <SelectTrigger
          className={`w-full text-start bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 ${
            showError
              ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
              : ""
          } ${className}`}
          onFocus={() => setHasFocused(true)}
          onKeyDown={handleKeyDown}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-50 max-h-60">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showError && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default BaseSelect;

import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { UseFormRegister, FieldError } from "react-hook-form";
import { FormData } from "@/contexts/FormContext";
import { toCamelCase } from "@/utils/stringUtils";

interface TextAreaFieldProps {
  label: string;
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  error?: FieldError;
  required?: boolean;
  placeholder?: string;
  className?: string;
  rows?: number;
  children?: React.ReactNode;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  register,
  error,
  required = false,
  placeholder,
  className,
  rows = 5,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {children}
      </div>
      <Textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        className={cn(
          "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700",
          error &&
            "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
        )}
        {...register(name, {
          required: required ? t("validation.required") : false,
        })}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default TextAreaField;

import React from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldError } from "react-hook-form";
import { FormData } from "@/contexts/FormContext";

interface FormFieldProps {
  label: string;
  error?: FieldError;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  disabled?: boolean;
  register: UseFormRegister<FormData>;
  name: keyof FormData;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  type = "text",
  required = false,
  placeholder,
  min,
  disabled = false,
  register,
  name,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Input
        id={name}
        type={type}
        min={min}
        placeholder={placeholder}
        className={`w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 ${
          error
            ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
            : ""
        } ${disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""}`}
        aria-required={required}
        disabled={disabled}
        pattern={type === "tel" ? "[0-9]*" : undefined}
        inputMode={type === "tel" ? "numeric" : undefined}
        {...register(name, {
          required: required ? t("validation.required") : false,
          valueAsNumber: type === "number",
        })}
        error={error}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default FormField;

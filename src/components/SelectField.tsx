import React from "react";
import { useTranslation } from "react-i18next";
import { Control, Controller, FieldError } from "react-hook-form";
import { FormData } from "@/contexts/FormContext";
import BaseSelect from "@/components/ui/base-select";
import { toCamelCase } from "@/utils/stringUtils";

interface SelectFieldProps {
  label: string;
  error?: FieldError;
  required?: boolean;
  options: { value: string; label: string }[];
  name: keyof FormData;
  placeholder?: string;
  control: Control<FormData>;
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  error,
  required = false,
  options,
  name,
  placeholder,
  control,
  disabled = false,
}) => {
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? t("validation.required") : false,
      }}
      render={({ field }) => (
        <BaseSelect
          label={label}
          value={field.value as string}
          onChange={field.onChange}
          onBlur={field.onBlur}
          required={required}
          error={error?.message}
          options={options}
          placeholder={
            placeholder ?? `${t("form.select")} ${t(toCamelCase(placeholder))}`
          }
          disabled={disabled}
        />
      )}
    />
  );
};

export default SelectField;

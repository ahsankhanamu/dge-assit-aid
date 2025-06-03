import React from "react";
import { useTranslation } from "react-i18next";
import { COUNTRIES } from "../data/countries";
import BaseSelect from "@/components/ui/base-select";

interface CountrySelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  onBlur?: () => void;
  className?: string;
  placeholder?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  label,
  value,
  onChange,
  required = false,
  error,
  onBlur,
  className,
  placeholder,
}) => {
  const { t } = useTranslation();

  return (
    <BaseSelect
      label={label}
      value={value}
      onChange={onChange}
      required={required}
      error={error}
      onBlur={onBlur}
      className={className}
      placeholder={placeholder || t("selectCountry")}
      options={COUNTRIES}
    />
  );
};

export default CountrySelect;

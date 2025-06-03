
import React from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../../contexts/FormContext";
import FormField from "../FormField";
import SelectField from "../SelectField";
import CountrySelect from "../CountrySelect";
import DatePickerField from "../DatePickerField";

const PersonalInfoStep: React.FC = () => {
  const { t } = useTranslation();
  const { formMethods } = useFormContext();
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = formMethods;

  const country = watch("country");
  const dateOfBirth = watch("dateOfBirth");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {t("step1")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label={t("fields.name")}
          register={register}
          name="name"
          error={errors.name}
          placeholder={t("fields.name")}
          type="text"
          required
        />

        <FormField
          label={t("fields.nationalId")}
          register={register}
          name="nationalId"
          error={errors.nationalId}
          placeholder={t("fields.nationalId")}
          type="text"
          required
        />

        <DatePickerField
          label={t("fields.dateOfBirth")}
          value={dateOfBirth as string}
          onChange={(value) => setValue("dateOfBirth", value)}
          error={errors.dateOfBirth?.message}
          placeholder={t("fields.dateOfBirth")}
          onBlur={() => trigger("dateOfBirth")}
          required
        />

        <SelectField
          label={t("fields.gender")}
          name="gender"
          control={control}
          error={errors.gender}
          placeholder={t("fields.gender")}
          options={[
            { value: "male", label: t("options.gender.male") },
            { value: "female", label: t("options.gender.female") },
            { value: "other", label: t("options.gender.other") },
          ]}
          required
        />

        <div className="md:col-span-2">
          <FormField
            label={t("fields.address")}
            register={register}
            name="address"
            error={errors.address}
            placeholder={t("fields.address")}
            required
          />
        </div>

        <FormField
          label={t("fields.city")}
          register={register}
          name="city"
          error={errors.city}
          placeholder={t("fields.city")}
          required
        />

        <FormField
          label={t("fields.state")}
          register={register}
          name="state"
          error={errors.state}
          placeholder={t("fields.state")}
          required
        />

        <CountrySelect
          label={t("fields.country")}
          value={country as string}
          onChange={(value) => setValue("country", value)}
          error={errors.country?.message}
          onBlur={() => trigger("country")}
          required
        />

        <FormField
          label={t("fields.phone")}
          type="tel"
          register={register}
          name="phone"
          error={errors.phone}
          placeholder={t("fields.phone")}
          required
        />

        <FormField
          label={t("fields.email")}
          type="email"
          register={register}
          name="email"
          error={errors.email}
          placeholder={t("fields.email")}
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoStep;

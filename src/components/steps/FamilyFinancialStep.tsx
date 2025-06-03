
import React from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../../contexts/FormContext";
import FormField from "../FormField";
import SelectField from "../SelectField";

const FamilyFinancialStep: React.FC = () => {
  const { t } = useTranslation();
  const { formMethods } = useFormContext();
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = formMethods;

  const employmentStatus = watch("employmentStatus");
  const isUnemployed = employmentStatus === "unemployed";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {t("step2")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label={t("fields.maritalStatus")}
          name="maritalStatus"
          control={control}
          placeholder={t("fields.maritalStatus")}
          error={errors.maritalStatus}
          options={[
            { value: "single", label: t("options.maritalStatus.single") },
            { value: "married", label: t("options.maritalStatus.married") },
            { value: "divorced", label: t("options.maritalStatus.divorced") },
            { value: "widowed", label: t("options.maritalStatus.widowed") },
          ]}
          required
        />

        <FormField
          label={t("fields.dependents")}
          placeholder={t("fields.dependents")}
          type="number"
          register={register}
          name="dependents"
          error={errors.dependents}
          min={0}
          required
        />

        <SelectField
          label={t("fields.employmentStatus")}
          placeholder={t("fields.employmentStatus")}
          name="employmentStatus"
          control={control}
          error={errors.employmentStatus}
          options={[
            {
              value: "employed",
              label: t("options.employmentStatus.employed"),
            },
            {
              value: "unemployed",
              label: t("options.employmentStatus.unemployed"),
            },
            {
              value: "self-employed",
              label: t("options.employmentStatus.selfEmployed"),
            },
            { value: "retired", label: t("options.employmentStatus.retired") },
            { value: "student", label: t("options.employmentStatus.student") },
          ]}
          required
        />

        <FormField
          label={t("fields.monthlyIncome")}
          placeholder={t("fields.monthlyIncome")}
          type="number"
          register={register}
          name="monthlyIncome"
          error={errors.monthlyIncome}
          min={0}
          required={!isUnemployed}
          disabled={isUnemployed}
        />
      </div>
    </div>
  );
};

export default FamilyFinancialStep;

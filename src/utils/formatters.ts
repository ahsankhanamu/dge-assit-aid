import { TFunction } from "i18next";
import type { FormData } from "../contexts/FormContext";

export const formatApplicationData = (data: FormData, t: TFunction) => {
  return {
    [t("personalInformation")]: {
      [t("name")]: data.name,
      [t("nationalId")]: data.nationalId,
      [t("dateOfBirth")]: data.dateOfBirth,
      [t("gender")]: data.gender,
      [t(
        "address"
      )]: `${data.address}, ${data.city}, ${data.state}, ${data.country}`,
      [t("phone")]: data.phone,
      [t("email")]: data.email,
    },
    [t("familyFinancialInfo")]: {
      [t("maritalStatus")]: data.maritalStatus,
      [t("dependents")]: data.dependents,
      [t("employmentStatus")]: data.employmentStatus,
      [t("monthlyIncome")]: data.monthlyIncome,
      [t("housingStatus")]: data.housingStatus,
    },
    [t("applicationDetails")]: {
      [t("financialSituation")]: data.financialSituation,
      [t("employmentCircumstances")]: data.employmentCircumstances,
      [t("reasonForApplying")]: data.reasonForApplying,
    },
  };
};

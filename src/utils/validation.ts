import { TFunction } from "i18next";

export const validateEmail = (email: string, t: TFunction): string | null => {
  if (!email) return t("validation.emailRequired");

  // More strict email validation
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(email)) {
    return t("validation.invalidEmail");
  }

  // Check for common email validation rules
  if (email.length > 254) {
    return t("validation.emailTooLong");
  }

  const localPart = email.split("@")[0];
  if (localPart.length > 64) {
    return t("validation.emailLocalPartTooLong");
  }

  return null;
};

const validatePhone = (
  phone: string,
  t: TFunction,
  countryCode: string = ""
): string | null => {
  if (!phone) return t("validation.phoneRequired");

  // Remove all non-digit characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, "");

  if (cleanPhone.length < 7) {
    return t("validation.phoneTooShort");
  }

  if (cleanPhone.length > 15) {
    return t("validation.phoneTooLong");
  }

  // Basic format validation
  const phoneRegex = /^[\\+]?[\d\s\-\\(\\)]{7,15}$/;
  if (!phoneRegex.test(phone)) {
    return t("validation.invalidPhone");
  }

  return null;
};

const validateRequired = (
  value: string,
  fieldName: string,
  t: TFunction
): string | null => {
  if (!value || value.trim() === "") {
    return t("validation.fieldRequired", {
      fieldName: t(`fields.${fieldName}`),
    });
  }
  if (value.trim().length < 2) {
    return t("validation.fieldTooShort", {
      fieldName: t(`fields.${fieldName}`),
    });
  }
  return null;
};

const validateNationalId = (
  nationalId: string,
  t: TFunction
): string | null => {
  if (!nationalId) return t("validation.nationalIdRequired");

  // Remove all non-alphanumeric characters
  const cleanId = nationalId.replace(/[^a-zA-Z0-9]/g, "");

  if (cleanId.length < 8) {
    return t("validation.nationalIdTooShort");
  }

  if (cleanId.length > 20) {
    return t("validation.nationalIdTooLong");
  }

  return null;
};

import React, { createContext, useContext, useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";

// Form validation schema
const createFormSchema = (t: (key: string) => string) =>
  z.object({
    // Personal Information
    name: z.string().min(1, t("validation.nameRequired")),
    nationalId: z
      .string()
      .min(1, t("validation.nationalIdRequired"))
      .length(15, t("validation.nationalIdLength"))
      .regex(/^\d+$/, t("validation.nationalIdDigits")),
    dateOfBirth: z.string().min(1, t("validation.dateOfBirthRequired")),
    gender: z.string().min(1, t("validation.genderRequired")),
    address: z.string().min(1, t("validation.addressRequired")),
    city: z.string().min(1, t("validation.cityRequired")),
    state: z.string().min(1, t("validation.stateRequired")),
    country: z.string().min(2, t("validation.countryRequired")),
    phone: z
      .string()
      .min(1, t("validation.phoneRequired"))
      .min(10, t("validation.phoneTooShort"))
      .regex(/^\d+$/, t("validation.phoneDigits")),
    email: z
      .string()
      .email(t("validation.invalidEmail"))
      .min(1, t("validation.emailRequired")),

    // Family & Financial Info
    maritalStatus: z.string().min(1, t("validation.maritalStatusRequired")),
    dependents: z.number().min(0, t("validation.minZero")),
    employmentStatus: z
      .string()
      .min(1, t("validation.employmentStatusRequired")),
    monthlyIncome: z.number().min(0, t("validation.minZero")),

    // Situation Description
    financialSituation: z
      .string()
      .min(1, t("validation.financialSituationRequired")),
    employmentCircumstances: z
      .string()
      .min(1, t("validation.employmentCircumstancesRequired")),
    reasonForApplying: z
      .string()
      .min(1, t("validation.reasonForApplyingRequired")),
  });

export type FormData = z.infer<ReturnType<typeof createFormSchema>>;

interface FormContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formMethods: UseFormReturn<FormData>;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  clearFormData: () => void;
  getFormData: () => FormData;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const STORAGE_KEY = "socialSupportForm";
const STEP_STORAGE_KEY = "socialSupportStep";

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStepState] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const defaultValues = {
    name: "",
    nationalId: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
    maritalStatus: "",
    dependents: 0,
    employmentStatus: "",
    monthlyIncome: 0,
    financialSituation: "",
    employmentCircumstances: "",
    reasonForApplying: "",
  };
  const formSchema = createFormSchema(t);

  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues,
  });

  const { watch, reset, getValues } = formMethods;

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedStep = localStorage.getItem(STEP_STORAGE_KEY);

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        reset(parsedData);
        console.log("Loaded form data from localStorage:", parsedData);
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }

    if (savedStep) {
      const step = parseInt(savedStep, 10);
      if (step >= 1 && step <= 3) {
        setCurrentStepState(step);
        console.log("Loaded current step from localStorage:", step);
      }
    }
  }, [reset]);

  // Watch all form values and save to localStorage
  useEffect(() => {
    const subscription = watch((data) => {
      // Only save if there's actual data
      const hasData = Object.values(data).some(
        (value) =>
          value !== "" && value !== null && value !== undefined && value !== 0
      );

      if (hasData) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        // console.log("Saved form data to localStorage:", data);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  // Save current step to localStorage
  const setCurrentStep = (step: number) => {
    setCurrentStepState(step);
    localStorage.setItem(STEP_STORAGE_KEY, step.toString());
    console.log("Saved current step to localStorage:", step);
  };

  // Get current form data function
  const getFormData = (): FormData => {
    return getValues();
  };

  // Clear form data function - delay clearing localStorage
  const clearFormData = () => {
    // reset(defaultValues);
    setCurrentStepState(1);
    // Delay clearing localStorage to allow PostSubmissionView to access data
    setTimeout(() => {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_STORAGE_KEY);
      console.log("Cleared form data and localStorage");
    }, 5000); // 5 second delay
  };

  return (
    <FormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        formMethods,
        isSubmitting,
        setIsSubmitting,
        clearFormData,
        getFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

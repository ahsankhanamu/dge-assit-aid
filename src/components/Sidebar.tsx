import React from "react";
import { useFormContext } from "../contexts/FormContext";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { currentStep, setCurrentStep, formMethods } = useFormContext();
  const { formState, watch } = formMethods;

  // Watch all form values to trigger re-evaluation
  const watchedValues = watch();

  const getStepFields = (step: number) => {
    switch (step) {
      case 1:
        return [
          "name",
          "nationalId",
          "dateOfBirth",
          "gender",
          "address",
          "city",
          "state",
          "country",
          "phone",
          "email",
        ] as (keyof typeof watchedValues)[];
      case 2:
        return [
          "maritalStatus",
          "dependents",
          "employmentStatus",
          "monthlyIncome",
        ] as (keyof typeof watchedValues)[];
      case 3:
        return [
          "financialSituation",
          "employmentCircumstances",
          "reasonForApplying",
        ] as (keyof typeof watchedValues)[];
      default:
        return [];
    }
  };

  const isStepValid = (step: number) => {
    const stepFields = getStepFields(step);

    // Check if all required fields have values and no errors
    const hasValues = stepFields.every((field) => {
      const value = watchedValues[field];
      // For numeric fields (dependents, monthlyIncome), 0 is a valid value
      if (field === "dependents" || field === "monthlyIncome") {
        return value !== null && value !== undefined && value !== "";
      }
      return value !== "" && value !== null && value !== undefined;
    });

    const hasNoErrors = stepFields.every((field) => !formState.errors[field]);

    return hasValues && hasNoErrors;
  };

  const steps = [
    {
      number: 1,
      title: t("step1"),
      description: t("personalInformation"),
      completed: isStepValid(1),
    },
    {
      number: 2,
      title: t("step2"),
      description: t("familyFinancialInfo"),
      completed: isStepValid(2),
    },
    {
      number: 3,
      title: t("step3"),
      description: t("applicationDetails"),
      completed: isStepValid(3),
    },
  ];

  const handleStepClick = (stepNumber: number) => {
    // Allow navigation to current step or completed steps
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  return (
    <aside
      className={`bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-900 p-6 border-s border-gray-200 dark:border-gray-800`}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
            {t("applicationSteps")}
          </h3>
          <div className="relative">
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  <Button
                    variant={
                      currentStep === step.number ? "secondary" : "ghost"
                    }
                    className={`w-full justify-start p-3 h-auto relative z-10 ${
                      step.number <= currentStep
                        ? "cursor-pointer hover:bg-blue-50"
                        : "cursor-not-allowed opacity-60"
                    } ${step.completed ? "bg-green-50 border-green-200" : ""}`}
                    onClick={() => handleStepClick(step.number)}
                    disabled={step.number > currentStep}
                  >
                    <div className="flex items-center w-full gap-3">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium relative z-20 ${
                          currentStep === step.number
                            ? "bg-blue-600 text-white"
                            : step.completed
                            ? "bg-green-600 text-white"
                            : step.number < currentStep
                            ? "bg-gray-400 text-white"
                            : "bg-gray-800 text-gray-200"
                        }`}
                      >
                        {step.completed ? "✓" : step.number}
                      </div>
                      <div className="text-start">
                        <div
                          className={`font-medium ${
                            currentStep === step.number
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {step.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {step.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card/80 rounded-lg p-4">
          <h3 className="font-semibold text-card-foreground mb-3">
            {t("needHelp")}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {t("supportDescription")}
          </p>
          <button className="text-primary text-sm hover:text-primary/80">
            {t("contactSupport")}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

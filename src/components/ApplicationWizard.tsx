import React, { useState } from "react";
import { useFormContext } from "../contexts/FormContext";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ProgressBar from "./ProgressBar";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import FamilyFinancialStep from "./steps/FamilyFinancialStep";
import SituationStep from "./steps/SituationStep";
import PostSubmissionView from "./PostSubmissionView";
import { useToast } from "../hooks/use-toast";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FormData } from "../contexts/FormContext";

const ApplicationWizard: React.FC = () => {
  const { toast } = useToast();
  const { currentStep, setCurrentStep, formMethods, clearFormData } =
    useFormContext();
  const { formState, trigger, handleSubmit, watch } = formMethods;
  const { t, i18n } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRTL = i18n.dir() === "rtl";

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
        ] as (keyof FormData)[];
      case 2:
        return [
          "maritalStatus",
          "dependents",
          "employmentStatus",
          "monthlyIncome",
        ] as (keyof FormData)[];
      case 3:
        return [
          "financialSituation",
          "employmentCircumstances",
          "reasonForApplying",
        ] as (keyof FormData)[];
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

    // Only check errors for the current step's fields
    const hasNoErrors = stepFields.every((field) => !formState.errors[field]);

    return hasValues && hasNoErrors;
  };

  const handleNext = async () => {
    const stepFields = getStepFields(currentStep);
    const isValid = await trigger(stepFields);

    if (isValid && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      // Only validate the current step's fields before submission
      const stepFields = getStepFields(currentStep);
      const isValid = await trigger(stepFields);

      if (!isValid || !isStepValid(currentStep)) {
        return;
      }

      console.log("Submitting application:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);

      // Clear form after successful submission using the new function
      clearFormData();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: t("error"),
        description: "",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <FamilyFinancialStep />;
      case 3:
        return <SituationStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col w-full ${
        isRTL ? "font-arabic" : ""
      }`}
    >
      <Header />

      <div className={`flex mt-[var(--header-height)] w-full`}>
        {/* Sidebar */}
        <div className="flex-1 hidden md:block md:w-2/5 lg:w-1/2 bg-gradient-to-b from-blue-100 to-green-100 dark:from-blue-950 dark:to-gray-900">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="w-full md:w-3/5 lg:w-1/2 flex flex-col">
          <div className="p-6 bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit}>
                  <ProgressBar currentStep={currentStep} totalSteps={3} />

                  <div className="p-6 md:p-8 flex-1">
                    <div className="max-w-4xl mx-auto">{renderStep()}</div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between">
                      {currentStep > 1 && (
                        <Button
                          onClick={handlePrevious}
                          variant="outline"
                          className={`flex items-center gap-2`}
                        >
                          <ChevronLeft
                            className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`}
                          />
                          {t("previous")}
                        </Button>
                      )}
                      {currentStep < 3 ? (
                        <Button
                          onClick={handleNext}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          disabled={!isStepValid(currentStep)}
                        >
                          {t("next")}
                          <ChevronRight
                            className={`h-4 w-4 ml-2 ${
                              isRTL ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleFormSubmit}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={!isStepValid(currentStep) || isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              {t("submitting")}
                            </>
                          ) : (
                            t("submit")
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              ) : (
                <PostSubmissionView />
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ApplicationWizard;

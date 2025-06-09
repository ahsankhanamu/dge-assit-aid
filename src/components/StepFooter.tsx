import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface StepFooterProps {
  currentStep: number;
  isStepValid: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const StepFooter: React.FC<StepFooterProps> = ({
  currentStep,
  isStepValid,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-between">
        {currentStep > 1 && (
          <Button
            onClick={onPrevious}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            {t("previous")}
          </Button>
        )}
        {currentStep < 3 ? (
          <Button
            onClick={onNext}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!isStepValid}
          >
            {t("next")}
            <ChevronRight
              className={`h-4 w-4 ml-2 ${isRTL ? "rotate-180" : ""}`}
            />
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={!isStepValid || isSubmitting}
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
  );
};

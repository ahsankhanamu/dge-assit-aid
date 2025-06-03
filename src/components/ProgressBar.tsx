import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { CheckIconBase, SvgImgWrapper } from "./ui/svg";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const { t } = useTranslation();
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: t("step1") },
    { number: 2, title: t("step2") },
    { number: 3, title: t("step3") },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-row items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center">
              <div
                className={clsx(
                  `w-8 h-8 rounded-full flex shrink-0 items-center justify-center text-sm font-medium transition-colors`,
                  step.number < currentStep &&
                    "bg-green-600 dark:bg-green-500 text-white",
                  step.number === currentStep &&
                    "bg-blue-600 dark:bg-blue-500 text-white",
                  step.number > currentStep &&
                    "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                )}
              >
                {step.number < currentStep ? (
                  <SvgImgWrapper
                    role="img"
                    aria-label="check"
                    className="icon-check steps-finish-icon"
                  >
                    <CheckIconBase />
                  </SvgImgWrapper>
                ) : (
                  step.number
                )}
              </div>
            </div>

            {/* Add connecting line except after last step */}
            {index < steps.length - 1 && (
              <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600 mx-2"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

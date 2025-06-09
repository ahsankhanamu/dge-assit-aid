import React, { useState } from "react";
import { useFormContext, FormData } from "../contexts/FormContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatApplicationData } from "@/utils/formatters";

const PostSubmissionView: React.FC = () => {
  const { formMethods } = useFormContext();
  const { getValues } = formMethods;
  const formData = getValues() as FormData;
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [showSummary, setShowSummary] = useState(false);

  const applicationRef = `APP-${Date.now().toString().slice(-8)}`;

  const formatSummary = () => formatApplicationData(formData, t);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-8">
      {/* Logo */}
      <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
        <div className="text-white text-4xl font-bold">SS</div>
      </div>

      {/* Thank You Message */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {t("thankYou")}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          {t("applicationReceived")}
        </p>
        <p className="text-md text-gray-600 dark:text-gray-300">
          {t("summarySent")}
        </p>
      </div>

      {/* Reference Number */}
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
          {t("referenceNumber")}
        </h2>
        <div className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
          {applicationRef}
        </div>
        <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
          {t("saveReference")}
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
          {t("whatHappensNext")}
        </h3>
        <ul className="text-left text-gray-600 dark:text-gray-300 space-y-2">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 me-3 flex-shrink-0"></span>
            {t("reviewTime")}
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 me-3 flex-shrink-0"></span>
            {t("mayContact")}
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 me-3 flex-shrink-0"></span>
            {t("notification")}
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 me-3 flex-shrink-0"></span>
            {t("keepReference")}
          </li>
        </ul>
      </div>

      {/* Summary Option */}
      <div className="space-y-4">
        <Button
          onClick={() => setShowSummary(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
        >
          {t("viewSummary")}
        </Button>
      </div>

      {/* Summary Dialog */}
      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden bg-white dark:bg-gray-800 p-0">
          <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 border-b dark:border-gray-700">
            <div className="px-6 py-4">
              <DialogHeader className="flex flex-row items-center justify-between space-y-0">
                <DialogTitle className="text-gray-900 dark:text-white">
                  {t("viewSummary")}
                </DialogTitle>
                <DialogClose asChild>
                  <Button variant="ghost" size="sm" className="p-2 absolute">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DialogClose>
              </DialogHeader>
            </div>
          </div>

          <div className="space-y-6 overflow-y-auto max-h-[calc(80vh-80px)] px-6 py-4">
            {Object.entries(formatSummary()).map(([section, data]) => (
              <div key={section} className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2">
                  {section}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {key}
                      </label>
                      <p className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        {value || t("notProvided")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostSubmissionView;

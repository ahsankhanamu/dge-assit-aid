import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../../contexts/FormContext";
import TextAreaField from "../TextareaField";
import {
  Loader2,
  Sparkles,
  Send,
  Check,
  X,
  RefreshCw,
  Pencil,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormData } from "../../contexts/FormContext";
import { Controller } from "react-hook-form";
import { openAI } from "@/lib/endpoints";

const SituationStep: React.FC = () => {
  const { t } = useTranslation();
  const { formMethods } = useFormContext();
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
    control,
  } = formMethods;

  const [activeField, setActiveField] = useState<
    | "financialSituation"
    | "employmentCircumstances"
    | "reasonForApplying"
    | null
  >(null);
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const getFieldPrompt = (field: typeof activeField) => {
    switch (field) {
      case "financialSituation":
        return t("aiPrompts.financialSituation");
      case "employmentCircumstances":
        return t("aiPrompts.employmentCircumstances");
      case "reasonForApplying":
        return t("aiPrompts.reasonForApplying");
      default:
        return t("aiPrompts.promptPlaceholder");
    }
  };

  const handleHelpMeWrite = (field: typeof activeField) => {
    setActiveField(field);
    setDialogOpen(true);
    setIsEditing(false);
    const fieldContent = watch(field as keyof FormData) as string;
    setCustomPrompt(fieldContent || getFieldPrompt(field));
  };

  const handleGenerate = async () => {
    if (!customPrompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    setIsEditing(false);

    try {
      const response = await openAI.generateSuggestion({
        prompt: customPrompt,
      });
      setSuggestion(response);
    } catch (error) {
      console.error("Error generating suggestion:", error);
      setError(
        error instanceof Error ? error.message : t("error.generationFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setIsEditing(true);
    const textArea = document.getElementById("suggestion");
    if (textArea) {
      textArea.focus();
    }
  };

  const handleAccept = async () => {
    if (!activeField || !suggestion.trim()) return;

    try {
      await trigger(activeField);
      setValue(activeField, suggestion);
      setDialogOpen(false);
      setSuggestion("");
      setCustomPrompt("");
      setError(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error accepting suggestion:", error);
    }
  };

  const handleDiscard = () => {
    setDialogOpen(false);
    setSuggestion("");
    setCustomPrompt("");
    setError(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {t("step3")}
        </h2>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="financialSituation"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("fields.financialSituation")}
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleHelpMeWrite("financialSituation")}
              className="text-xs"
              disabled={!watch("financialSituation")}
            >
              {t("helpMeWrite")}
            </Button>
          </div>
          <Controller
            name="financialSituation"
            control={control}
            rules={{
              required: t("validation.required"),
            }}
            render={({ field }) => (
              <TextAreaField
                {...field}
                label={t("fields.financialSituation")}
                register={register}
                error={errors.financialSituation}
                required
                rows={5}
                placeholder={t("fields.financialSituationPlaceholder")}
              />
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="employmentCircumstances"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("fields.employmentCircumstances")}
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleHelpMeWrite("employmentCircumstances")}
              className="text-xs"
              disabled={!watch("employmentCircumstances")}
            >
              {t("helpMeWrite")}
            </Button>
          </div>
          <Controller
            name="employmentCircumstances"
            control={control}
            rules={{
              required: t("validation.required"),
            }}
            render={({ field }) => (
              <TextAreaField
                {...field}
                label={t("fields.employmentCircumstances")}
                register={register}
                error={errors.employmentCircumstances}
                required
                rows={5}
                placeholder={t("fields.employmentCircumstancesPlaceholder")}
              />
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="reasonForApplying"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("fields.reasonForApplying")}
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleHelpMeWrite("reasonForApplying")}
              className="text-xs"
              disabled={!watch("reasonForApplying")}
            >
              {t("helpMeWrite")}
            </Button>
          </div>
          <Controller
            name="reasonForApplying"
            control={control}
            rules={{
              required: t("validation.required"),
            }}
            render={({ field }) => (
              <TextAreaField
                {...field}
                label={t("fields.reasonForApplying")}
                register={register}
                error={errors.reasonForApplying}
                required
                rows={5}
                placeholder={t("fields.reasonForApplyingPlaceholder")}
              />
            )}
          />
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("aiAssistance")}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="suggestion"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("validation.aiSuggestion")}
              </Label>
              <div className="relative">
                <Textarea
                  id="suggestion"
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder={
                    loading ? "" : t("aiPrompts.aiSuggestionPlaceholder")
                  }
                  className="min-h-[200px] resize-none w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50 rounded-lg transition-colors"
                  disabled={loading || !isEditing}
                />
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-lg">
                    <div className="flex flex-col items-center space-y-3">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {t("generating")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="prompt"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("aiPrompts.yourPrompt")}
              </Label>
              <Textarea
                id="prompt"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder={getFieldPrompt(activeField)}
                className="min-h-[100px] resize-none w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50 rounded-lg transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (customPrompt.trim() && !loading) {
                      handleGenerate();
                    }
                  }
                }}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-700 dark:text-red-400 text-sm font-medium">
                  {error}
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between w-full gap-3">
              <Button
                onClick={handleDiscard}
                variant="ghost"
                className="flex items-center gap-2 px-4 py-2 hover:border-red-400 hover:text-red-600 dark:hover:border-red-500 dark:hover:text-red-400 transition-colors rounded-lg"
                size="sm"
              >
                <X className="h-4 w-4" />
                {t("discard")}
              </Button>

              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={!customPrompt.trim() || loading}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  size="sm"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {t("validation.generateNew")}
                </Button>

                <Button
                  onClick={handleEdit}
                  disabled={!suggestion.trim()}
                  className="flex items-center gap-2 text-black dark:text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  size="sm"
                  variant="outline"
                >
                  <Pencil className="h-4 w-4" />
                  {t("edit")}
                </Button>

                <Button
                  onClick={handleAccept}
                  disabled={!suggestion.trim()}
                  className="flex items-center gap-2 text-white dark:text-black px-4 py-2 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  size="sm"
                >
                  <Check className="h-4 w-4" />
                  {t("accept")}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SituationStep;

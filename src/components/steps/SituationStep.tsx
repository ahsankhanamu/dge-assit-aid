import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../../contexts/FormContext";
import TextAreaField from "../TextareaField";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Controller } from "react-hook-form";
import { openAI } from "@/lib/endpoints";
import { AIAssistanceDialog } from "../dialogs/AIAssistanceDialog";

type FieldName =
  | "financialSituation"
  | "employmentCircumstances"
  | "reasonForApplying";

const SituationStep: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { formMethods } = useFormContext();
  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = formMethods;
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [activeField, setActiveField] = useState<FieldName | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getFieldPrompt = (field: typeof activeField) => {
    return watch(field) || t("aiPrompts.promptPlaceholder");
  };

  const handleHelpMeWrite = (field: FieldName) => {
    setActiveField(field);
    setCustomPrompt(getFieldPrompt(field));
    setDialogOpen(true);
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get all form data
      const formData = watch();

      // Create a structured context object
      const context = {
        language: i18n.language,
        personalInfo: {
          name: formData.name,
          nationalId: formData.nationalId,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          phone: formData.phone,
          email: formData.email,
        },
        familyFinancialInfo: {
          maritalStatus: formData.maritalStatus,
          dependents: formData.dependents,
          employmentStatus: formData.employmentStatus,
          monthlyIncome: formData.monthlyIncome,
        },
        prompt: customPrompt,
      };

      const response = await openAI.generateText({
        prompt: customPrompt,
        // I should be dynamically add what type of field is it
        promptField: activeField,
        data: context,
      });
      if (response.choices?.[0]?.message?.content) {
        setSuggestion(response.choices[0].message.content);
      } else {
        setError(t("errors.aiGenerationFailed"));
      }
    } catch (err) {
      setError(t("errors.aiGenerationFailed"));
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    if (activeField && suggestion) {
      setValue(activeField, suggestion);
      setDialogOpen(false);
      setSuggestion("");
      setCustomPrompt("");
    }
  };

  const handleDiscard = () => {
    setDialogOpen(false);
    setSuggestion("");
    setCustomPrompt("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {t("step3")}
        </h2>

        <div className="space-y-6">
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
              >
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleHelpMeWrite("financialSituation")}
                  className="text-xs"
                  disabled={!watch("financialSituation")}
                >
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  {t("helpMeWrite")}
                </Button>
              </TextAreaField>
            )}
          />
        </div>

        <div className="space-y-4">
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
              >
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleHelpMeWrite("employmentCircumstances")}
                  className="text-xs"
                  disabled={!watch("employmentCircumstances")}
                >
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  {t("helpMeWrite")}
                </Button>
              </TextAreaField>
            )}
          />
        </div>

        <div className="space-y-4">
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
              >
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleHelpMeWrite("reasonForApplying")}
                  className="text-xs"
                  disabled={!watch("reasonForApplying")}
                >
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  {t("helpMeWrite")}
                </Button>
              </TextAreaField>
            )}
          />
        </div>
      </div>

      <AIAssistanceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        suggestion={suggestion}
        onSuggestionChange={setSuggestion}
        customPrompt={customPrompt}
        onCustomPromptChange={setCustomPrompt}
        loading={loading}
        error={error}
        activeField={activeField}
        onGenerate={handleGenerate}
        onAccept={handleAccept}
        onDiscard={handleDiscard}
        getFieldPrompt={getFieldPrompt}
      />
    </div>
  );
};

export default SituationStep;

import { useTranslation } from "react-i18next";
import { Loader2, Send, Check, Pencil, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AIAssistanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suggestion: string;
  onSuggestionChange: (value: string) => void;
  customPrompt: string;
  onCustomPromptChange: (value: string) => void;
  loading: boolean;
  error: string | null;
  activeField: string | null;
  onGenerate: () => void;
  onAccept: () => void;
  onDiscard: () => void;
  getFieldPrompt: (field: string | null) => string;
}

export const AIAssistanceDialog: React.FC<AIAssistanceDialogProps> = ({
  open,
  onOpenChange,
  suggestion,
  onSuggestionChange,
  customPrompt,
  onCustomPromptChange,
  loading,
  error,
  activeField,
  onGenerate,
  onAccept,
  onDiscard,
  getFieldPrompt,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();
  const suggestionRef = useRef<HTMLTextAreaElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      suggestionRef.current?.focus();
    }, 0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                ref={suggestionRef}
                value={suggestion}
                onChange={(e) => onSuggestionChange(e.target.value)}
                placeholder={
                  loading ? "" : t("aiPrompts.aiSuggestionPlaceholder")
                }
                className={`min-h-[200px] resize-none w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50 rounded-lg transition-colors ${
                  isEditing
                    ? "bg-white dark:bg-gray-700"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
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
              onChange={(e) => onCustomPromptChange(e.target.value)}
              placeholder={getFieldPrompt(activeField)}
              className="min-h-[100px] resize-none w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50 rounded-lg transition-colors"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (customPrompt.trim() && !loading) {
                    onGenerate();
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
              onClick={onDiscard}
              variant="ghost"
              className="flex items-center gap-2 px-4 py-2 hover:border-red-400 hover:text-red-600 dark:hover:border-red-500 dark:hover:text-red-400 transition-colors rounded-lg"
              size="sm"
            >
              <X className="h-4 w-4" />
              {t("discard")}
            </Button>

            <div className="flex gap-3">
              <Button
                onClick={onGenerate}
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
                disabled={!suggestion}
                className="flex items-center gap-2 text-black dark:text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                size="sm"
                variant="outline"
              >
                <Pencil className="h-4 w-4" />
                {t("edit")}
              </Button>

              <Button
                onClick={onAccept}
                disabled={!suggestion}
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
  );
};

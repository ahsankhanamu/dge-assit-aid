import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="contact-dialog-description"
      >
        <DialogHeader>
          <DialogTitle>{t("contact.formTitle")}</DialogTitle>
          <p
            id="contact-dialog-description"
            className="text-sm text-muted-foreground"
          >
            {t("contact.formDescription")}
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Contact;

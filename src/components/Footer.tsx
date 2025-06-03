import React from "react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-300">{t("supportDescription")}</p>
          </div>
          <div className="flex space-x-4 text-sm">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t("common.privacyPolicy")}
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t("common.termsOfService")}
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              {t("common.help")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

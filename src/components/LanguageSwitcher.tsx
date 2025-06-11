import { useTranslation } from "react-i18next";
import { useEffect, useCallback } from "react";
import { Button } from "./ui/button";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lng;
      localStorage.setItem("language", lng);
    },
    [i18n]
  );

  const getLocalStorageLanguage = useCallback(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      return savedLanguage;
    }
    return "en";
  }, []);

  useEffect(() => {
    changeLanguage(getLocalStorageLanguage());
  }, [changeLanguage, getLocalStorageLanguage]);

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() =>
          changeLanguage(getLocalStorageLanguage() === "en" ? "ar" : "en")
        }
        variant="link"
      >
        {getLocalStorageLanguage() === "en" ? "عربي" : "EN"}
      </Button>
    </div>
  );
};

export default LanguageSwitcher;

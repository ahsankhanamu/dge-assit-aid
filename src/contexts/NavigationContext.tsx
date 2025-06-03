import React, { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";

interface NavigationContextType {
  navItems: Array<{
    label: string;
    href: string;
  }>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation();

  const navItems = [
    { label: t("home"), href: "#" },
    { label: t("services"), href: "#" },
    { label: t("about"), href: "#" },
    { label: t("contact"), href: "#" },
  ];

  return (
    <NavigationContext.Provider value={{ navItems }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

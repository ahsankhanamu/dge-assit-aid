import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import HeaderNavigation from "./HeaderNavigation";
import AccessibilityMenu from "./AccessibilityMenu";
import MobileMenu from "./MobileMenu";
import { Logo_Dge } from "@/icons/svg";
import LanguageSwitcher from "./LanguageSwitcher";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  return (
    <header className="bg-background shadow-sm border-b fixed top-0 left-0 right-0 z-50 text-base px-4 py-4">
      <div className={`flex justify-between items-center gap-2`}>
        <MobileMenu />
        {/* Logo Section */}
        <div
          className={`flex items-center space-x-4 cursor-pointer`}
          aria-label="Primary Logo"
          onClick={() => navigate("/")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/");
            }
          }}
          role="button"
          tabIndex={0}
        >
          <Logo_Dge />
        </div>

        {/* Navigation Section - Hidden on mobile */}
        <div className="hidden md:block">
          <HeaderNavigation />
        </div>

        {/* User Actions Section */}
        <div className={`flex items-center gap-2`}>
          <AccessibilityMenu />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;

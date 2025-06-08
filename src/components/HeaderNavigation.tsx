import React from "react";
import { useNavigation } from "@/contexts/NavigationContext";
import { cn } from "@/lib/utils";

const HeaderNavigation: React.FC = () => {
  const { navItems } = useNavigation();

  return (
    <nav
      className="flex space-x-6"
      role="navigation"
      aria-label="Main navigation"
    >
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={cn(
            "text-foreground hover:text-primary transition-colors font-medium",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            "px-2 py-1 rounded-sm"
          )}
          role="menuitem"
          tabIndex={0}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default HeaderNavigation;

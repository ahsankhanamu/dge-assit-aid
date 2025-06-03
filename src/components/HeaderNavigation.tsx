import React from "react";
import { useNavigation } from "@/contexts/NavigationContext";

const HeaderNavigation: React.FC = () => {
  const { navItems } = useNavigation();

  return (
    <nav className="flex space-x-6">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="text-foreground hover:text-primary transition-colors font-medium"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default HeaderNavigation;

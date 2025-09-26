import React, { createContext, useContext, useEffect } from "react";
import { getContrastColor } from "../utils/get-contrast-color";

type Theme = {
  primary: string;
  secondary: string;
  background: string;
};

const ThemeContext = createContext<Theme | null>(null);
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({
  theme,
  children,
}: {
  theme: Theme;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", theme.primary);
    root.style.setProperty("--secondary-color", theme.secondary);
    // root.style.setProperty("--background-color", theme.background);
    root.style.setProperty("--background-color", "#333");

    const primaryTextColor = getContrastColor(theme.primary);
    const secondaryTextColor = getContrastColor(theme.secondary);

    root.style.setProperty("--primary-text-color", primaryTextColor);
    root.style.setProperty("--secondary-text-color", secondaryTextColor);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

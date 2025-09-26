import React, { createContext, useContext, useEffect } from "react";

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
    root.style.setProperty("--background-color", theme.background);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

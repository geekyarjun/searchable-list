import { useState, useCallback } from "react";
import { lightTheme, darkTheme, Theme } from "../theme/theme";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  }, []);

  const theme: Theme = isDarkMode ? darkTheme : lightTheme;

  return { theme, isDarkMode, toggleTheme };
};

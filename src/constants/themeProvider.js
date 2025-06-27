import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import DeviceInfo from "react-native-device-info"; // Import Battery Saver detector
import { lightTheme, darkTheme } from "./theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(Appearance.getColorScheme() === "dark");

  useEffect(() => {
    const checkBatterySaver = async () => {
      const isBatterySaver = await DeviceInfo.isBatterySaving(); // Check Battery Saver Mode
      if (isBatterySaver) {
        setIsDark(true); // Force Dark Mode when Battery Saver is on
      }
    };

    checkBatterySaver(); // Run on mount

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === "dark");
    });

    return () => listener.remove();
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, theme: isDark ? darkTheme : lightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

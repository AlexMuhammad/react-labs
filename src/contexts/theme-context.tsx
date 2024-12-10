// import { createContext, useState } from "react";

// export const ThemeContext = createContext<any>(null);

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toogleMode = () => {
//     setIsDarkMode((prev) => !prev);
//   };

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toogleMode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";

// 1. Membuat DarkMode Context
export const ThemeContext = createContext<any>(null);

// 2. Membuat DarkMode Provider
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Cek preferensi sistem dan local storage
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      const systemPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return saved ? JSON.parse(saved) : systemPreference;
    }
    return false;
  });

  // Update HTML class dan local storage saat mode berubah
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

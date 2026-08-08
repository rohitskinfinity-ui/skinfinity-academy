"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface LMSThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const LMSThemeContext = createContext<LMSThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function LMSThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("lms-theme") as Theme | null;
    if (saved === "light" || saved === "dark") {
      setThemeState(saved);
    } else {
      setThemeState("dark");
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("lms-theme", newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <LMSThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className={theme === "dark" ? "dark bg-slate-950 text-slate-100 min-h-screen" : "light bg-slate-50 text-slate-900 min-h-screen"}>
        {children}
      </div>
    </LMSThemeContext.Provider>
  );
}

export function useLMSTheme() {
  return useContext(LMSThemeContext);
}

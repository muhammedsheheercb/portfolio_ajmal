"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ScrollReset } from "./scroll-reset";
import { MotionConfig } from "framer-motion";
type Theme = "dark" | "light";
type Accent = "neutral" | "gold" | "earth" | "green";
const Preferences = createContext({
  theme: "dark" as Theme,
  accent: "gold" as Accent,
  toggleTheme: () => {},
  setAccent: (_value: Accent) => {},
});
export const usePreferences = () => useContext(Preferences);
export function Providers({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [accent, setAccentState] = useState<Accent>("gold");
  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) || "dark");
    setAccentState(
      (document.documentElement.dataset.accent as Accent) || "gold",
    );
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const change = () => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {}
      const value = mq.matches ? "dark" : "light";
      setTheme(value);
      document.documentElement.dataset.theme = value;
    };
    mq.addEventListener("change", change);
    return () => mq.removeEventListener("change", change);
  }, []);
  const toggleTheme = () => {
    const value = theme === "dark" ? "light" : "dark";
    setTheme(value);
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem("theme", value);
    } catch {}
  };
  const setAccent = (value: Accent) => {
    setAccentState(value);
    document.documentElement.dataset.accent = value;
    try {
      localStorage.setItem("accent", value);
    } catch {}
  };
  return (
    <Preferences.Provider value={{ theme, accent, toggleTheme, setAccent }}>
      <MotionConfig reducedMotion="user">
        <ScrollReset />
        {children}
      </MotionConfig>
    </Preferences.Provider>
  );
}

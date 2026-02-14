import { useState, useEffect } from "react";
const STORAGE_KEY = "medora-theme";
function getStoredTheme() {
  if (typeof window === "undefined") return "morning";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "icu" ? "icu" : "morning";
}
function applyTheme(theme) {
  if (typeof window === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem(STORAGE_KEY, theme);
}
function toggleTheme(currentTheme) {
  const nextTheme = currentTheme === "morning" ? "icu" : "morning";
  applyTheme(nextTheme);
  return nextTheme;
}
function useMedoraTheme() {
  const [theme, setTheme] = useState("morning");
  useEffect(() => {
    const storedTheme = getStoredTheme();
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);
  const onToggleTheme = () => {
    setTheme((current) => toggleTheme(current));
  };
  return {
    theme,
    onToggleTheme
  };
}
export {
  useMedoraTheme as u
};

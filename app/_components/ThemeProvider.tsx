"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getCurrentTheme,
  setTheme as persistTheme,
  subscribeToTheme,
  toggleTheme as toggleDocumentTheme,
  type Theme,
} from "../_lib/theme";

type ThemeContextValue = {
  /** `null` until hydration completes, then the active theme. */
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isReady: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const getServerThemeSnapshot = (): Theme | null => null;

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getCurrentTheme,
    getServerThemeSnapshot
  );

  const setTheme = useCallback((nextTheme: Theme) => {
    persistTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    toggleDocumentTheme();
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isReady: theme !== null,
    }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

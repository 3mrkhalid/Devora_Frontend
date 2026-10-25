export const THEME_STORAGE_KEY = "ModeStatus";
export const THEME_CHANGE_EVENT = "devora:theme-change";

export type Theme = "light" | "dark";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies, etc.).
    return null;
  }
}

export function getCurrentTheme(): Theme {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Applies the theme to the document root and optionally persists it.
 *
 * The `data-theme` attribute and `color-scheme` style keep native controls and
 * the browser UI in sync, while the `dark` class drives Tailwind's dark variant.
 */
export function applyTheme(theme: Theme, persist = false): void {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  if (persist) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // The UI should keep working even when localStorage is unavailable.
    }
  }

  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function setTheme(theme: Theme): void {
  applyTheme(theme, true);
}

export function toggleTheme(): Theme {
  const nextTheme: Theme = getCurrentTheme() === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  return nextTheme;
}

/**
 * Subscribes the React store to theme changes from this tab, the system
 * preference, and other tabs. The returned snapshot is read from the root
 * element, which is the single source of truth after the init script runs.
 */
export function subscribeToTheme(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const handleThemeChange = () => onStoreChange();

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) {
      return;
    }

    if (isTheme(event.newValue)) {
      applyTheme(event.newValue, false);
      return;
    }

    // The preference was removed or corrupted in another tab: fall back to the
    // system preference without overwriting it.
    applyTheme(getSystemTheme(), false);
  };

  const handleSystemChange = () => {
    // An explicit saved preference always wins over system changes.
    if (getStoredTheme()) {
      return;
    }

    applyTheme(getSystemTheme(), false);
  };

  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  window.addEventListener("storage", handleStorage);
  mediaQuery.addEventListener("change", handleSystemChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.removeEventListener("storage", handleStorage);
    mediaQuery.removeEventListener("change", handleSystemChange);
  };
}

/**
 * Runs before the page paints to avoid a flash of the wrong theme. Kept as a
 * string so it can be inlined into the server-rendered document.
 */
export const THEME_INIT_SCRIPT = `(function(){var key="ModeStatus";var stored=null;try{stored=localStorage.getItem(key);}catch(e){}var theme=stored==="dark"||stored==="light"?stored:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var root=document.documentElement;root.classList.toggle("dark",theme==="dark");root.classList.toggle("light",theme==="light");root.setAttribute("data-theme",theme);root.style.colorScheme=theme;})();`;

export const AUTH_MODES = ["login", "register", "forgot-password"] as const;

export type AuthMode = (typeof AUTH_MODES)[number];

export const DEFAULT_AUTH_MODE: AuthMode = "login";

export function isAuthMode(value: unknown): value is AuthMode {
  return (
    typeof value === "string" &&
    (AUTH_MODES as readonly string[]).includes(value)
  );
}

/**
 * Normalizes the `mode` search parameter into a supported auth mode.
 * Unknown or missing values fall back to the default (login) mode.
 */
export function parseAuthMode(
  value: string | string[] | null | undefined
): AuthMode {
  const candidate = Array.isArray(value) ? value[0] : value;

  if (isAuthMode(candidate)) return candidate;

  // Older links used `?mode=forgot`; keep them working after renaming the
  // mode to `forgot-password`.
  if (candidate === "forgot") return "forgot-password";

  return DEFAULT_AUTH_MODE;
}

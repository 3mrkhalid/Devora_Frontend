/**
 * Password recovery integration point.
 *
 * The Go API currently has no password-recovery routes (as of this change the
 * router only serves `GET /`). This module is the single place that talks to
 * the backend, so the flow can be wired up without touching UI components.
 *
 * Required backend contract:
 *
 *   POST /auth/forgot-password   { email }                  -> 2xx
 *   POST /auth/verify-reset-code { email, code }            -> 2xx
 *   POST /auth/reset-password    { email, code, password }  -> 2xx
 *
 * The request endpoint must return 2xx for unknown addresses as well, so the
 * UI cannot be used for account enumeration. The verify call must be
 * performed server-side, and `/auth/reset-password` must re-validate the code
 * before changing the password. The client never treats a step transition as
 * proof that the code is valid.
 *
 * Until those handlers exist, requests fail closed (404/501 are surfaced as
 * "unavailable") and the UI never fakes a successful verification or reset.
 */

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"
).replace(/\/+$/, "");

const ENDPOINTS = {
  requestCode: "/auth/forgot-password",
  verifyCode: "/auth/verify-reset-code",
  resetPassword: "/auth/reset-password",
} as const;

const REQUEST_TIMEOUT_MS = 15_000;

/**
 * The backend does not document a code length yet. Six digits is the value
 * this UI expects; update this constant if the backend chooses a different
 * length. Keep the input and validation in sync automatically.
 */
export const RECOVERY_CODE_LENGTH = 6;

export type PasswordRecoveryErrorCode =
  | "network"
  | "unavailable"
  | "rate-limited"
  | "request-failed"
  | "invalid-code"
  | "invalid-reset"
  | "server"
  | "unknown";

export class PasswordRecoveryError extends Error {
  readonly code: PasswordRecoveryErrorCode;
  readonly status: number | null;

  constructor(
    code: PasswordRecoveryErrorCode,
    message: string,
    status: number | null = null
  ) {
    super(message);
    this.name = "PasswordRecoveryError";
    this.code = code;
    this.status = status;
  }
}

type RecoveryPayload = Record<string, string>;

function isSuccess(status: number): boolean {
  return status >= 200 && status < 300;
}

function assertEndpointAvailable(status: number): void {
  if (status === 404 || status === 501) {
    throw new PasswordRecoveryError(
      "unavailable",
      "Password recovery is temporarily unavailable. Please try again later or contact support.",
      status
    );
  }
}

async function postJson(path: string, payload: RecoveryPayload): Promise<number> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      // Matches the backend's cookie-based refresh-token convention.
      credentials: "include",
      cache: "no-store",
      signal: controller.signal,
    });

    return response.status;
  } catch {
    if (controller.signal.aborted) {
      throw new PasswordRecoveryError(
        "network",
        "The request timed out. Check your connection and try again."
      );
    }

    throw new PasswordRecoveryError(
      "network",
      "Unable to connect. Check your connection and try again."
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Request a recovery code. The UI deliberately returns the same success path
 * regardless of whether the address is registered, to prevent enumeration.
 * Server error bodies are intentionally not surfaced here because they may
 * disclose whether an account exists.
 */
export async function requestPasswordRecovery(email: string): Promise<void> {
  const status = await postJson(ENDPOINTS.requestCode, { email });

  assertEndpointAvailable(status);

  if (isSuccess(status)) {
    return;
  }

  if (status === 429) {
    throw new PasswordRecoveryError(
      "rate-limited",
      "Too many requests. Please wait a moment and try again.",
      status
    );
  }

  if (status >= 500) {
    throw new PasswordRecoveryError(
      "server",
      "Something went wrong on our end. Please try again.",
      status
    );
  }

  throw new PasswordRecoveryError(
    "request-failed",
    "We couldn't send a recovery code. Please try again.",
    status
  );
}

/**
 * Ask the server to verify the code. A resolved promise means the server
 * accepted it; the reset call below re-checks it before updating anything.
 */
export async function verifyPasswordRecoveryCode(
  email: string,
  code: string
): Promise<void> {
  const status = await postJson(ENDPOINTS.verifyCode, { email, code });

  assertEndpointAvailable(status);

  if (isSuccess(status)) {
    return;
  }

  if (status === 429) {
    throw new PasswordRecoveryError(
      "rate-limited",
      "Too many attempts. Please wait a moment and try again.",
      status
    );
  }

  if (status === 410) {
    throw new PasswordRecoveryError(
      "invalid-code",
      "That recovery code has expired. Request a new code and try again.",
      status
    );
  }

  if (status === 400 || status === 401 || status === 403) {
    throw new PasswordRecoveryError(
      "invalid-code",
      "That recovery code is incorrect. Check the code and try again.",
      status
    );
  }

  if (status >= 500) {
    throw new PasswordRecoveryError(
      "server",
      "Something went wrong on our end. Please try again.",
      status
    );
  }

  throw new PasswordRecoveryError(
    "unknown",
    "We couldn't verify that code. Please try again.",
    status
  );
}

/**
 * Complete the reset. The recovery code is kept in React state only and is
 * re-sent here so the server can validate it again. It is never written to
 * storage, the URL, or logs.
 */
export async function resetPassword(
  email: string,
  code: string,
  password: string
): Promise<void> {
  const status = await postJson(ENDPOINTS.resetPassword, {
    email,
    code,
    password,
  });

  assertEndpointAvailable(status);

  if (isSuccess(status)) {
    return;
  }

  if (status === 429) {
    throw new PasswordRecoveryError(
      "rate-limited",
      "Too many requests. Please wait a moment and try again.",
      status
    );
  }

  if (status === 400 || status === 401 || status === 403 || status === 410) {
    throw new PasswordRecoveryError(
      "invalid-reset",
      "Your recovery session is no longer valid. Request a new code and try again.",
      status
    );
  }

  if (status === 422) {
    throw new PasswordRecoveryError(
      "invalid-reset",
      "Check your new password and try again.",
      status
    );
  }

  if (status >= 500) {
    throw new PasswordRecoveryError(
      "server",
      "Something went wrong on our end. Please try again.",
      status
    );
  }

  throw new PasswordRecoveryError(
    "unknown",
    "We couldn't reset your password. Please try again.",
    status
  );
}

export function toRecoveryErrorMessage(
  error: unknown,
  fallback: string
): string {
  return error instanceof PasswordRecoveryError ? error.message : fallback;
}

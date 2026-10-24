import axios from "axios";

export type AuthErrorCode =
  | "invalid-credentials"
  | "email-taken"
  | "validation"
  | "rate-limited"
  | "network"
  | "timeout"
  | "server"
  | "unavailable"
  | "unexpected-response"
  | "unknown";

export class AuthApiError extends Error {
  readonly code: AuthErrorCode;
  readonly status: number | null;

  constructor(
    code: AuthErrorCode,
    message: string,
    status: number | null = null
  ) {
    super(message);
    this.name = "AuthApiError";
    this.code = code;
    this.status = status;
  }
}

export type AuthOperation = "login" | "register";

interface BackendErrorBody {
  error?: unknown;
  message?: unknown;
}

function getBackendMessage(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;

  const body = data as BackendErrorBody;

  if (typeof body.error === "string") return body.error;
  if (typeof body.message === "string") return body.message;

  return null;
}

function looksLikeDuplicateEmail(message: string | null): boolean {
  if (!message) return false;

  const normalized = message.toLowerCase();

  return (
    normalized.includes("already exists") ||
    normalized.includes("already registered") ||
    normalized.includes("duplicate")
  );
}

/**
 * Converts Axios and unexpected errors into safe, user-facing auth errors.
 * Backend bodies are only inspected for the duplicate-email case; raw server
 * messages, stack traces, and validation internals are never surfaced.
 */
export function toAuthApiError(
  error: unknown,
  operation: AuthOperation
): AuthApiError {
  if (error instanceof AuthApiError) return error;

  if (!axios.isAxiosError(error)) {
    return new AuthApiError(
      "unknown",
      "Something went wrong. Please try again."
    );
  }

  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
    return new AuthApiError(
      "timeout",
      "The request timed out. Check your connection and try again."
    );
  }

  if (!error.response) {
    return new AuthApiError(
      "network",
      "Unable to connect. Check your connection and try again."
    );
  }

  const { status, data } = error.response;
  const backendMessage = getBackendMessage(data);

  if (status === 404 || status === 501) {
    return new AuthApiError(
      "unavailable",
      "Authentication is temporarily unavailable. Please try again later.",
      status
    );
  }

  if (status === 401 && operation === "login") {
    return new AuthApiError(
      "invalid-credentials",
      "Invalid email or password.",
      status
    );
  }

  if (status === 409 || looksLikeDuplicateEmail(backendMessage)) {
    return new AuthApiError(
      "email-taken",
      "An account with that email already exists.",
      status
    );
  }

  if (status === 400 || status === 422) {
    return new AuthApiError(
      "validation",
      operation === "login"
        ? "Enter a valid email address and password."
        : "Check your username, email, and password, then try again.",
      status
    );
  }

  if (status === 429) {
    return new AuthApiError(
      "rate-limited",
      "Too many attempts. Please wait a moment and try again.",
      status
    );
  }

  if (status >= 500) {
    return new AuthApiError(
      "server",
      "Something went wrong on our end. Please try again.",
      status
    );
  }

  return new AuthApiError(
    "unknown",
    "We couldn't complete that request. Please try again.",
    status
  );
}

export function toAuthErrorMessage(error: unknown, fallback: string): string {
  return error instanceof AuthApiError ? error.message : fallback;
}

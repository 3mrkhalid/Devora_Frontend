import api from "@/api/conf_global/axios";
import { AuthApiError, toAuthApiError } from "./errors";
import type { AuthResponse, LoginPayload } from "./types";

export type { AuthResponse, LoginPayload } from "./types";

/**
 * Authenticates the user and returns the in-memory access token.
 *
 * The Go backend responds with `{ message, user, accessToken }` and also sets
 * an HttpOnly `refresh_token` cookie (handled by `withCredentials` in the
 * shared Axios instance).
 */
export const loginHandler = async (
  payload: LoginPayload
): Promise<string> => {
  try {
    const { data } = await api.post<AuthResponse>("auth/login", payload);

    if (
      !data ||
      typeof data.accessToken !== "string" ||
      data.accessToken.length === 0
    ) {
      throw new AuthApiError(
        "unexpected-response",
        "The server returned an unexpected response. Please try again."
      );
    }

    return data.accessToken;
  } catch (error) {
    throw toAuthApiError(error, "login");
  }
};

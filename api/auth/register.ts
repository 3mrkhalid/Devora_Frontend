import api from "@/api/conf_global/axios";
import { AuthApiError, toAuthApiError } from "./errors";
import type { RegisterPayload, RegisterResponse } from "./types";

export type { RegisterPayload, RegisterResponse } from "./types";

export const registerHandler = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  try {
    const { data } = await api.post<RegisterResponse>(
      "/auth/api",
      payload
    );

    if (
      !data ||
      typeof data.username !== "string" ||
      typeof data.email !== "string" ||
      typeof data.accessToken !== "string" ||
      data.accessToken.length === 0
    ) {
      throw new AuthApiError(
        "unexpected-response",
        "The server returned an unexpected response. Please try again."
      );
    }

    return data;
  } catch (error) {
    throw toAuthApiError(error, "register");
  }
};

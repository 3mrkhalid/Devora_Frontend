export interface AuthUser {
  id: number;
  email: string;
  username: string;
}

export interface AuthResponse {
  message?: string;
  user?: AuthUser;
  accessToken?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

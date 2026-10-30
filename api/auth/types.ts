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
  fullname: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  username: string;
  email: string;
  accessToken: string;
}

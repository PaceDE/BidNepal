import { AUTH_STATUS } from "./auth.constants";

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  country: string;
  phone: string;
};

/**
 * Auth User Model
 */
export type AuthUser = {
  firstName: string | null;
  email: string;
  role: string;
  avatar: string | null;
  userStatus: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  firstLogin: boolean;
  profileSetup: boolean;
};

/**
 * API response
 */
export type AuthResponse = {
  user: AuthUser;
  accessToken: string;
};


export type RegisterResponse = {
  email: string;
};

/**
 * Redux state
 */
export type AuthStatus = typeof AUTH_STATUS[keyof (typeof AUTH_STATUS)]
export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  status: AuthStatus
}

export interface getVerificationSessionResponse {
  email: string;
}
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
  firstName: string;
  email: string;
  role: string;
  emailVerified: boolean;
  phoneVerified: boolean;
};

/**
 * API response
 */
export type LoginResponse = {
  user: AuthUser;
  accessToken: string;
};

export type RegisterResponse = {
  user: AuthUser;
};

/**
 * Redux state
 */
export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  status: "idle" | "loading" | "authenticated" | "expired";
}
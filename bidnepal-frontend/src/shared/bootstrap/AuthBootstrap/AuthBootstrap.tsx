import { cookies } from "next/headers";
import AuthBootstrapClient from "./AuthBootstrapClient";
import { authApi } from "@/features/auth/api/auth.api.server";
import { AUTH_STATUS } from "@/features/auth/auth.constants";
import { ApiError } from "@/shared/lib/api/error";
import { AuthResponse, AuthStatus } from "@/features/auth/auth.types";


const AuthBootstrap = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("_bn_refreshtoken")?.value;
  let status:AuthStatus = AUTH_STATUS.UNAUTHENTICATED;
  let data: AuthResponse | null = null;

  if (token) {
    try {
      data = await authApi.getMe();
      status = AUTH_STATUS.AUTHENTICATED;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        status = AUTH_STATUS.EXPIRED;
      }
    }
  }

  return (
    <AuthBootstrapClient data={data} status={status}>
      {children}
    </AuthBootstrapClient>
  );
};

export default AuthBootstrap;
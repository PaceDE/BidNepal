import { cookies } from "next/headers";
import AuthBootstrapClient from "./AuthBootstrapClient";
import { authApi } from "@/features/auth/api/auth.api.server";
import { AUTH_STATUS } from "@/features/auth/auth.constants";
import { ApiError } from "next/dist/server/api-utils";

const AuthBootstrap = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("_bn_refreshtokn")?.value;
  let status = AUTH_STATUS.UNAUTHENTICATED
  if (!token)
    return <AuthBootstrapClient data={null} status={status} />
  try {
    const data = await authApi.getMe();
    status = AUTH_STATUS.AUTHENTICATED
    return <AuthBootstrapClient data={data} status={status} />
  } catch (err) {
    if (err instanceof ApiError)
      if (err.statusCode === 401)
        status = AUTH_STATUS.EXPIRED
    return <AuthBootstrapClient data={null} status={status} />
  }
}

export default AuthBootstrap

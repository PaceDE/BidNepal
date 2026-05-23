// lib/serverFetch.ts
import "server-only";
import { cookies } from "next/headers";
import { ApiError } from "./error";

export async function serverFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieHeader = (await cookies()).toString();

  const res = await fetch(`${process.env.BACKEND_URL}/api${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      cookie: cookieHeader,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new ApiError(result?.message || "Something went wrong", res.status);
  }

  return result.data as T;
}
import { queryClient } from "../query/queryClient";
import { fetchCsrf } from "./fetchCsrf";

export async function prefetchCsrf() {
  await queryClient.prefetchQuery({
    queryKey: ["csrf"],
    queryFn: fetchCsrf,
    staleTime: Infinity,
  });
}

export async function getCsrfToken() {
  return queryClient.ensureQueryData({
    queryKey: ["csrf"],
    queryFn: fetchCsrf,
    staleTime: Infinity,
  });
}

export function invalidateCsrf() {
  queryClient.invalidateQueries({
    queryKey: ["csrf"],
  });
}

export function removeCsrf() {
  queryClient.removeQueries({
    queryKey: ["csrf"],
  });
}

export async function getCsrfHeader(): Promise<Record<string, string>> {
  const token = await getCsrfToken();


  if (!token) return {};

  return {
    "x-csrf-token": token,
  };
}
import { store } from "@/redux/store";

export function getToken(): string | null {
  return store.getState().auth.accessToken;
}
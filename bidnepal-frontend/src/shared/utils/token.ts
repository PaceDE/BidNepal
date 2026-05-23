import { store } from "@/redux/store";
import { setAccessToken as setToken } from "@/features/auth/auth.slice";

export function getAccessToken(): string | null {
  return store.getState().auth.accessToken;
}

export function setAccessToken(token:string | null): void {
  store.dispatch(setToken(token));
}
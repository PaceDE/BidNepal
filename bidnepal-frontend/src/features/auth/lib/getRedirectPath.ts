import { AuthUser } from "../auth.types";


export function getAccountSetupRedirectPath(user: AuthUser | null) {
  if (!user) return null;

  if (!user.profileSetup) return "/account/profile-setup";
  if (!user.emailVerified) return "/account/verify-email";
  // if (!user.phoneVerified) return "/account/verify-phone";

  if (user.firstLogin) return "/welcome";

  return null;
}
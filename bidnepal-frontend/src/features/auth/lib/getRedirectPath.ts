import { AuthUser } from "../auth.types";

const PUBLIC_ROUTES = ["/contact", "/about", "/pricing"];

export function getRedirectPath(user: AuthUser, pathname: string) {
    if(PUBLIC_ROUTES.includes(pathname)) 
        return null
    else if (user) {
        if (!user.profileSetup) return "/setup/profile";
        else if (!user.emailVerified) return "/setup/verify-email";
        else if (!user.emailVerified) return "/setup/verify-phone";
        else if (user.firstLogin && !user.avatar) return "/welcome";
    }
    return null
}
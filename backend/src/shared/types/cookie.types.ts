export interface CookieOptions {
    httpOnly?:boolean
    secure?: boolean
    sameSite?: "none" | "lax" | "strict"
    maxAge?: number
}
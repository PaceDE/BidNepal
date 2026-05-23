import type { Response } from "express"
import type { CookieOptions } from "@/shared/types/cookie.types.js"

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 15 * 60 * 1000
}

const cookieService = {
  setCookie: (
    res: Response,
    name: string,
    value: string,
    options?: CookieOptions
  ) => {
    res.cookie(name, value, {
      ...cookieOptions,
      ...options
    })
    return res;
  }
}

export default cookieService
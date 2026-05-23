import { NextResponse } from "next/server";

type CookieOptions = {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
    path?: string;
    expires?: Date;
    maxAge?: number;
};

const DEFAULT_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
};

export const setCookie = (
    res: NextResponse,
    name: string,
    value: string,
    options?: CookieOptions
): NextResponse => {
    const cookieOptions = { ...DEFAULT_OPTIONS, ...options };

    res.cookies.set(name, value, cookieOptions);
    return res;
};

export const clearCookie = (
    res: NextResponse,
    name: string,
): NextResponse => {
    res.cookies.delete(name);
    return res;
};

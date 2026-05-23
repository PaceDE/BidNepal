import { AppError } from "@/shared/errors/AppError.js";
import csrfService from "./csrf.service.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import type { Request,Response, NextFunction } from "express";

export const csrfMiddleware = asyncHandler((req:Request, res:Response, next:NextFunction) => {
    const secret = req.cookies._bn_csrfsecret;
    const token = req.headers["x-csrf-token"] as string | undefined;

    if(!secret || !token)
        throw new AppError("CSRF token missing", 403);

    const valid = csrfService.verifyToken(secret, token);

    if (!valid)
        throw new AppError("Invalid CSRF token", 403, { clearCookie: ["_bn_csrfsecret"] });

    next();
   
})
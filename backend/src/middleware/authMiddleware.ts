import { AppError } from "@/shared/errors/AppError.js";
import tokenService from "@/shared/services/token.service.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import type { Request, Response, NextFunction } from "express";
import { th } from "zod/locales";

export const authMiddleware = asyncHandler((req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) 
       throw new AppError("Unauthorized", 401);
    
    const token  = authHeader.split(" ")[1];
    
    if (!token) throw new AppError("Unauthorized", 401);

    const decoded = tokenService.verifyAccessToken(token);

    req.user = decoded;
    next();
})
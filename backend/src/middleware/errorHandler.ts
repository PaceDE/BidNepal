import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/shared/errors/AppError.js";

export const errorHandler = (err:unknown, _req: Request, res: Response, _next: NextFunction) => {
    let statusCode =  500;
    let message = "Internal Server Error"
    let errors: Record<string, string[]> | undefined


    if (err instanceof AppError){
        statusCode=err.statusCode
        message=err.message
        errors=err.errors
    } else if(err instanceof Error){
        message=err.message
    }

    if(err instanceof AppError && err.clearCookie){
        err.clearCookie.forEach(cookie => {
            res.clearCookie(cookie, {path:"/"})
        })
    }
        
    return res.status(statusCode).json({
        success:false,
        message,
        ...(errors && { errors })
    });
}
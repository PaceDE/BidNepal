import type { Response } from "express";

type SuccessResponseOptions<T> = {
  message?: string
  statusCode?: number
  data?: T
}

export const successResponse = <T>(
    res: Response, 
    options:SuccessResponseOptions<T>={}
) => {
    const {
        message = "Success",
        statusCode = 200,
        data
    } = options
    return res.status(statusCode).json({
        success: true,
        message,
        ...(data !==undefined && { data })
    });
}
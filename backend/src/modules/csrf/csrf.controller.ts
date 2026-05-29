import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import csrfService from "./csrf.service.js";
import type { Request, Response } from "express";
import cookieService from "@/shared/services/cookie.service.js";
import { successResponse } from "@/shared/utils/responseHandler.js";

const csrfController = {
    getCsrfToken: asyncHandler((req: Request, res: Response) => {
        let secret = req.cookies._bn_csrfsecret;
        let response = res;
        
        if (!secret){
            secret = csrfService.generateSecret();
            response = cookieService.setCookie(res,'_bn_csrfsecret',secret)
        }
         const token =csrfService.generateToken(secret);
         return successResponse(response,{
            data:{csrfToken:token},
            message: "CSRF Token fetched succesfully",
            statusCode:200
         })
       
    })
}

export default csrfController
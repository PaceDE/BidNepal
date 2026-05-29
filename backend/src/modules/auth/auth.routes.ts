// auth.routes.ts

import { Router } from "express";
import authController from "./auth.controller.js";
import { authMiddleware } from "@/middleware/authMiddleware.js";

const router = Router();

router.post("/register", authController.createUser);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.post("/refresh", authController.refreshAccessToken);

router.get("/me", authController.getCurrentUser);

router.get(
    "/verification-session",
    authController.getVerificationSession
);

router.post(
    "/email/link/send",
    authController.resendEmailVerificationLink
);

router.get("/email/link/verify", authController.verifyEmailByLink);

router.get("/google", authController.getGoogleLogin);

router.post("/email/otp/send",authMiddleware,authController.sendEmailVerificationOtp);

router.post("/email/otp/verify",authMiddleware, authController.verifyEmailByOTP);

router.get("/google/callback", authController.googleCallback);

export default router;
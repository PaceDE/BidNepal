// auth.routes.ts

import { Router } from "express";
import authController from "./auth.controller.js";

const router = Router();

router.post("/register", authController.createUser);

router.post("/login", authController.login);

router.post("/refresh", authController.refreshAccessToken);

router.get("/me", authController.getCurrentUser);

router.get(
    "/verification-session",
    authController.getVerificationSession
);

router.post(
    "/resend-email-verification",
    authController.resendEmailVerification
);

router.get("/verify-email/confirm", authController.verifyEmail);

router.get("/google", authController.getGoogleLogin);

router.get("/google/callback", authController.googleCallback);

export default router;
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
    "/resend-verification",
    authController.resendEmailVerification
);

router.post("/verify-email", authController.verifyEmail);

export default router;
import { Router } from "express";
import userController from "@/modules/auth/auth.controller.js";

const router = Router();

router.post("/register", userController.createUser);

export default router;
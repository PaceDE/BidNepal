import { Router } from "express";
import userController from "./user.controller.js";
import { authMiddleware } from "@/middleware/authMiddleware.js";
import { upload } from "@/shared/services/multer.services.js";

const router = Router();

router.get("/profile", authMiddleware,userController.getProfile);
router.post("/profile",authMiddleware, userController.profileUpdate);

router.post("/profile/complete", authMiddleware,upload.single("image"), userController.completeProfile);


export default router;
import { Router } from "express";

const router = Router();
import fileController from "./file.controller.js";
import { authMiddleware } from "@/middleware/authMiddleware.js";
import { upload } from "@/shared/services/multer.services.js";

router.post("/upload",authMiddleware,upload.single("image"), fileController.uploadFile);

export default router;

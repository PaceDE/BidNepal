import { Router } from "express";
import csrfController from "./csrf.controller.js";

const router = Router()

router.get("/",csrfController.getCsrfToken);

export default router;
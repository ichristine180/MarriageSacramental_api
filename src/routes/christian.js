import express from "express";
import { auth } from "../middleware/index.js";
import Christian from "../controllers/christian.js";
const router = express.Router();
const christian = new Christian();
router.post("/register", christian.register);
router.post("/validate", christian.validateChristian);
router.post("/one",[auth.authenticate], christian.getChristian);
export default router;

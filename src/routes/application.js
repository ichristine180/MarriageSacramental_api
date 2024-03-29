import express from "express";
import { auth } from "../middleware/index.js";
import Apply from "../controllers/application.js";
const app = new Apply();
const router = express.Router();
router.post("/apply", [auth.authenticate], app.apply);
router.post("/list", [auth.authenticate], app.findAll);
router.post("/one", [auth.authenticate], app.findOne);
router.post("/process", [auth.authenticate], app.process);
export default router;

import express from "express";
import { auth } from "../middleware/index.js";
import { getAll } from "../controllers/user.js";
const router = express.Router();
router.post("/list", [auth.authenticate], (req, res) =>
 getAll(res)
);
export default router;

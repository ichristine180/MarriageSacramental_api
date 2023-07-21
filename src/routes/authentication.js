import express from "express";
import { auth } from "../middleware/index.js";
import { changePassword, login } from "../controllers/authentication.js";
const router = express.Router();
router.post("/login", (req, res) => login(res, req.body));
router.post("/changePassword", [auth.authenticate], (req, res) =>
 changePassword(res, req)
);

export default router;

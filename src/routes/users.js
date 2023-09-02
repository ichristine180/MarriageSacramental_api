import express from "express";
import { auth } from "../middleware/index.js";
import { createUser, findUserByMobileNo, getAll } from "../controllers/user.js";
const router = express.Router();
router.post("/create", [auth.authenticate], (req, res) => createUser(req.body));
router.post("/list", [auth.authenticate], (req, res) => getAll(res));
router.post("/one", [auth.authenticate], (req, res) => findUserByMobileNo(res,req.body));
export default router;

import express from "express";
import { uploadImages } from "../middleware/uploadImage.js";
import { saveImage } from "../controllers/upload.js";
const router = express.Router();
router.post("/upload", uploadImages.single("file"), (req, res) =>
  saveImage(req, res)
);

export default router;

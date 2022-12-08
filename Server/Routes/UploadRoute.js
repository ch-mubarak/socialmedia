import express from "express";
import multer from "multer";
import authenticate from "../middleware/Auth.js";
import sharp from "sharp";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(authenticate);
router.post("/image", upload.single("file"), async (req, res) => {
  try {
    const path=`public/images/${req.body.name}`
    await sharp(req.file.buffer).resize(600,600).toFile(path)
    return res.status(200).json({ message: "File upload successfully" });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: "Something went wrong" });
  }
});

export default router;

import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

router.post("/image", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json({ message: "File upload successfully" });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: "Something went wrong" });
  }
});

export default router;

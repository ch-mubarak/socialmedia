import express from "express";
import {
  createNewPost,
  deletePost,
  getPost,
  likePost,
  updatePost,
} from "../Controllers/PostController.js";
const router = express.Router();

router.post("/", createNewPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id",deletePost)
router.put("/:id/like",likePost)

export default router;

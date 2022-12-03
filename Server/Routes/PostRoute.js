import express from "express";
import {
  createNewPost,
  deletePost,
  getPost,
  getTimelinePost,
  getUserPosts,
  likePost,
  updatePost,
} from "../Controllers/PostController.js";
const router = express.Router();

router.post("/", createNewPost);
router.get("/user/:id", getUserPosts);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id/timeline", getTimelinePost);

export default router;

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
import authenticate from "../middleware/Auth.js";
const router = express.Router();

router.use(authenticate)

router.post("/", createNewPost);
router.get("/:id", getPost);
router.get("/user/:id", getUserPosts);
router.put("/:id", updatePost);
router.put("/:id/like", likePost);
router.delete("/:id", deletePost);
router.get("/:id/timeline", getTimelinePost);

export default router;

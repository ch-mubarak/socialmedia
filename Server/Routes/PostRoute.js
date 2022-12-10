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

router.get("/user/:id", getUserPosts);
router.get("/:id", getPost);
router.get("/:id/timeline", getTimelinePost);

router.post("/", createNewPost);

router.put("/:id", updatePost);
router.put("/:id/like", likePost);

router.delete("/:id", deletePost);

export default router;

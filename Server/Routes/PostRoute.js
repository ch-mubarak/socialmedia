import express from "express";
import {
  createNewPost,
  deletePost,
  getMyPosts,
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
router.get("/myPosts/:id", getMyPosts);
router.get("/user/:id", getUserPosts);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id/timeline", getTimelinePost);

export default router;

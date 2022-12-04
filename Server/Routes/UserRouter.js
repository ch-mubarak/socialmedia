import express from "express";
import {
  deleteUser,
  followUser,
  getUser,
  unFollowUser,
  updateUser,
  getFollowers
} from "../Controllers/UserController.js";
const router = express.Router();

router.get("/:id", getUser);
router.get("/followers/:id",getFollowers)
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unFollow", unFollowUser);

export default router;

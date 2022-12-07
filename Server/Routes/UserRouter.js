import express from "express";
import {
  deleteUser,
  followUser,
  getUser,
  unFollowUser,
  updateUser,
  getFollowers,
  getAllUsers,
} from "../Controllers/UserController.js";
import authenticate from "../middleware/Auth.js";
const router = express.Router();

router.use(authenticate);
router.get("/",getAllUsers)
router.get("/:id", getUser);
router.get("/followers/:id", getFollowers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unFollow", unFollowUser);

export default router;

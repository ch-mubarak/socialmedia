import User from "../Models/userModal.js";
import bcrypt from "bcryptjs";

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.password = undefined;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const { currentUserId, currentUserAdminStatus, password } = req.body;
    if (id === currentUserId || currentUserAdminStatus) {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      // new:true will return updated user status
      user.password = undefined;
      res.status(200).json(user);
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;
  try {
    if (id === currentUserId || currentUserAdminStatus) {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;
  if (currentUserId === id) {
    return res.status(403).json("Action forbidden");
  }
  try {
    const followUser = await User.findById(id);
    const followingUser = await User.findById(currentUserId);
    if (!followUser || !followingUser) {
      return res.status(404).json({ message: "user not found" });
    }
    if (!followUser.followers.includes(currentUserId)) {
      await followUser.updateOne({ $push: { followers: currentUserId } });
      await followingUser.updateOne({ $push: { following: id } });
      res.status(201).json({ message: "User followed successfully" });
    } else {
      res.status(403).json({ message: "User is already followed" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;
  if (id === currentUserId) {
    return res.status(403).json({ message: "Action forbidden" });
  }
  try {
    const followUser = await User.findById(id);
    const followingUser = await User.findById(currentUserId);
    if (!followUser || !followingUser) {
      return res.status(404).json({ message: "user not found" });
    }
    if (followUser.followers.includes(currentUserId)) {
      await followUser.updateOne({ $pull: { followers: currentUserId } });
      await followingUser.updateOne({ $pull: { following: id } });
      res.status(201).json({ message: "User unFollowed successfully" });
    } else {
      res.status(403).json({ message: "user is not followed by you" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

import mongoose from "mongoose";
import Post from "../Models/postModal.js";
import User from "../Models/userModal.js";

export const createNewPost = async (req, res) => {
  req.body.userId = req.user.userId;
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    await Post.populate(newPost, {
      path: "userId",
      select: { firstName: 1, lastName: 1, profilePicture: 1 },
    });
    res.status(201).json({ message: "new post created", newPost });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(401).json({ message: "Id is required" });
  }
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.user;
  if (!(id && userId)) {
    res.status(401).json({ message: "all filed are required" });
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "your not authorized" });
    }
    await post.updateOne({ $set: req.body });
    res.status(201).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.user;
  if (!(id && userId)) {
    res.status(401).json({ message: "all filed are required" });
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "your not authorized" });
    }
    await post.deleteOne();
    res.status(201).json({ message: "post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.user;
  if (!(id && userId)) {
    return res.status(401).json({ message: "all filed are required" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "your not authorized" });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(201).json({ message: "Post liked successfully" });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(201).json({ message: "Post liked unsuccessfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUserPosts = async (req, res) => {
  const userId = req.params.id;
  const LIMIT = 3;
  const skip = Number(req?.query?.skip) || 0;
  if (!userId) {
    return res.status(401).json({ message: "please provide userId" });
  }
  try {
    const posts = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "posts",
        },
      },
      {
        $project: {
          _id: 0,
          posts: 1,
        },
      },
      {
        $unwind: {
          path: "$posts",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "posts.userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $project: {
          posts: 1,
          "user._id": 1,
          "user.username": 1,
          "user.firstName": 1,
          "user.lastName": 1,
          "user.profilePicture": 1,
        },
      },
      {
        $sort: {
          "posts.createdAt": -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: LIMIT,
      },
    ]);

    res.status(200).json({ message: "Posts fetched successfully", posts });
  } catch (error) {
    console.log (error)
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getTimelinePost = async (req, res) => {
  const userId = req.params.id;
  const LIMIT = 3;
  const skip = Number(req.query.skip) || 0;
  try {
    const timelinePosts = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "userPosts",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "myPosts",
        },
      },
      {
        $project: {
          _id: 0,
          posts: {
            $concatArrays: ["$userPosts", "$myPosts"],
          },
        },
      },
      {
        $unwind: {
          path: "$posts",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "posts.userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $project: {
          posts: 1,
          "user._id": 1,
          "user.username": 1,
          "user.firstName": 1,
          "user.lastName": 1,
          "user.profilePicture": 1,
        },
      },
      {
        $sort: {
          "posts.createdAt": -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: LIMIT,
      },
    ]);

    res.status(200).json({ posts: timelinePosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

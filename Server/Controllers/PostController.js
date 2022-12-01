import mongoose from "mongoose";
import Post from "../Models/postModal.js";
import User from "../Models/userModal.js";

export const createNewPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.status(201).json({ message: "new post created" });
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
  const { userId } = req.body;
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
  const { userId } = req.body;
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
  const { userId } = req.body;
  if (!(id && userId)) {
    res.status(401).json({ message: "all filed are required" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "your not authorized" });
    }
    const post = await Post.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(201).json({ message: "Post liked successfully" });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(201).json({ message: "Post liked unsuccessfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTimelinePost = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await Post.find({ userId });
    const followingUsersPosts = await User.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "posts",
          let: { user: "$following" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    "$userId",
                    {
                      $map: {
                        input: "$$user",
                        in: { $toObjectId: "$$this" },
                      },
                    },
                  ],
                },
              },
            },
          ],
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    const sortedPosts = currentUserPosts
      .concat(followingUsersPosts[0].followingPosts)
      .sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
    res.status(200).json(sortedPosts);
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error: error });
  }
};

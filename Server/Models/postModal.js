import mongoose from "mongoose";

const postModal = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: String,
    likes: [],
    image: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postModal);
export default Post;

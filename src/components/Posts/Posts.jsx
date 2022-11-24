import React from "react";
import { postsData } from "../../Data/PostData";
import { Post } from "../Post/Post";
import "./Posts.css";
const Posts = () => {
  return (
    <div className="posts">
      {postsData.map((post) => {
        return <Post key={post.id} data={post} />;
      })}
    </div>
  );
};

export default Posts;

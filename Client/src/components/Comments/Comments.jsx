import "./Comments.css";
import { comments } from "../../Data/CommentData";
import React from "react";
import { UilCommentAdd } from "@iconscout/react-unicons";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Comment = () => {
  return (
    <div className="comments">
      <p>Comments (23)</p>
      {comments.map((comment) => {
        return (
          <div className="comment-body">
            <div className="comment-author">
              <img src={comment.profilePicture} alt="" />
            </div>
            <div className="comment-content">
              <h2>@{comment.username}</h2>
              <span>5 minutes ago</span>
              <p>{comment.text}</p>
              <div className="comment-like">
                <AiOutlineHeart /> <span>312</span>
              </div>
            </div>
          </div>
        );
      })}
      <div className="comment-box">
        <input type="text" placeholder="write your comment" />
        <UilCommentAdd />
      </div>
    </div>
  );
};

export default Comment;

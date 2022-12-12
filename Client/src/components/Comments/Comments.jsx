import "./Comments.css";
import React from "react";
import moment from "moment";
import { UilCommentAdd } from "@iconscout/react-unicons";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFetchComments from "../../hooks/useFetchComments";
import { useState } from "react";
import axios from "axios";
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

const Comment = ({ postId }) => {
  const [newComment, setNewComment] = useState("");
  const { comments, setComments, loading } = useFetchComments(postId);

  const handleNewComment = async () => {
    if (newComment.trim().length < 0) return;
    try {
      const response = await axios({
        method: "POST",
        url: `/comment/${postId}`,
        data: {
          comment: newComment,
        },
      });
      setComments([response.data.comment, ...comments]);
    } catch (err) {
      console.log(err);
    }
    setNewComment("")
  };
  return (
    <div className="comments">
      <p>Comments {comments.length > 0 ? `(${comments.length})` : ""}</p>
      {comments &&
        comments.map((comment) => {
          return (
            <div key={comment._id} className="comment-body">
              <div className="comment-author">
                <img src={`${serverPublic}/${comment.profilePicture}`} alt="" />
              </div>
              <div className="comment-content">
                <h2>@{comment.username}</h2>
                <span>{moment(comment.createdAt).fromNow()}</span>
                <p>{comment.comment}</p>
                <div className="comment-like">
                  <AiOutlineHeart /> <span>312</span>
                </div>
              </div>
            </div>
          );
        })}
      <div className="comment-box">
        <input
          value={newComment}
          type="text"
          placeholder="write your comment"
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div onClick={handleNewComment}>
          <UilCommentAdd />
        </div>
      </div>
    </div>
  );
};

export default Comment;

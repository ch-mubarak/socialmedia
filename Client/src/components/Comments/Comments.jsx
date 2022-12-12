import "./Comments.css";
import React from "react";
import moment from "moment";
import { UilCommentAdd } from "@iconscout/react-unicons";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFetchComments from "../../hooks/useFetchComments";
import { useState } from "react";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { useSelector } from "react-redux";
import {
  deleteComment,
  likeComment,
  postComment,
} from "../../api/CommentRequest";
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
const override = {
  display: "block",
  margin: "0 auto",
};

const Comment = ({ postId }) => {
  const [newComment, setNewComment] = useState("");
  const [loadingLike, setLoadingLike] = useState(false);
  const userId = useSelector((state) => state.authReducer.authData.user._id);
  const { comments, setComments, loading, setLoading } =
    useFetchComments(postId);

  const handleNewComment = async () => {
    if (newComment.trim().length < 0) return;
    setLoading(true);
    try {
      const response = await postComment(postId, newComment);
      setComments([response.data.comment, ...comments]);
    } catch (err) {
      console.log(err);
    }
    setNewComment("");
    setLoading(false);
  };

  const handleDeleteComment = async (commentId) => {
    setLoading(true);
    try {
      await deleteComment(commentId);
      setComments([...comments.filter((comment) => comment._id !== commentId)]);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleLikeComment = async (commentId) => {
    try {
      setLoadingLike(true);
      await likeComment(commentId);
      setComments((preComments) => [
        ...preComments.map((comment) => {
          if (comment._id === commentId) {
            return { ...comment, likes: [...comment.likes, userId] };
          }
          return comment;
        }),
      ]);
    } catch (err) {
      console.log(err);
    }
    setLoadingLike(false);
  };
  return (
    <div className="comments">
      <p>Comments {comments.length > 0 ? `(${comments.length})` : ""}</p>
      <FadeLoader color="orange" cssOverride={override} loading={loading} />

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
                  <div onClick={() => handleLikeComment(comment._id)}>
                    {comment.likes.includes(userId) ? (
                      <AiFillHeart />
                    ) : (
                      <AiOutlineHeart />
                    )}{" "}
                    <span>{comment?.likes.length}</span>
                  </div>
                  {comment.userId === userId && (
                    <p onClick={() => handleDeleteComment(comment._id)}>
                      Delete
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      <div className="comment-box">
        <input
          type="text"
          value={newComment}
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

import React, { useState } from "react";
import "./Post.css";
import Like from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import Share from "../../img/share.png";
import Comment from "../../img/comment.png";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../actions/PostAction";
import { Link } from "react-router-dom";
const Post = React.forwardRef(({ data }, ref) => {
  const serverStatic = process.env.REACT_APP_STATIC_FOLDER;
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.posts.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(data.posts.likes.length);
  const handlePostLike = (id) => {
    dispatch(likePost(id));
    setLiked((preValue) => !preValue);
    setLikeCount((oldCount) => {
      if (liked) {
        return oldCount - 1;
      } else {
        return oldCount + 1;
      }
    });
  };
  return (
    <div ref={ref} className="post">
      <div className="postAuthor">
        <img
          src={
            data.user?.profilePicture
              ? `${serverPublic}/${data.user.profilePicture}`
              : `${serverStatic}/profile.jpg`
          }
          alt=""
        />
        <span>
          <Link to={`/profile/${data.user._id}`}>
            {data.user?.firstName} {data.user?.lastName}
          </Link>
        </span>
      </div>
      <img src="" alt="" />
      {data.posts.image && (
        <img
          src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${data.posts.image}`}
          alt=""
        />
      )}
      <div className="postReact">
        <img
          onClick={() => handlePostLike(data.posts._id)}
          src={liked ? Like : NotLike}
          alt=""
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span style={{ color: "var(--grey)", fontSize: "14px" }}>
        {likeCount} Likes
      </span>
      <div className="detail">
        <span> {data.posts.description}</span>
      </div>
    </div>
  );
});

export default Post;

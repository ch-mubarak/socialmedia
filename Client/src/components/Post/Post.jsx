import React, { useState } from "react";
import "./Post.css";
import Like from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import Share from "../../img/share.png";
import Comment from "../../img/comment.png";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../actions/PostAction";
import { Link } from "react-router-dom";
import { UilEllipsisH } from "@iconscout/react-unicons";
import Actions from "../Actions/Actions";
const serverStatic = process.env.REACT_APP_STATIC_FOLDER;
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;


const Post = React.forwardRef(({ data }, ref) => {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.post.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(data.post.likes.length);
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
        <div className="more-options">
          <div onClick={() => setShowOptions((pre) => !pre)}>
            <UilEllipsisH />
          </div>
          {showOptions && (
            <Actions userId={data.user._id} postId={data.post._id} />
          )}
        </div>
      </div>
      <img src="" alt="" />
      {data.post?.image && (
        <img
          src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${data.post.image}`}
          alt=""
        />
      )}
      <div className="postReact">
        <img
          onClick={() => handlePostLike(data.post._id)}
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
        <span> {data.post.description}</span>
      </div>
    </div>
  );
});

export default Post;

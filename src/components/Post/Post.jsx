import React from "react";
import "./Post.css";
import Like from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import Share from "../../img/share.png";
import Comment from "../../img/comment.png";

export const Post = ({ data }) => {
  return (
    <div className="post">
      <img src={data.img} alt="" />
      <div className="postReact">
        <img src={data.liked ? Like : NotLike} alt="" />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span>{data.likes} Likes</span>
      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

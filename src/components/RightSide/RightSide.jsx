import React from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Notification from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../TrendCard/TrendCard";

export const RightSide = () => {
  return (
    <div className="rightSide">
      <div className="navIcons">
        <img src={Home} alt="Home" />
        <UilSetting />
        <img src={Notification} alt="notification" />
        <img src={Comment} alt="comment" />
      </div>
      <TrendCard />
      <button className="button r-button">Share</button>
    </div>
  );
};

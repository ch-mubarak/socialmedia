import React from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Notification from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../TrendCard/TrendCard";
import { useState } from "react";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";

export const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="rightSide">
      <div className="navIcons">
        <Link to="/home">
          <img src={Home} alt="Home" />
        </Link>
        <UilSetting />
        <img src={Notification} alt="notification" />
        <img src={Comment} alt="comment" />
      </div>
      <TrendCard />
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal opened={modalOpened} onClose={() => setModalOpened(false)} />
    </div>
  );
};

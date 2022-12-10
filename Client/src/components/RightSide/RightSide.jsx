import React from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import bell from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../TrendCard/TrendCard";
import { useState } from "react";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";
import Notifications from "../Notifications/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNotifications } from "../../actions/UserAction";

export const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.userReducer);
  
  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  console.log("right side")
  return (
    <div className="rightSide">
      <div className="navIcons">
        <Link to="/home">
          <img src={Home} alt="Home" />
        </Link>
        <UilSetting />
        <div className="notification">
          <img
            src={bell}
            alt="notification"
            onClick={() => setShowNotification((pre) => !pre)}
          />
          {notifications.length > 0 && <span>{notifications.length}</span>}
          {showNotification && notifications.length > 0 && (
            <Notifications notifications={notifications} />
          )}
        </div>
        <div>
          <img src={Comment} alt="comment" />
        </div>
      </div>
      <TrendCard />
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal opened={modalOpened} onClose={() => setModalOpened(false)} />
    </div>
  );
};

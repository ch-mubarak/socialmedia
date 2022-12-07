import React from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { logout } from "../../actions/AuthAction";

const InfoCard = () => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  const { userDetail } = useSelector((state) => state.userReducer);
  let isUser = false;
  const params = useParams();
  if (params.id === user._id) {
    isUser = true;
  }
  console.log("info card");

  const handleClose = () => {
    setModalOpened(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="infoCard">
      <div className="infoHead">
        <h4>{isUser ? "Your info" : "User info"}</h4>
        {isUser && (
          <div>
            <UilPen
              width="2rem"
              height="1.5rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              handleClose={handleClose}
              opened={modalOpened}
              onClose={() => setModalOpened(false)}
            />
          </div>
        )}
      </div>
      <div className="info">
        <span>
          <b>Status: </b>
        </span>
        <span>{isUser ? user?.relationship : userDetail?.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in: </b>
        </span>
        <span>{isUser ? user?.livesIn : userDetail?.livesIn}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at: </b>
        </span>
        <span>{isUser ? user?.worksAt : userDetail?.worksAt}</span>
      </div>
      {isUser && (
        <button onClick={handleLogout} className="button lg-button">
          Logout
        </button>
      )}
    </div>
  );
};

export default InfoCard;

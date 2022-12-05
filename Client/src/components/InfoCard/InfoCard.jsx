import React, { useEffect } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../actions/UserAction";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  const { details } = useSelector((state) => state.userReducer);
  const params = useParams();
  const dispatch = useDispatch();
  const currentUserDetails = params.id ? details : user;
  let currentUserId = params.id;
  let isUser = false;
  if (currentUserId === user._id || !params.id) {
    isUser = true;
  }
  const handleClose = () => {
    setModalOpened(false);
  };
  useEffect(() => {
    if (params.id) {
      const userId = params.id;
      dispatch(getUserDetails(userId));
    }
  }, [params.id, dispatch]);

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
        <span>{currentUserDetails?.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in: </b>
        </span>
        <span>{currentUserDetails?.livesIn}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at: </b>
        </span>
        <span>{currentUserDetails?.worksAt}</span>
      </div>
      {isUser && <button className="button lg-button">Logout</button>}
    </div>
  );
};

export default InfoCard;

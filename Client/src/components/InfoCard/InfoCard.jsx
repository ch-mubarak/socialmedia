import React from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useState } from "react";
import { useSelector } from "react-redux";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const {user}=useSelector(state=>state.authReducer.authData)
  return (
    <div className="infoCard">
      <div className="infoHead">
        <h4>Your info</h4>
        <div>
          <UilPen
            width="2rem"
            height="1.5rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
          />
        </div>
      </div>
      <div className="info">
        <span>
          <b>Status: </b>
        </span>
        <span>{user.status}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in: </b>
        </span>
        <span>{user.city}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at: </b>
        </span>
        <span>{user.worksAt}</span>
      </div>
      <button className="button lg-button">Logout</button>
    </div>
  );
};

export default InfoCard;

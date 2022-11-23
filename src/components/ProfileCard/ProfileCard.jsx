import React from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import ProfileImage from "../../img/profileImg.jpg";

const ProfileCard = () => {
  return (
    <div className="profileCard">
      <div className="profileImages">
        <img src={Cover} alt="" />
        <img src={ProfileImage} alt="" />
      </div>

      <div className="profileName">
        <span>Zendaya</span>
        <span>React Developer</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>60</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>320</span>
            <span>Followers</span>
          </div>
        </div>
        <hr />
      </div>
      <span>My Profile</span>
    </div>
  );
};

export default ProfileCard;

import React from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const profilePage = false;
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="profileCard">
      <div className="profileImages">
        <img
          src={
            user.coverPicture
              ? `${serverPublic}/${user.coverPicture}`
              : `${serverPublic}/cover.jpg`
          }
          alt=""
        />
        <img
          src={
            user.profilePicture
              ? `${serverPublic}/${user.profilePicture}`
              : `${serverPublic}/profile.jpg`
          }
          alt=""
        />
      </div>

      <div className="profileName">
        <span>{user.firstName + " " + user.lastName}</span>
        <span>{user.about}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          {profilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>3</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {!profilePage && <span>My Profile</span>}
    </div>
  );
};

export default ProfileCard;

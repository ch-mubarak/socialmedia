import React, { useEffect } from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { userPosts } = useSelector((state) => state.postReducer);
  const params = useParams();
  
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
        <span>
          {user.firstName} {user.lastName}
        </span>
        <span>{user.about ? user.about : "Write about yourself"}</span>
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

          {location === "profile" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{userPosts?.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "home" && (
        <span>
          <Link to="/profile">My Profile</Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;

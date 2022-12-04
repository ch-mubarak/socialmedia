import React, { useEffect } from "react";
import "./ProfileCard.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserDetails } from "../../actions/UserAction";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { userPosts } = useSelector((state) => state.postReducer);
  const currentUserPosts = useSelector((state) => state.userReducer.posts);
  const userDetails = useSelector((state) => state.userReducer.details);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.id) {
      const userId = params.id;
      dispatch(getUserDetails(userId));
    }
  }, [dispatch, params.id]);

  const currentPosts = params.id ? currentUserPosts : userPosts;
  const currentUser = params.id ? userDetails : user;
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="profileCard">
      <div className="profileImages">
        <img
          src={
            currentUser?.coverPicture
              ? `${serverPublic}/${currentUser.coverPicture}`
              : `${serverPublic}/cover.jpg`
          }
          alt=""
        />
        <img
          src={
            currentUser?.profilePicture
              ? `${serverPublic}/${currentUser.profilePicture}`
              : `${serverPublic}/profile.jpg`
          }
          alt=""
        />
      </div>

      <div className="profileName">
        <span>
          {currentUser?.firstName} {currentUser?.lastName}
        </span>
        {!params.id && (
          <span>{user?.about ? user.about : "Write about yourself"}</span>
        )}
        {params.id && <span>{userDetails?.about}</span>}
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{currentUser?.following?.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{currentUser?.followers?.length}</span>
            <span>Followers</span>
          </div>

          {location === "profile" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{currentPosts?.length}</span>
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

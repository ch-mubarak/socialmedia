import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, unFollowUser } from "../../actions/FollowAction";

const User = ({ user }) => {
  const dispatch = useDispatch();
  const serverStatic = process.env.REACT_APP_STATIC_FOLDER;
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const myFollowings = useSelector(
    (state) => state.authReducer.authData.user.following
  );
  const handleFollow = (id) => {
    dispatch(followUser(id));
  };
  const handleUnFollow = (id) => {
    dispatch(unFollowUser(id));
  };
  return (
    <div className="followers">
      <div>
        <img
          src={
            user?.profilePicture
              ? `${serverPublic}/${user.profilePicture}`
              : `${serverStatic}/profile.jpg`
          }
          alt=""
          className="followerImg"
        />
        <div className="name">
          <span>
            <Link to={`/profile/${user._id}`}>
              {user.firstName} {user.lastName}
            </Link>
          </span>
          <span>
            <Link to={`/profile/${user._id}`}>@{user.username}</Link>
          </span>
        </div>
      </div>

      {myFollowings.includes(user._id) ? (
        <button
          className="button unfollow-button"
          onClick={() => handleUnFollow(user._id)}
        >
          Unfollow
        </button>
      ) : (
        <button
          className="button fc-button"
          onClick={() => handleFollow(user._id)}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default User;

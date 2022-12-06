import "./FollowersCard.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "../../actions/FollowAction";
import { Link } from "react-router-dom";

const FollowersCard = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const serverStatic = process.env.REACT_APP_STATIC_FOLDER;
  const dispatch = useDispatch();
  const { followers } = useSelector((state) => state.followReducer);
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    dispatch(getFollowers(user._id));
  }, [dispatch, user._id]);
  return (
    <div className="followersCard">
      <h3>Who is following you</h3>
      {followers.map((follower) => {
        return (
          <div key={follower._id} className="followers">
            <div>
              <img
                src={
                  follower?.profilePicture
                    ? `${serverPublic}/${follower.profilePicture}`
                    : `${serverStatic}/profile.jpg`
                }
                alt=""
                className="followerImg"
              />
              <div className="name">
                <span>
                  <Link to={`/profile/${follower._id}`}>
                    {follower.firstName} {follower.lastName}
                  </Link>
                </span>
                <span>
                  <Link to={`/profile/${follower._id}`}>
                    @{follower.username}
                  </Link>
                </span>
              </div>
            </div>
            <button className="button fc-button">Follow</button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;

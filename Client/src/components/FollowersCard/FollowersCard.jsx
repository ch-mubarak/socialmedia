import "./FollowersCard.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "../../actions/FollowAction";

const FollowersCard = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
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
          <div key={follower.id} className="followers">
            <div>
              <img
                src={
                  follower?.profilePicture
                    ? `${serverPublic}/${follower.profilePicture}`
                    : `${serverPublic}/profile.jpg`
                }
                alt=""
                className="followerImg"
              />
              <div className="name">
                <span>{follower.firstName} {follower.lastName}</span>
                <span>@{follower.username}</span>
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

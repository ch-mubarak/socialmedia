import "./FollowersCard.css";
import React from "react";
import { followers } from "../../Data/FollowersData";

const FollowersCard = () => {
  return (
    <div className="followersCard">
      <h3>Who is following you</h3>
      {followers.map((follower) => {
        return (
          <div key={follower.id} className="followers">
            <div>
              <img src={follower.img} alt="" className="followerImg" />
              <div className="name">
                <span>{follower.name}</span>
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

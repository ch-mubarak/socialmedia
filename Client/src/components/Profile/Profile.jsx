import React from "react";
import "./Profile.css"
import LogoSearch from "../LogoSearch/LogoSearch";
import ProfileCard from "../ProfileCard/ProfileCard";
import FollowersCard from "../FollowersCard/FollowersCard"

const Profile = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard location={"home"} />
      <FollowersCard />
    </div>
  );
};

export default Profile;

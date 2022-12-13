import React from "react";
import "./Profile.css"
import LogoSearch from "../LogoSearch/LogoSearch";
import ProfileCard from "../ProfileCard/ProfileCard";

const Profile = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard location={"home"} />
    </div>
  );
};

export default Profile;

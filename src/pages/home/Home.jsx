import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import Profile from "../../components/Profile/Profile";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <Profile />
      <PostSide />
      <div className="rightSide">Right</div>
    </div>
  );
};

export default Home;

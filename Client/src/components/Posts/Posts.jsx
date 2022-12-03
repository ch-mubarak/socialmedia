import "./Posts.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimeLine, getUserPosts } from "../../actions/PostAction";
import { Post } from "../Post/Post";
import FadeLoader from "react-spinners/FadeLoader";
import { useLocation } from "react-router-dom";

const Posts = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, userPosts, loading } = useSelector(
    (state) => state.postReducer
  );
  const override = {
    display: "block",
    margin: "0 auto",
  };
  useEffect(() => {
    if (location.pathname === "/profile") {
      const id = user._id;
      dispatch(getUserPosts(id));
    }
  }, [dispatch, user._id, location]);
  useEffect(() => {
    if (location.pathname === "/home") {
      const id = user._id;
      dispatch(getTimeLine(id));
    }
  }, [dispatch, user._id, location]);
  return (
    <div className="posts">
      {!loading &&
        location.pathname === "/home" &&
        posts.map((post) => {
          return <Post key={post._id} data={post} />;
        })}
      {!loading &&
        location.pathname === "/profile" &&
        userPosts.map((post) => {
          return <Post key={post._id} data={post} />;
        })}

      <FadeLoader color="orange" cssOverride={override} loading={loading} />
    </div>
  );
};

export default Posts;

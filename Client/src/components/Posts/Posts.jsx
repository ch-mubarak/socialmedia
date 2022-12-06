import "./Posts.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimeLine, getUserPosts } from "../../actions/PostAction";
import { Post } from "../Post/Post";
import FadeLoader from "react-spinners/FadeLoader";
import { useLocation, useParams } from "react-router-dom";

const Posts = () => {
  console.log("posts")
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { timeline, userPosts, loading } = useSelector(
    (state) => state.postReducer
  );
  const override = {
    display: "block",
    margin: "0 auto",
  };
  useEffect(() => {
    if (location.pathname === "/home") {
      const id = user._id;
      dispatch(getTimeLine(id));
    } else {
      const id = params?.id;
      dispatch(getUserPosts(id));
    }
  }, [dispatch, location, user._id, params.id]);

  return (
    <div className="posts">
      {!loading &&
        location.pathname === "/home" &&
        timeline &&
        timeline.map((post) => {
          return <Post key={post._id} data={post} />;
        })}
      {!loading &&
        params.id &&
        userPosts &&
        userPosts.map((post) => {
          return <Post key={post._id} data={post} />;
        })}

      <FadeLoader color="orange" cssOverride={override} loading={loading} />
    </div>
  );
};

export default Posts;

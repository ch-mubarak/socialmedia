import "./Posts.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, getTimeLine } from "../../actions/PostAction";
import { Post } from "../Post/Post";
import FadeLoader from "react-spinners/FadeLoader";
import { useLocation, useParams } from "react-router-dom";
import { getUserPosts } from "../../actions/UserAction";

const Posts = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, myPosts, loading } = useSelector((state) => state.postReducer);
  const userPosts = useSelector((state) => state.userReducer.posts);
  const userPostsLoading = useSelector((state) => state.userReducer.loading);
  const override = {
    display: "block",
    margin: "0 auto",
  };
  useEffect(() => {
    if (location.pathname === "/profile") {
      const id = user._id;
      dispatch(getMyPosts(id));
    } else if (location.pathname === `/profile/${params.id}`) {
      const id = params.id;
      dispatch(getUserPosts(id));
    }
  }, [dispatch, location, user._id, params.id]);
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
        myPosts &&
        myPosts.map((post) => {
          return <Post key={post._id} data={post} />;
        })}
      {!userPostsLoading &&
        location.pathname === `/profile/${params.id}` &&
        userPosts.map((post) => {
          return <Post key={post._id} data={post} />;
        })}

      <FadeLoader color="orange" cssOverride={override} loading={loading} />
    </div>
  );
};

export default Posts;

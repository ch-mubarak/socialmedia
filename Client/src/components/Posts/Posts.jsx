import "./Posts.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimeLine } from "../../actions/PostAction";
import { Post } from "../Post/Post";
import FadeLoader from "react-spinners/FadeLoader";

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, loading } = useSelector((state) => state.postReducer);
  const override = {
    display: "block",
    margin: "0 auto",
  };
  useEffect(() => {
    const id = user._id;
    dispatch(getTimeLine(id));
  }, [dispatch, user._id]);
  return (
    <div className="posts">
      {!loading && posts.map((post) => {
        return <Post key={post._id} data={post} />;
      })}
      <FadeLoader color="orange" cssOverride={override} loading={loading} />
    </div>
  );
};

export default Posts;

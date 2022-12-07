import * as PostApi from "../api/PostRequest";

export const createPost = (data) => async (dispatch) => {
  dispatch({ type: "POST_PENDING" });
  try {
    const response = await PostApi.createPost(data);
    dispatch({ type: "POST_SUCCESS", payload: response.data.newPost });
  } catch (err) {
    if (err.response?.data?.expired) {
      return dispatch({ type: "LOGOUT" });
    }
    dispatch({ type: "POST_FAIL" });
    console.log(err);
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  dispatch({ type: "FETCHING_PENDING" });
  try {
    const response = await PostApi.getUserPosts(id);
    dispatch({ type: "FETCHING_USER_POSTS", payload: response.data.posts });
  } catch (error) {
    if (err.response?.data?.expired) {
      return dispatch({ type: "LOGOUT" });
    }
    dispatch({ type: "FETCHING_FAIL" });
  }
};

export const getTimeLine = (id) => async (dispatch) => {
  dispatch({ type: "FETCHING_PENDING" });
  try {
    const response = await PostApi.getTimeLine(id);
    dispatch({ type: "FETCHING_SUCCESS", payload: response.data.posts });
  } catch (err) {
    if (err.response?.data?.expired) {
      return dispatch({ type: "LOGOUT" });
    }
    dispatch({ type: "FETCHING_FAIL" });
    console.log(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  dispatch({ type: "LIKE_PENDING" });
  try {
    await PostApi.likePost(id);
    dispatch({ type: "LIKE_SUCCESS" });
  } catch (err) {
    if (err.response?.data?.expired) {
      return dispatch({ type: "LOGOUT" });
    }
    dispatch({ type: "LIKE_FAILED" });
    console.log(err);
  }
};

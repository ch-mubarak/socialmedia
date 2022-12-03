import * as PostApi from "../api/PostRequest";

export const createPost = (data) => async (dispatch) => {
  dispatch({ type: "POST_PENDING" });
  try {
    const response = await PostApi.createPost(data);
    dispatch({ type: "POST_SUCCESS", payload: response.data.newPost });
  } catch (error) {
    dispatch({ type: "POST_FAIL" });
    console.log(error);
  }
};

export const getTimeLine = (id) => async (dispatch) => {
  dispatch({ type: "FETCHING_PENDING" });
  try {
    const response = await PostApi.getTimeLine(id);
    dispatch({ type: "FETCHING_SUCCESS", payload: response.data.posts });
  } catch (err) {
    dispatch({ type: "FETCHING_FAIL" });
    console.log(err);
  }
};

export const likePost = (id, data) => async (dispatch) => {
  dispatch({ type: "LIKE_PENDING" });
  try {
    await PostApi.likePost(id, data);
    dispatch({ type: "LIKE_SUCCESS" });
  } catch (error) {
    dispatch({ type: "LIKE_FAILED" });
    console.log(error);
  }
};

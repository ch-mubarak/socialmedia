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

export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: "POST_PENDING" });
  try {
    console.log("deleting in action")
    const response = await PostApi.deletePost(id);
    dispatch({ type: "POST_DELETE_SUCCESS", payload: response.data.id });
  } catch (err) {
    if (err.response?.data?.expired) {
      return dispatch({ type: "LOGOUT" });
    }
    dispatch({ type: "POST_FAIL" });
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
    dispatch({ type: "LIKE_FAIL" });
    console.log(err);
  }
};

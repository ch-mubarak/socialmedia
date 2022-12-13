import * as PostApi from "../api/PostRequest";

export const createPost = (data) => async (dispatch) => {
  dispatch({ type: "POST_PENDING" });
  try {
    const response = await PostApi.createPost(data);
    dispatch({ type: "POST_SUCCESS", payload: response.data.newPost });
    dispatch({ type: "UPDATE_POST_COUNT", payload: 1 });
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
    const response = await PostApi.deletePost(id);
    dispatch({ type: "POST_DELETE_SUCCESS", payload: response.data.id });
    dispatch({ type: "UPDATE_POST_COUNT", payload: -1 });
  } catch (err) {
    if (err.response?.data?.expired) {
      return dispatch({ type: "LOGOUT" });
    }
    dispatch({ type: "POST_FAIL" });
    console.log(err);
  }
};

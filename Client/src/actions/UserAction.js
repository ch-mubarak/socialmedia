import * as UseApi from "../api/UserRequest";

export const getUserPosts = (id) => async (dispatch) => {
  dispatch({ type: "USER_POSTS_PENDING" });
  try {
    const response = await UseApi.getUserPosts(id);
    dispatch({ type: "USER_POSTS_SUCCESS", payload: response.data.posts });
  } catch (err) {
    dispatch({ type: "USER_POSTS_FAIL" });
    console.log(err);
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  dispatch({ type: "USER_DATA_PENDING" });
  try {
    const response = await UseApi.getUserDetails(id);
    dispatch({ type: "USER_DATA_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "USER_DATA_FAIL" });
    console.log(error);
  }
};

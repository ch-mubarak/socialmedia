import * as FollowersApi from "../api/FollowRequest";

export const followUser = (id) => async (dispatch) => {
  dispatch({ type: "FOLLOW_PENDING" });
  try {
    const response = await FollowersApi.followUser(id);
    dispatch({ type: "FOLLOW_SUCCESS", payload: response.data.id });
  } catch (error) {
    if (error.response?.data?.expired) {
      dispatch({ type: "LOGOUT" });
    }
    dispatch({ type: "FOLLOW_FAIL" });
    console.log(error);
  }
};
export const unFollowUser = (id) => async (dispatch) => {
  dispatch({ type: "FOLLOW_PENDING" });
  try {
    const response = await FollowersApi.unFollowUser(id);
    dispatch({ type: "UN_FOLLOW_SUCCESS", payload: response.data.id });
  } catch (error) {
    if (error.response?.data?.expired) {
      return dispatch({ type: "LOGOUT" });
    }
    dispatch({ type: "FOLLOW_FAIL" });
    console.log(error);
  }
};

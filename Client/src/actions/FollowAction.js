import * as FollowersApi from "../api/FollowRequest";

export const getFollowers = (id) => async (dispatch) => {
  dispatch({ type: "FETCHING_FOLLOWERS_PENDING" });
  try {
    const response = await FollowersApi.getFollowers(id);
    dispatch({ type: "FETCHING_FOLLOWERS_SUCCESS", payload: response.data.followers });
  } catch (error) {
    dispatch({ type: "FETCHING_FOLLOWERS_FAIL" });
    console.log(error);
  }
};

import * as UserApi from "../api/UserRequest";


export const getUserDetails = (id) => async (dispatch) => {
  dispatch({ type: "USER_DATA_PENDING" });
  try {
    const response = await UserApi.getUserDetails(id);
    dispatch({ type: "USER_DATA_SUCCESS", payload: response.data });
  } catch (err) {
    if (err.response?.data?.expired) {
      return dispatch({ type: "LOGOUT" });
    }
    dispatch({ type: "USER_DATA_FAIL" });
    console.log(err);
  }
};

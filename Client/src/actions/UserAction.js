import * as UserApi from "../api/UserRequest";


export const getUserDetails = (id) => async (dispatch) => {
  dispatch({ type: "USER_DATA_PENDING" });
  try {
    const response = await UserApi.getUserDetails(id);
    dispatch({ type: "USER_DATA_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "USER_DATA_FAIL" });
    console.log(error);
  }
};

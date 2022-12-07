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

export const updateProfile = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATE_PENDING" });
  try {
    const { data } = await UserApi.updateProfile(id, formData);
    dispatch({ type: "UPDATE_SUCCESS", payload: data });
  } catch (error) {
    if (error.response?.data?.expired) {
      dispatch({ type: "LOGOUT" });
    }
    dispatch({ type: "UPDATE_FAIL" });
    console.log(error);
  }
};

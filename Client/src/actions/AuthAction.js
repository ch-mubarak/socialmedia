import * as AuthApi from "../api/AuthRequest";

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL" });
    console.log(error);
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL" });
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

import * as uploadApi from "../api/UploadRequest";
export const uploadImage = (data) => async (dispatch) => {
  try {
    await uploadApi.uploadImage(data);
  } catch (err) {
    if (err.response?.data?.expired) {
      return dispatch({ type: "LOGOUT" });
    }
    console.log(err);
  }
};

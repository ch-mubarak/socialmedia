import * as PostApi from "../api/PostRequest";

export const createPost = (data) => async (dispatch) => {
  dispatch({ type: "POST_PENDING" });
  try {
    const { newPost } = await PostApi.createPost(data);
    dispatch({ type: "POST_SUCCESS", payload: newPost });
  } catch (error) {
    dispatch({ type: "POST_FAIL" });
    console.log(error);
  }
};

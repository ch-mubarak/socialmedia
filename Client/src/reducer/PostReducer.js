const initialState = {
  posts: [],
  uploading: false,
  error: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_PENDING":
      return {
        ...state,
        uploading: true,
        error: false,
      };
    case "POST_SUCCESS":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        uploading: false,
        error: false,
      };
    case "POST_FAIL":
      return {
        ...state,
        uploading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default postReducer;

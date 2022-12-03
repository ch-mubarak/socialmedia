const initialState = {
  posts: [],
  loading: false,
  error: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_PENDING":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "POST_SUCCESS":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: false,
      };
    case "POST_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "FETCHING_SUCCESS":
      return {
        ...state,
        posts: [...action.payload],
        loading: false,
        error: false,
      };

    case "FETCHING_PENDING":
      return {
        ...state,
        error: false,
        loading: true,
      };
    default:
      return state;
  }
};

export default postReducer;

const initialState = {
  timeline: [],
  userPosts: [],
  loading: false,
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
      console.log(action.payload)
      return {
        ...state,
        timeline: [action.payload, ...state.timeline],
        uploading: false,
        error: false,
      };
    case "POST_FAIL":
      return {
        ...state,
        uploading: false,
        error: true,
      };
    case "FETCHING_SUCCESS":
      return {
        ...state,
        timeline: [...action.payload],
        loading: false,
        error: false,
      };
    case "FETCHING_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "FETCHING_PENDING":
      return {
        ...state,
        error: false,
        loading: true,
      };
    case "FETCHING_USER_POSTS":
      return {
        ...state,
        userPosts: [...action.payload],
        error: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;

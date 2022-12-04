const initialState = {
  posts: [],
  myPosts: [],
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
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        myPosts: [action.payload, ...state.myPosts],
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
        posts: [...action.payload],
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
    case "FETCHING_MY_POSTS_SUCCESS":
      return {
        ...state,
        myPosts: [...action.payload],
        error: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;

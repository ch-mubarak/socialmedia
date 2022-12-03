const initialState = {
  posts: [],
  details: null,
  error: false,
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_POSTS_PENDING":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "USER_POSTS_SUCCESS":
      return {
        ...state,
        posts: [...action.payload],
        loading: false,
        error: false,
      };
    case "USER_POSTS_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "USER_DATA_PENDING":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "USER_DATA_SUCCESS":
      return {
        ...state,
        details: { ...action.payload },
        loading: false,
        error: false,
      };
    case "USER_DATA_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

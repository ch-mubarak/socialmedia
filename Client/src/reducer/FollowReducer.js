const initialState = {
  followers: [],
  following: [],
  error: false,
  loading: false,
};

const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FOLLOWERS_PENDING":
      return {
        ...state,
        loading: true,
        error: false,
      };

    case "FOLLOWERS_SUCCESS":
      return {
        ...state,
        followers: [...action.payload],
        loading: false,
        error: false,
      };

    case "FOLLOWERS_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default followReducer;

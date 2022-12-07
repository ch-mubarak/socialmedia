const initialState = {
  authData: null,
  loading: false,
  error: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };

    case "AUTH_SUCCESS":
      localStorage.setItem("token", JSON.stringify(action?.payload.token));
      return {
        ...state,
        authData: action.payload,
        loading: false,
        error: false,
      };
    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };

    case "UPDATE_PENDING":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "UPDATE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        authData: action.payload,
      };

    case "UPDATE_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        authData: null,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
};

export default authReducer;

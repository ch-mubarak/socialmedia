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
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authData: action.payload,
        loading: false,
        error: false,
      };
    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default authReducer;
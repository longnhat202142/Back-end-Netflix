const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    // TRẠNG THÁI CẬP NHẬT
    case "UPLOAD_USER_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPLOAD_USER_SUCCESS":
      console.log(action.payload);
      return {
        user: { ...state.user, info: action.payload },
        isFetching: false,
        error: false,
      };
    case "UPLOAD_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;

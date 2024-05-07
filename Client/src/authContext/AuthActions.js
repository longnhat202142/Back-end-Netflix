export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});

//logout
export const logout = () => ({
  type: "LOGOUT",
});

export const createUserFailure = () => ({
  type: "upload_USER_FAILURE",
});

//Cập nhật người dùng
export const uploadUserStart = () => ({
  type: "UPLOAD_USER_START",
});

export const uploadUserSuccess = (user) => ({
  type: "UPLOAD_USER_SUCCESS",
  payload: user,
});

export const uploadUserFailure = () => ({
  type: "UPLOAD_USER_FAILURE",
});

// Lấy mật khẩu
export const getPassStart = () => ({
  type: "GET_PASS_START",
});

export const getPassSuccess = (user) => ({
  type: "GET_PASS_SUCCESS",
  payload: user,
});

export const getPassFailure = () => ({
  type: "GET_PASS_FAILURE",
});

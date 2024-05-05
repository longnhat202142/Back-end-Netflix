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

//Cập nhật phim
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

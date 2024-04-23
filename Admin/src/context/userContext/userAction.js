export const getUserStart = () => ({
  type: "GET_USER_START",
});

export const getUserSuccess = (user) => ({
  type: "GET_USER_SUCCESS",
  payload: user,
});

export const getUserFailure = () => ({
  type: "GET_USER_FAILURE",
});

// Trạng thái xoá
export const deleteUserStart = () => ({
  type: "DELETE_USER_START",
});

export const deleteUserSuccess = (id) => ({
  type: "DELETE_USER_SUCCESS",
  payload: id,
});

export const deleteUserFailure = () => ({
  type: "DELETE_USER_FAILURE",
});

// Trạng thái thêm phim
export const createUserStart = () => ({
  type: "CREATE_USER_START",
});

export const createUserSuccess = (user) => ({
  type: "CREATE_USER_SUCCESS",
  payload: user,
});

export const createUserFailure = () => ({
  type: "UPLOAD_USER_FAILURE",
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

// Xoá nhiều
export const deleteManyStart = () => ({
  type: "DELETE_MANY_START",
});

export const deleteManySuccess = (ids) => ({
  type: "DELETE_MANY_SUCCESS",
  payload: ids,
});

export const deleteManyFailure = () => ({
  type: "DELETE_MANY_FAILURE",
});

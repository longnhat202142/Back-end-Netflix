// Trạng thái xem
export const getListsStart = () => ({
  type: "GET_LISTS_START",
});

export const getListsSuccess = (lists) => ({
  type: "GET_LISTS_SUCCESS",
  payload: lists,
});

export const getListsFailure = () => ({
  type: "GET_LISTS_FAILURE",
});

// Upload lại trang
export const getListStart = () => ({
  type: "GET_LITS_START",
});

export const getListSuccess = (lists) => ({
  type: "GET_LIST_SUCCESS",
  payload: lists,
});

export const getListFailure = () => ({
  type: "GET_LIST_FAILURE",
});

// Trạng thái xoá
export const deleteListStart = () => ({
  type: "DELETE_LIST_START",
});

export const deleteListSuccess = (id) => ({
  type: "DELETE_LIST_SUCCESS",
  payload: id,
});

export const deleteListFailure = () => ({
  type: "DELETE_LIST_FAILURE",
});

// Trạng thái thêm danh sach
export const createListStart = () => ({
  type: "CREATE_LIST_START",
});

export const createListSuccess = (list) => ({
  type: "CREATE_LIST_SUCCESS",
  payload: list,
});

export const createListFailure = () => ({
  type: "CREATE_LIST_FAILURE",
});

//Cập nhật phim
export const uploadListStart = () => ({
  type: "UPLOAD_LIST_START",
});

export const uploadListSuccess = (lists) => ({
  type: "UPLOAD_LIST_SUCCESS",
  payload: lists,
});

export const uploadListFailure = () => ({
  type: "UPLOAD_LIST_FAILURE",
});

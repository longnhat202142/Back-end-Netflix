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

// // Trạng thái thêm phim
// export const createMoviesStart = () => ({
//   type: "CREATE_MOVIE_START",
// });

// export const createMoviesSuccess = (movie) => ({
//   type: "CREATE_MOVIE_SUCCESS",
//   payload: movie,
// });

// export const createMoviesFailure = () => ({
//   type: "upload_MOVIE_FAILURE",
// });

// //Cập nhật phim
// export const uploadMovieStart = () => ({
//   type: "UPLOAD_MOVIE_START",
// });

// export const uploadMovieSuccess = (movie) => ({
//   type: "UPLOAD_MOVIE_SUCCESS",
//   payload: movie,
// });

// export const uploadMovieFailure = () => ({
//   type: "UPLOAD_MOVIE_FAILURE",
// });

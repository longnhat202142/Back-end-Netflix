export const getMoviesStart = () => ({
  type: "GET_MOVIES_START",
});

export const getMoviesSuccess = (movies) => ({
  type: "GET_MOVIES_SUCCESS",
  payload: movies,
});

export const getMoviesFailure = () => ({
  type: "GET_MOVIES_FAILURE",
});

// Trạng thái xoá
export const deleteMoviesStart = () => ({
  type: "DELETE_MOVIES_START",
});

export const deleteMoviesSuccess = (id) => ({
  type: "DELETE_MOVIES_SUCCESS",
  payload: id,
});

export const deleteMoviesFailure = () => ({
  type: "DELETE_MOVIE_FAILURE",
});

// Trạng thái thêm phim
export const createMoviesStart = () => ({
  type: "CREATE_MOVIE_START",
});

export const createMoviesSuccess = (movie) => ({
  type: "CREATE_MOVIE_SUCCESS",
  payload: movie,
});

export const createMoviesFailure = () => ({
  type: "upload_MOVIE_FAILURE",
});

//Cập nhật phim
export const uploadMovieStart = () => ({
  type: "UPLOAD_MOVIE_START",
});

export const uploadMovieSuccess = (movie) => ({
  type: "UPLOAD_MOVIE_SUCCESS",
  payload: movie,
});

export const uploadMovieFailure = () => ({
  type: "UPLOAD_MOVIE_FAILURE",
});

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

export const findMoviesStart = () => ({
  type: "FIND_MOVIES_START",
});

export const findMoviesSuccess = (movies) => ({
  type: "FIND_MOVIES_SUCCESS",
  payload: movies,
});

export const findMoviesFailure = () => ({
  type: "FIND_MOVIES_FAILURE",
});

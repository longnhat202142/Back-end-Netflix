const MovieReducer = (state, action) => {
  switch (action.type) {
    case "GET_MOVIES_START":
      return {
        movies: [],
        isFetching: true,
        error: false,
        isFind: false,
      };
    case "GET_MOVIES_SUCCESS":
      return {
        movies: action.payload,
        isFetching: false,
        error: false,
        isFind: false,
      };
    case "GET_MOVIES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
        isFind: false,
      };
    case "FIND_MOVIES_START":
      return {
        ...state,
        isFetching: true,
      };
    case "FIND_MOVIES_SUCCESS":
      return {
        movies: action.payload,
        isFetching: false,
        error: false,
        isFind: true,
      };
    case "FIND_MOVIES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
        isFind: false,
      };

    default:
      return { ...state };
  }
};

export default MovieReducer;

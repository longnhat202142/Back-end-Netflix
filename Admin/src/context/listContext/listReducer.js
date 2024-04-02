const ListsReducer = (state, action) => {
  switch (action.type) {
    // Trạng thái xem
    case "GET_LISTS_START":
      return {
        lists: [],
        isFetching: true,
        error: false,
      };
    case "GET_LISTS_SUCCESS":
      return {
        lists: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_LISTS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    // Trạng thái upload lại trang
    case "GET_LIST_START":
      return {
        lists: [],
        isFetching: true,
        error: false,
      };
    case "GET_LIST_SUCCESS":
      return {
        lists: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_LIST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    // Trạng thái thêm
    case "CREATE_LIST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_LIST_SUCCESS":
      return {
        lists: [...state.lists, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_LIST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    // Trạng thái xoá
    case "DELETE_LIST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_LIST_SUCCESS":
      return {
        lists: state.lists.filter((list) => list._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_LIST_FAILURE":
      return {
        lists: [],
        isFetching: false,
        error: true,
      };

    // Trạng thái xoá nhiều
    case "DELETE_MANY_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_MANY_SUCCESS":
      return {
        lists: state.lists.filter((list) => !action.payload.includes(list._id)),
        isFetching: false,
        error: false,
      };
    case "DELETE_MANY_FAILURE":
      return {
        lists: [],
        isFetching: false,
        error: true,
      };

    // Trạng thái cập nhật
    case "UPLOAD_LIST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPLOAD_LIST_SUCCESS":
      return {
        lists: state.lists.map(
          (list) => list._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPLOAD_LIST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default ListsReducer;

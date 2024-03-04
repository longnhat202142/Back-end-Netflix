import axios from "axios";
import {
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListFailure,
  getListStart,
  getListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
} from "./listAction";
export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get("http://localhost:8800/api/list", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (error) {
    dispatch(getListsFailure());
  }
};

export const getListbyId = async (id, dispatch) => {
  dispatch(getListStart());
  try {
    const res = await axios.get("http://localhost:8800/api/list/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getListSuccess(res.data));
  } catch (error) {
    dispatch(getListFailure());
  }
};

// Xoá
export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  try {
    //const res =
    await axios.delete("http://localhost:8800/api/list/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteListSuccess(id));
  } catch (error) {
    dispatch(deleteListFailure());
  }
};

// //Thêm
// export const createMovies = async (movie, dispatch) => {
//   dispatch(createMoviesStart());
//   try {
//     const res = await axios.post("http://localhost:8800/api/movie", movie, {
//       headers: {
//         token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
//       },
//     });
//     dispatch(createMoviesSuccess(res.data));
//   } catch (error) {
//     dispatch(createMoviesFailure());
//   }
// };

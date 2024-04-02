import axios from "axios";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  deleteManyFailure,
  deleteManyStart,
  deleteManySuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  uploadListFailure,
  uploadListStart,
  uploadListSuccess,
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

//Thêm
export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axios.post("http://localhost:8800/api/list", list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createListSuccess(res.data));
  } catch (error) {
    dispatch(createListFailure());
  }
};

// Cập nhật
export const updateList = async (list, dispatch) => {
  dispatch(uploadListStart());
  try {
    const res = await axios.put(
      "http://localhost:8800/api/list/" + list._id,
      list,
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(uploadListSuccess(res.data));
    // console.log(uploadListSuccess(res.data));
  } catch (error) {
    dispatch(uploadListFailure());
  }
};

export const deleteMany = async (ids, dispatch) => {
  dispatch(deleteManyStart());
  try {
    const res = await axios.post(
      "http://localhost:8800/api/list/delete-many",
      { ids },
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(deleteManySuccess(res.data));
    window.location.reload();
  } catch (error) {
    dispatch(deleteManyFailure());
  }
};

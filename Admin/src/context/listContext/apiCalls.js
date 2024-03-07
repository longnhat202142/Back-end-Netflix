import axios from "axios";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListFailure,
  getListStart,
  getListSuccess,
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
      "http://localhost:8800/api/list" + list.id,
      list,
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(uploadListSuccess(res.data));
  } catch (error) {
    dispatch(uploadListFailure());
  }
};

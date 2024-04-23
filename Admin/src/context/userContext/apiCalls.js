import axios from "axios";
import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteManyFailure,
  deleteManyStart,
  deleteManySuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  uploadUserFailure,
  uploadUserStart,
  uploadUserSuccess,
} from "./userAction";

// xem
export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("http://localhost:8800/api/user", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailure());
  }
};

// Xoá
export const deleteUsers = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    //const res =
    await axios.delete("http://localhost:8800/api/user/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure());
  }
};

//Thêm
export const createUser = async (user, dispatch) => {
  dispatch(createUserStart());
  try {
    const res = await axios.post("http://localhost:8800/api/user", user);
    dispatch(createUserSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(createUserFailure());
    throw error;
  }
};

// Cập nhật
export const updateUser = async (user, dispatch) => {
  dispatch(uploadUserStart());
  try {
    const res = await axios.put(
      "http://localhost:8800/api/user/" + user._id,
      user,
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(uploadUserSuccess(res.data));
  } catch (error) {
    dispatch(uploadUserFailure());
  }
};

// Xoá nhiều
export const deleteMany = async (ids, dispatch) => {
  dispatch(deleteManyStart());
  try {
    const res = await axios.post(
      "http://localhost:8800/api/user/delete-many",
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

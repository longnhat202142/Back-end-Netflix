import axios from "axios";
import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
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
  } catch (error) {
    dispatch(createUserFailure());
  }
};

// Cập nhật
export const updateMovies = async (user, dispatch) => {
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

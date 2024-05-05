import httpClient from "../api/httpClient";
import { uploadUserFailure } from "../authContext/AuthActions";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  uploadUserStart,
  uploadUserSuccess,
} from "./AuthActions";

export const login = async (user, dispatchAu) => {
  dispatchAu(loginStart());
  try {
    const res = await httpClient.post("/auth/login", user);
    dispatchAu(loginSuccess(res.data));
  } catch (err) {
    dispatchAu(loginFailure());
  }
};

// Cập nhật
export const updateUser = async (id, user, dispatch) => {
  dispatch(uploadUserStart());
  try {
    const res = await httpClient.put("/api/user/" + id, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(uploadUserSuccess(res.data));
  } catch (error) {
    dispatch(uploadUserFailure());
  }
};

// Cập nhật password
export const changePassword = async (id, payload, dispatch) => {
  dispatch(uploadUserStart());
  try {
    const res = await httpClient.post("/user/change-password/" + id, payload, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(uploadUserSuccess(res.data.data));
    return res.data;
  } catch (error) {
    dispatch(uploadUserFailure());
    return error.response.data;
  }
};

import httpClient from "../api/httpClient";
import { uploadUserFailure } from "../userContext/userAction";
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
export const updateUser = async (user, dispatch) => {
  dispatch(uploadUserStart());
  try {
    const res = await httpClient.put("/api/user/" + user._id, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(uploadUserSuccess(res.data));
  } catch (error) {
    dispatch(uploadUserFailure());
  }
};

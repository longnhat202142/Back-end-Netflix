import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import httpClient from "../api/httpClient";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await httpClient.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

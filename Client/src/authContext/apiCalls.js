import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import httpClient from "../api/httpClient";

export const login = async (user, dispatchAu) => {
  dispatchAu(loginStart());
  try {
    const res = await httpClient.post("/auth/login", user);
    dispatchAu(loginSuccess(res.data));
  } catch (err) {
    dispatchAu(loginFailure());
  }
};

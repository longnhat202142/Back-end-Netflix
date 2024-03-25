import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import httpClient from "../api/httpClient";

export const login = async (user, dispatchau) => {
  dispatchau(loginStart());
  try {
    const res = await httpClient.post("/auth/login", user);
    dispatchau(loginSuccess(res.data));
  } catch (err) {
    dispatchau(loginFailure());
  }
};
